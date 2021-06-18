package models

import (
	"arks_servers/config/db"

	"gorm.io/gorm"
)

// 分类
type Category struct {
	gorm.Model
	Name   string `gorm:"type:varchar(30);not null;" json:"name"`  // 类别名称
	User   User   `gorm:"ForeignKey:UserId" json:"user"`           // 用户
	UserId uint   `json:"user_id"`                                 // 用户id
	Desc   string `gorm:"type:varchar(255);not null;" json:"desc"` // 介绍
}

// 返回值指定模型
type category struct {
	gorm.Model
	Name string `json:"name"`
}

// 获取用户下的所有分类
func (c Category) GetAllList() ([]category, error) {
	var categoryList []category

	err := db.Db.Where("`user_id` = ?", c.UserId).Find(&categoryList).Error
	return categoryList, err
}

// 添加分类
func (c Category) Create() error {
	return db.Db.Create(&c).Error
}
