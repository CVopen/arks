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

// 添加标签
func (t Tag) Create() error {
	return db.Db.Create(&t).Error
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
