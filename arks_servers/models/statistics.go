package models

import (
	"arks_servers/config/db"

	"gorm.io/gorm"
)

type Statistics struct {
	gorm.Model
	Notice        string `gorm:"type:varchar(255);not null;" json:"notice"`  // 公告
	CCount        uint   `gorm:"type:int;defalut:0;" json:"CCount"`          // 分类数量
	TCount        uint   `gorm:"type:int;defalut:0;" json:"TCount"`          // 标签数量
	ACount        uint   `gorm:"type:int;defalut:0;" json:"ACount"`          // 文章数量
	VisitCount    uint   `gorm:"type:int;defalut:0;" json:"visit_count"`     // 本站访问量
	VisitDayCount uint   `gorm:"type:int;defalut:0;" json:"visit_day_count"` // 每日浏览数
}

// 创建用户
func InitStatistics() {
	var statistics Statistics
	err := db.Db.First(&statistics).Error
	if err != nil {
		statistics.Notice = "hello world!"
		db.Db.Create(&statistics)
	}
}

// 查找函数
func GetStatistics() (Statistics, error) {
	var statistics Statistics
	err := db.Db.First(&statistics).Error
	return statistics, err
}

// 查找
func (Statistics) GetStatistics() (Statistics, error) {
	var statistics Statistics
	err := db.Db.First(&statistics).Error
	return statistics, err
}

// 更新公告
func (Statistics) EditStatisticsNotice(Notice string) error {
	// 使用 map 来更新，避免 gorm 默认不更新值为 nil, false, 0 的字段
	return db.Db.Model(&Statistics{}).
		Updates(map[string]interface{}{
			"Notice": Notice,
		}).Error
}

// 更新访问量
func (Statistics) EditStatistics(data map[string]interface{}, db *gorm.DB) error {
	// 使用 map 来更新，避免 gorm 默认不更新值为 nil, false, 0 的字段
	return db.Model(&Statistics{}).Where("id = 1").
		Updates(data).Error
}
