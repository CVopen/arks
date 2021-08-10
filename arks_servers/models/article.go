package models

import (
	"arks_servers/config/db"
	"arks_servers/utils"
	"errors"
	"time"

	"gorm.io/gorm"
)

// 文章
type Article struct {
	gorm.Model
	User             User     `gorm:"ForeignKey:UserId;not null;" json:"user"`           // 用户
	UserId           uint     `json:"user_id"`                                           // 用户id
	Category         Category `gorm:"ForeignKey:CategoryId" json:"category"`             // 分类
	CategoryId       uint     `json:"category_id"`                                       // 分类id
	OrderId          uint     `gorm:"type:int;default:0;" json:"order_id"`               // 排序id
	TagList          []Tag    `gorm:"many2many:tag_article;" json:"tag_list"`            // 标签列表
	IsTop            bool     `gorm:"type:bool;defalut:false;" json:"is_top"`            // 是否置顶
	IsRecycled       bool     `gorm:"type:bool;defalut:false;" json:"is_recycled"`       // 是否回收
	IsPublished      bool     `gorm:"type:bool;defalut:false;" json:"is_published"`      // 是否发布
	IsAllowCommented bool     `gorm:"type:bool;defalut:true;" json:"is_allow_commented"` // 是否允许评论
	Pwd              string   `gorm:"type:varchar(100);" json:"pwd"`                     // 访问密码
	Title            string   `gorm:"type:varchar(255);not null" json:"title"`           // 标题
	Summary          string   `gorm:"type:varchar(255);not null" json:"summary"`         // 摘要
	Img              string   `gorm:"type:varchar(255);not null" json:"img"`             // 图片
	Content          string   `gorm:"type:MediumText;not null;" json:"content"`          // 内容
	MDContent        string   `gorm:"type:MediumText;not null;" json:"md_content"`       // markdown渲染后的内容
	CommentCount     uint     `gorm:"type:int;defalut:0;" json:"comment_count"`          // 评论数
	VisitCount       uint     `gorm:"type:int;defalut:0;" json:"visit_count"`            // 浏览数
}

// 新增文章
func (article Article) Create(tagIds []int) error {
	// 若图片为空，设置默认图片
	if article.Img == "" {
		article.Img = "https://s1.ax1x.com/2020/06/29/NWtFJA.jpg"
	}

	var maxOrderId *uint
	err := db.Db.Raw("select MAX(`order_id`) `maxOrderId` from `articles`").
		Row().Scan(&maxOrderId)
	if err != nil {
		return err
	}

	if maxOrderId == nil {
		article.OrderId = 1
	} else {
		article.OrderId = *maxOrderId + 1
	}

	// 开始事务
	tx := db.Db.Begin()
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}
	article.CreatedAt = time.Now()

	// 添加文章
	err = tx.Exec("INSERT INTO `articles` (`user_id`, `category_id`, `order_id`, `is_top`, `is_recycled`, `is_published`, `is_allow_commented`, `pwd`, `title`, `summary`, `img`, `content`, `md_content`, `created_at`, `comment_count`, `visit_count`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", article.UserId, article.CategoryId, article.OrderId, article.IsTop, article.IsRecycled,
		article.IsPublished, article.IsAllowCommented, article.Pwd, article.Title,
		article.Summary, article.Img, article.Content, article.MDContent, article.CreatedAt, 0, 0).Error

	if err != nil {
		tx.Rollback()
		return err
	}

	// 更新分类对应文章数量
	err = tx.Exec("UPDATE `categories` set `count` = `count` + 1 where `id` = ?", article.CategoryId).Error
	if err != nil {
		tx.Rollback()
	}

	// 根据标题获取文章
	err = tx.Where("title = ?", article.Title).First(&article).Error
	if err != nil {
		tx.Rollback()
		return errors.New("文章名已经存在")
	}

	// 创建文章和标签关联，更新标签对应文章数量
	for _, tagId := range tagIds {
		err = tx.Exec("insert into `tag_article` (`article_id`,`tag_id`) values (?,?)",
			article.ID, tagId).Error
		if err != nil {
			tx.Rollback()
			return err
		}

		err = tx.Exec("update `tags` set `count` = `count` + 1 where `id` = ?", tagId).Error
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	statistics, err := GetStatistics()
	if err != nil {
		return err
	}
	err = statistics.EditStatistics(map[string]interface{}{
		"ACount": statistics.ACount + 1,
	}, tx)
	if err != nil {
		tx.Rollback()
		return err
	}

	// 日志更新
	go CreateFunc(article.UserId, "新增文章", article.Title)

	return tx.Commit().Error
}

// 修改文章
func (article Article) UpdateArticle(tagIds []int) error {
	// 开始事务
	tx := db.Db.Begin()
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()

	var ar Article
	// 根据标题获取文章
	err := tx.Model(&Article{}).Where("title = ?", article.Title).First(&ar).Error

	if err != nil && err.Error() != "record not found" {
		tx.Rollback()
	}
	if ar.ID != 0 && ar.ID != article.ID {
		tx.Rollback()
		return errors.New("文章名已经存在")
	}

	// 获取文章详情
	err = tx.Model(&Article{}).Preload("TagList").Where("id = ?", article.ID).First(&ar).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	if article.CategoryId != ar.CategoryId {
		// 更新分类对应文章数量
		err = tx.Exec("update `categories` set `count` = `count` - 1 where `id` = ?", ar.CategoryId).Error
		if err != nil {
			tx.Rollback()
			return err
		}
		err = tx.Exec("update `categories` set `count` = `count` + 1 where `id` = ?", article.CategoryId).Error
		if err != nil {
			tx.Rollback()
			return err
		}
	}
	// 需要更改的标签文章数量
	newTagListReduce := make([]uint, len(ar.TagList))
	for i, v := range ar.TagList {
		newTagListReduce[i] = v.ID
	}

	// 更新标签中对应文章数量
	err = tx.Exec("update `tags` set `count` = `count` - 1 where `id` in (?)", newTagListReduce).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	err = tx.Exec("update `tags` set `count` = `count` + 1 where `id` in (?)", tagIds).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	// 删除标签文章表中的记录
	err = tx.Exec("delete from `tag_article` where `tag_id` in (?) and `article_id` = ?", newTagListReduce, ar.ID).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	// 创建文章和标签关联，更新标签对应文章数量
	for _, tagId := range tagIds {
		err = tx.Exec("insert into `tag_article` (`article_id`,`tag_id`) values (?,?)",
			article.ID, tagId).Error
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	// 更新文章
	err = tx.Model(&article).Updates(map[string]interface{}{
		"is_published":       article.IsPublished,
		"category_id":        article.CategoryId,
		"is_top":             article.IsTop,
		"is_allow_commented": article.IsAllowCommented,
		"pwd":                article.Pwd,
		"title":              article.Title,
		"summary":            article.Summary,
		"img":                article.Img,
		"content":            article.Content,
		"md_content":         article.MDContent,
		"updated_at":         time.Now(),
	}).Error
	if err != nil {
		tx.Rollback()
		return err
	}
	// 日志更新
	go CreateFunc(article.UserId, "修改文章", article.Title)

	return tx.Commit().Error
}

// 获取文章
func (article Article) GetList(page *utils.Pagination, state uint) ([]Article, uint, error) {
	var articleList []Article
	query := db.Db.Model(&Article{}).Preload("Category").Preload("TagList").Order("is_top desc,order_id desc")

	if article.Title != "" {
		query = query.Where("`title` like concat('%',?,'%')", article.Title)
	}

	if article.CategoryId > 0 {
		query = query.Where("`category_id` = ?", article.CategoryId)
	}

	switch state {
	case 1:
		// 已发布
		query = query.Where("is_published = 1 and is_recycled = 0")
	case 2:
		// 回收站
		query = query.Where("is_recycled = 1")
	case 3:
		// 加密
		query = query.Where("pwd != ''")
	case 4:
		// 未发布
		query = query.Where("is_published = 0 and is_recycled = 0")
	case 5:
		// 已经发布未加密
		query = query.Where("is_published = 1 and is_recycled = 0 and pwd = ''")
	default:
		break
	}

	if article.UserId > 1 {
		query = query.Where("`user_id` = ?", article.UserId)
	}

	// 分页
	total, err := utils.ToPage(page, query, &articleList)

	return articleList, total, err
}

// 获取最近发布的文章
func (Article) GetLatest(limit int) (list []Article, err error) {
	err = db.Db.Order("created_at desc").Limit(limit).
		Where("is_published = 1 and is_recycled = 0 and pwd = ''").Find(&list).Error
	return
}

// 发布文章
func (article Article) PublishedArticle() error {
	return db.Db.Model(&article).Updates(map[string]interface{}{
		"is_published": article.IsPublished,
	}).Error
}

// 文章置顶
func (article Article) TopArticle() error {
	return db.Db.Model(&article).Updates(map[string]interface{}{
		"is_top": article.IsTop,
	}).Error
}

// 文章评论
func (article Article) AllowCommented() error {
	return db.Db.Model(&article).Updates(map[string]interface{}{
		"is_allow_commented": article.IsAllowCommented,
	}).Error
}

// 回收文章
func (article Article) RecycledArticle() error {
	return db.Db.Model(&article).Updates(map[string]interface{}{
		"is_recycled": article.IsRecycled,
	}).Error
}

// 删除文章
func (article Article) DelArticle() error {
	// 开始事务
	tx := db.Db.Begin()
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	// 更新分类对应文章数量
	err := tx.Exec("update `categories` set `count` = `count` - 1 where `id` = (select `category_id` from `articles` where `id` = ?)", article.ID).Error

	if err != nil {
		tx.Rollback()
		return err
	}

	// 更新标签中对应文章数量
	err = tx.Exec("update `tags` set `count` = `count` - 1 where `id` in (select `tag_id` from `tag_article` where `article_id` = ?)", article.ID).Error

	if err != nil {
		tx.Rollback()
		return err
	}

	// 删除标签文章表中的记录
	err = tx.Exec("delete from `tag_article` where `article_id` = ?", article.ID).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	// 获取文章对应用户id
	db.Db.First(&article)

	// 删除文章
	err = tx.Unscoped().Delete(&article).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	statistics, err := GetStatistics()
	if err != nil {
		return err
	}
	err = statistics.EditStatistics(map[string]interface{}{
		"ACount": statistics.ACount - 1,
	}, tx)
	if err != nil {
		tx.Rollback()
		return err
	}

	// 日志更新
	go CreateFunc(article.UserId, "删除文章", article.Title)

	return tx.Commit().Error
}

// 批量删除文章
func (Article) DelMult(list []uint) error {
	// 开始事务
	tx := db.Db.Begin()
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()
	if err := tx.Error; err != nil {
		return err
	}

	// 获取删除文章列表
	var articleList []Article
	db.Db.Model(&Article{}).Where("id in (?)", list).Find(&articleList)

	// 更新分类对应文章数量
	err := tx.Exec("update `categories` set `count` = `count` - 1 where (`id` in (select `category_id` from `articles` where `id` in (?)) and `count` > 0)", list).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	// 更新分类对应文章数量
	err = tx.Exec("update `tags` set `count` = `count` - 1 where (`id` in (select `tag_id` from `tag_article` where `article_id` in (?)) and `count` > 0)", list).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	// 删除标签文章表中的记录
	err = tx.Exec("delete from `tag_article` where `article_id` in (?)", list).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	// 删除文章表中的记录
	err = tx.Where("`id` in (?)", list).Unscoped().Delete(&Article{}).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	statistics, err := GetStatistics()
	if err != nil {
		return err
	}
	err = statistics.EditStatistics(map[string]interface{}{
		"ACount": statistics.ACount - uint(len(list)),
	}, tx)
	if err != nil {
		tx.Rollback()
		return err
	}

	go func() {
		for _, v := range articleList {
			// 日志更新
			go CreateFunc(v.UserId, "批量删除文章", v.Title)
		}
	}()

	return tx.Commit().Error
}

// 根据id查询文章
func (article Article) GetDetail() (Article, error) {
	err := db.Db.Preload("Category").Preload("TagList").Preload("User").Where("`id` = ?", article.ID).First(&article).Error
	return article, err
}

// 更新访问
func (article Article) UpdateVisitCount() {
	db.Db.Exec("UPDATE `articles` set `visit_count` = `visit_count` + 1 where `id` = ?", article.ID)
}

// 更新访问
func (article Article) UpdateCommentCount() {
	db.Db.Exec("UPDATE `articles` set `comment_count` = `comment_count` + 1 where `id` = ?", article.ID)
}

// 文章排序
func (a Article) MoveOrderId(direction bool) (err error) {
	// 开始事务
	tx := db.Db.Begin()
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()
	if err := tx.Error; err != nil {
		return err
	}

	var article Article
	if direction {
		err = tx.Where("`is_published` = 1 and `is_recycled` = 0 and `order_id` > ? and `is_top` = ?", a.OrderId, a.IsTop).First(&article).Error
	} else {
		err = tx.Where("`is_published` = 1 and `is_recycled` = 0 and `order_id` < ? and `is_top` = ?", a.OrderId, a.IsTop).First(&article).Error
	}

	if err != nil {
		tx.Rollback()
		return err
	}

	err = tx.Model(&Article{}).Where("`id` = ?", a.ID).Update("order_id", article.OrderId).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	err = tx.Model(&Article{}).Where("`id` = ?", article.ID).Update("order_id", a.OrderId).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

// 获取上一篇文章
func (Article) GetPrevious(orderId uint, isTop bool) (article Article, err error) {
	if isTop {
		err = db.Db.Raw("select * from `articles` "+
			" where is_published = 1 and is_recycled = 0 and `order_id` < ? and is_top = 1"+
			" order by `order_id` desc limit 1", orderId).Scan(&article).Error
	} else {
		err = db.Db.Raw("select * from `articles`"+
			" where is_published = 1 and is_recycled = 0 and `order_id` < ? and is_top = 0"+
			" order by `order_id` desc limit 1", orderId).Scan(&article).Error
	}

	return
}

// 获取下一篇文章
func (Article) GetNext(orderId uint, isTop bool) (article Article, err error) {
	if isTop {
		err = db.Db.Raw("select * from `articles`"+
			" where is_published = 1 and is_recycled = 0 and `order_id` > ? and is_top = 1"+
			" order by `order_id` asc limit 1", orderId).Scan(&article).Error
	} else {
		err = db.Db.Raw("select * from `articles`"+
			" where is_published = 1 and is_recycled = 0 and `order_id` > ? and is_top = 0"+
			" order by `order_id` asc limit 1", orderId).Scan(&article).Error
	}
	return
}

// 获取分类下所有文章
func (article Article) GetCategoryAll(page *utils.Pagination) ([]Article, uint, error) {
	var articleList []Article
	query := db.Db.Model(&Article{}).Preload("Category").Preload("TagList").Where("is_published = 1 and is_recycled = 0 and pwd = ''").Order("is_top desc,order_id desc")

	if article.Title != "" {
		query = query.Where("`title` like concat('%',?,'%')", article.Title)
	}

	if article.CategoryId > 0 {
		query = query.Where("`category_id` = ?", article.CategoryId)
	}

	if article.UserId > 1 {
		query = query.Where("`user_id` = ?", article.UserId)
	}

	// 分页
	total, err := utils.ToPage(page, query, &articleList)

	return articleList, total, err
}

// 获取标签下所有文章
func (Article) GetTagAll(id uint) (list []Article, err error) {
	var listId []uint
	err = db.Db.Raw("select article_id from `tag_article` where `tag_id` = ?", id).Scan(&listId).Error
	if err != nil {
		return
	}
	db.Db.Model(&Article{}).Preload("Category").Preload("TagList").Where("is_published = 1 and is_recycled = 0 and pwd = '' and id in (?)", listId).Order("is_top desc,order_id desc").Find(&list)

	return
}
