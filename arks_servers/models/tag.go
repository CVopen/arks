package models

import (
	"arks_servers/config/db"
	"arks_servers/utils"

	"gorm.io/gorm"
)

// 标签
type Tag struct {
	gorm.Model
	Name  string `gorm:"type:varchar(30);not null;" json:"name"`
	Count uint   `gorm:"unique_index;type:int;default:0;" json:"count"` // 文章数量
	// User       User     `gorm:"ForeignKey:UserId" json:"user"`         // 用户
	UserId     uint     `gorm:"type:int;not null;" json:"user_id"`     // 用户id
	Category   Category `gorm:"ForeignKey:CategoryId" json:"category"` // 分类
	CategoryId uint     `json:"category_id"`                           // 分类id
}

// 获取用户下的所有标签
func (t Tag) GetAllList(page *utils.Pagination) ([]Tag, uint, error) {
	var tagList []Tag

	// 创建语句
	query := db.Db.Model(&Tag{})

	if t.Name != "" {
		query = query.Where("`name` like concat('%',?'%')", t.Name)
	}

	if t.CategoryId != 0 {
		query = query.Where("`category_id` = ?", t.CategoryId)
	}
	// 分页
	total, err := utils.ToPage(page, query, &tagList)

	return tagList, total, err
}

// 查询用户下单个tag
func (t Tag) GetAllNameList() ([]Tag, error) {
	var tagList []Tag
	err := db.Db.Where("`name` = ?", t.Name).Find(&tagList).Error
	return tagList, err
}

func (t Tag) GetName() (Tag, error) {
	var tag Tag

	err := db.Db.Where("`name` = ? and `user_id` = ?", t.Name, t.UserId).First(&tag).Error
	return tag, err

}

// 添加标签
func (t Tag) Create() error {
	// 事务开始
	tx := db.Db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	err := tx.Create(&t).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	statistics, err := GetStatistics()
	if err != nil {
		return err
	}
	err = statistics.EditStatistics(map[string]interface{}{
		"TCount": statistics.TCount + 1,
	}, tx)

	if err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

// 修改标签名称
func (t Tag) Edit() error {
	// 使用 map 来更新，避免 gorm 默认不更新值为 nil, false, 0 的字段
	return db.Db.Model(&t).
		Updates(map[string]interface{}{
			"name": t.Name,
		}).Error
}

// 根据分类id获取标签
func (t Tag) GetByCategoryToList() ([]Tag, error) {
	var tagList []Tag

	err := db.Db.Where("`user_id` = ? and `name` = ?", t.UserId, t.Name).Find(&tagList).Error
	return tagList, err
}

// 确定分类是否存在
func (t Tag) GetByUidNameToTag() (Tag, error) {
	var tagDetail Tag
	err := db.Db.Where("`user_id` = ? and `name` = ?", t.UserId, t.Name).First(&tagDetail).Error
	return tagDetail, err
}

// 删除单个tag
func (t Tag) DelTagOne() error {
	// 事务开始
	tx := db.Db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	// 找到所有要删除的文章id
	var list []uint
	err := tx.Raw("SELECT article_id FROM tag_article WHERE tag_id = ?", t.ID).Scan(&list).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	// 删除标签文章表中的记录
	err = tx.Exec("delete from `tag_article` where `tag_id` = ?", t.ID).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	// 删除分类下所有文章
	if err = tx.Unscoped().Where("id in (?)", list).Delete(&Article{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	var tag Tag
	if err = tx.Where("id = ?", t.ID).First(&tag).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 更新分类对应文章数量
	err = tx.Exec("UPDATE `categories` set `count` = `count` - ? where `id` = ?", len(list), tag.CategoryId).Error
	if err != nil {
		tx.Rollback()
	}

	// 删除标签表中的记录
	err = tx.Where("`id` = ?", t.ID).Unscoped().Delete(&Tag{}).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	statistics, err := GetStatistics()
	if err != nil {
		return err
	}
	err = statistics.EditStatistics(map[string]interface{}{
		"TCount": statistics.TCount - 1,
		"ACount": statistics.ACount - uint(len(list)),
	}, tx)
	if err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}
