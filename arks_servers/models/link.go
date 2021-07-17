package models

import "gorm.io/gorm"

// 友链和工具
type Link struct {
	gorm.Model
	User       User   `gorm:"ForeignKey:UserId;not null;" json:"user"`      // 用户
	UserId     uint   `json:"user_id"`                                      // 用户id
	Name       string `gorm:"type:varchar(100); not null;" json:"name"`     // 名称
	Url        string `gorm:"type:varchar(255); not null;" json:"url"`      // 地址
	Desc       string `gorm:"type:varchar(255); not null;" json:"desc"`     // 描述
	Icon       string `gorm:"type:varchar(255); not null;" json:"icon"`     // 图标
	Type       uint   `gorm:"type:int; defalut:1;" json:"type"`             // 1 友链 2工具
	IsRecycled bool   `gorm:"type:bool; default:false;" json:"is_recycled"` // 是否加入回收站
	IsChecked  bool   `gorm:"type:bool; default:false" json:"is_checked"`   // 是否通过审核
}
