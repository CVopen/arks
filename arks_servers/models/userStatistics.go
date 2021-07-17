package models

import (
	"gorm.io/gorm"
)

// 用户浏览数
type UserStatistics struct {
	gorm.Model
	User       User `gorm:"ForeignKey:UserId;not null;" json:"user"` // 用户
	UserId     uint `json:"user_id"`                                 // 标签id
	VisitCount uint `gorm:"type:int;defalut:0;" json:"visit_count"`  // 浏览数
}

// func CreateRow() error{

// }
