package models

import (
	"arks_servers/config/db"

	"gorm.io/gorm"
)

// 意见
type Opinion struct {
	gorm.Model
	User    User   `gorm:"ForeignKey:UserId;" json:"user"`             // 用户
	UserId  uint   `json:"user_id"`                                    // 用户id
	Content string `gorm:"type:varchar(255);not null;" json:"content"` // 内容
	Message string `gorm:"type:varchar(255);not null;" json:"message"` // 处理意见
	Images  string `gorm:"type:MediumText;" json:"images"`             // 内容图片
	State   uint   `gorm:"type:int;defalut:1;" json:"state"`           // 处理状态 待处理 1 处理中 2 处理完成 3
}

// 新增意见
func (opinion Opinion) CreateFunc() error {
	return db.Db.Create(&opinion).Error
}

// 改变状态
func (opinion Opinion) EditState() error {
	return db.Db.Model(&Opinion{}).Where("id = ?", opinion.ID).Updates(map[string]interface{}{
		"state":   opinion.State,
		"message": opinion.Message,
	}).Error
}

// 根据id查询日志
func (opinion Opinion) GetOpinionList() ([]Opinion, error) {
	var list []Opinion
	query := db.Db.Model(&Opinion{}).Preload("User")

	if opinion.State > 0 {
		query = query.Where("`state` = ?", opinion.State)
	}

	if opinion.UserId > 1 {
		query = query.Where("`user_id` = ?", opinion.UserId)
	}

	return list, query.Order("created_at desc").Find(&list).Error

}

// 删除
func (opinion Opinion) RemoveOpinion() error {
	return db.Db.Unscoped().Delete(&opinion).Error
}
