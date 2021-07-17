package models

import (
	"gorm.io/gorm"
)

type VisitDayCount struct {
	gorm.Model
	VisitDayCount uint `gorm:"type:int;defalut:0;" json:"visit_day_count"` // 每日浏览数
}
