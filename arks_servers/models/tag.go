package models

import "gorm.io/gorm"

// 标签
type Tag struct {
	gorm.Model
	Name       string   `gorm:"type:varchar(30);not null;" json:"name"`
	Count      uint     `gorm:"type:int;default:0;" json:"count"`      // 文章数量
	Category   Category `gorm:"ForeignKey:CategoryId" json:"category"` // 分类
	CategoryId uint     `json:"category_id"`                           // 分类id
}
