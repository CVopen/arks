package models

import (
	"arks_servers/config/db"
	"arks_servers/utils"
	"errors"
	"fmt"
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
		return err
	}

	// 创建文章和标签关联，更新标签对应文章数量
	fmt.Println(tagIds)
	for _, tagId := range tagIds {
		err = tx.Exec("insert into `tag_article` (`article_id`,`tag_id`) values (?,?)",
			article.ID, tagId).Error
		if err != nil {
			tx.Rollback()
			return errors.New("文章名已经存在")
		}

		err = tx.Exec("update `tags` set `count` = `count` + 1 where `id` = ?", tagId).Error
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit().Error
}

// 获取文章
func (article Article) GetList(page *utils.Pagination, state uint, list []uint) ([]Article, uint, error) {
	var articleList []Article
	query := db.Db.Model(&Article{}).Preload("TagList").Preload("Category").Order("is_top desc,order_id desc")

	if article.Title != "" {
		query = query.Where("`title` like concat('%',?,'%')", article.Title)
	}

	if article.CategoryId > 0 {
		query = query.Where("`category_id` = ?)", article.CategoryId)
	}

	fmt.Println("state", state, "list", list, "title", article.Title)

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
	default:
		break
	}

	if len(list) > 0 {
		query = query.Where("tag_id in (?)", list)
	}

	// 分页
	total, err := utils.ToPage(page, query, &articleList)

	return articleList, total, err
}
