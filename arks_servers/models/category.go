package models

import (
	"arks_servers/config/db"

	"gorm.io/gorm"
)

// 分类
type Category struct {
	gorm.Model
	Name   string `gorm:"type:varchar(30);not null;" json:"name"` // 类别名称
	User   User   `gorm:"ForeignKey:CategoryId" json:"user"`      // 用户
	UserId uint   `json:"user_id"`                                // 用户id
}

// 获取用户下的所有分类
func (c Category) GetAllList() (Category, error) {
	var category Category
	err := db.Db.Where("`user_id` = ?", c.UserId).Find(&category).Error
	return category, err
}

// 添加分类
func (c Category) Create() error {
	return db.Db.Create(&c).Error
}
