package models

import (
	"gorm.io/gorm"
)

// 用户历史浏览
type History struct {
	gorm.Model
	UserId    uint    `gorm:"not null;" json:"user_id"`                   // 用户id
	Article   Article `gorm:"ForeignKey:ArticleId;not null;" json:"user"` // 文章
	ArticleId uint    `json:"article_id"`                                 // 文章id
}
