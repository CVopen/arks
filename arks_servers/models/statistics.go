package models

import (
	"arks_servers/config/db"

	"gorm.io/gorm"
)

type Statistics struct {
	gorm.Model
	Notice        string `gorm:"type:varchar(255);not null;" json:"notice"`                                                                                                       // 公告
	CCount        uint   `gorm:"type:int;defalut:0;" json:"CCount"`                                                                                                               // 分类数量
	TCount        uint   `gorm:"type:int;defalut:0;" json:"TCount"`                                                                                                               // 标签数量
	ACount        uint   `gorm:"type:int;defalut:0;" json:"ACount"`                                                                                                               // 文章数量
	HomeImg       string `gorm:"type:varchar(255);default:'http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210505/4bed66f04b0006858803b90eb66dd0a2.jpg';" json:"home_img"`     // 首页背景图
	CategoryImg   string `gorm:"type:varchar(255);default:'http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210505/4bed66f04b0006858803b90eb66dd0a2.jpg';" json:"category_img"` // 分类背景图
	TagImg        string `gorm:"type:varchar(255);default:'http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210505/4bed66f04b0006858803b90eb66dd0a2.jpg';" json:"tag_img"`      // 标签背景图
	ToolsImg      string `gorm:"type:varchar(255);default:'http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210505/4bed66f04b0006858803b90eb66dd0a2.jpg';" json:"tools_img"`    // 工具背景图
	FriendsImg    string `gorm:"type:varchar(255);default:'http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210505/4bed66f04b0006858803b90eb66dd0a2.jpg';" json:"friends_img"`  // 友链背景图
	ClientImg     string `gorm:"type:varchar(255);default:'http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210505/4bed66f04b0006858803b90eb66dd0a2.jpg';" json:"client_img"`   // 客户端背景图
	VisitCount    uint   `gorm:"type:int;defalut:0;" json:"visit_count"`                                                                                                          // 本站访问量
	VisitDayCount uint   `gorm:"type:int;defalut:0;" json:"visit_day_count"`                                                                                                      // 每日浏览数
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
func (s Statistics) GetStatistics() (Statistics, error) {
	err := db.Db.First(&s).Error
	return s, err
}

// 更新整站设置
func (s Statistics) EditStatisticsConfig() error {
	// 使用 map 来更新，避免 gorm 默认不更新值为 nil, false, 0 的字段
	return db.Db.Model(&Statistics{}).Where("id = 1").
		Updates(map[string]interface{}{
			"Notice":      s.Notice,
			"HomeImg":     s.HomeImg,
			"CategoryImg": s.CategoryImg,
			"TagImg":      s.TagImg,
			"ToolsImg":    s.ToolsImg,
			"FriendsImg":  s.FriendsImg,
			"ClientImg":   s.ClientImg,
		}).Error
}

// 更新访问量
func (Statistics) EditStatistics(data map[string]interface{}, db *gorm.DB) error {
	// 使用 map 来更新，避免 gorm 默认不更新值为 nil, false, 0 的字段
	return db.Model(&Statistics{}).Where("id = 1").
		Updates(data).Error
}

// 更新访问量
func (Statistics) AddVisit() {
	db.Db.Exec("update `statistics` set `visit_count` = `visit_count` + 1, `visit_day_count` = `visit_day_count` + 1 where `id` = 1")
}
