package models

import "gorm.io/gorm"

// 意见
type Opinion struct {
	gorm.Model
	User    User   `gorm:"ForeignKey:UserId;" json:"user"`             // 用户
	UserId  uint   `json:"user_id"`                                    // 用户id
	Content string `gorm:"type:varchar(255);not null;" json:"content"` // 内容
	State   uint   `gorm:"type:int;defalut:0;" json:"visit_count"`     // 处理状态 0 未处理 1 已处理 2 回收站
}
