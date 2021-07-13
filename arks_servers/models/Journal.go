package models

import "gorm.io/gorm"

// 日志
type Journal struct {
	gorm.Model
	User    User   `gorm:"ForeignKey:UserId;not null;" json:"user"`    // 用户
	UserId  uint   `json:"user_id"`                                    // 用户id
	Content string `gorm:"type:varchar(255);not null;" json:"content"` // 内容
}
