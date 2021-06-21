package models

import (
	"arks_servers/config/db"

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

type tag struct {
	gorm.Model
	Name  string `json:"name"`
	Count uint   `json:"count"` // 文章数量
}

// 获取用户下的所有标签
func (t Tag) GetAllList() ([]tag, error) {
	var tagList []tag

	err := db.Db.Where("`user_id` = ?", t.UserId).Find(&tagList).Error
	return tagList, err
}

// 查询用户下单个tag
func (t Tag) GetAllNameList() ([]tag, error) {
	var tagList []tag
	err := db.Db.Where("`name` = ? and `user_id` = ?", t.Name, t.UserId).Find(&tagList).Error
	return tagList, err
}

func (t Tag) GetName() (Tag, error) {
	var tag Tag

	err := db.Db.Where("`name` = ? and `user_id` = ?", t.Name, t.UserId).First(&tag).Error
	return tag, err

}

// 添加标签
func (t Tag) Create() error {
	return db.Db.Create(&t).Error
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
func (t Tag) GetByCategoryToList() ([]tag, error) {
	var tagList []tag

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
	// 删除分类下所有文章
	if err := db.Db.Unscoped().Where("category_id = ?", t.ID).Delete(&Artice{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 删除分类下所有标签
	if err := db.Db.Unscoped().Where("category_id = ?", t.ID).Delete(&Tag{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}
