package models

import (
	"arks_servers/config/db"
	"arks_servers/utils"
	"time"

	"gorm.io/gorm"
)

// 用户历史浏览
type History struct {
	gorm.Model
	UserId    uint    `gorm:"not null;" json:"user_id"`                      // 用户id
	Article   Article `gorm:"ForeignKey:ArticleId;not null;" json:"article"` // 文章
	ArticleId uint    `json:"article_id"`                                    // 文章id
}

// 创建条目
func (history History) Create() error {
	var h History
	err := db.Db.Model(&History{}).Where("user_id = ? and article_id = ?", history.UserId, history.ArticleId).First(&h).Error
	if err != nil {
		if err.Error() == "record not found" {
			return db.Db.Create(&history).Error
		}
		return err
	}
	return db.Db.Updates(&h).Error
}

// 获取记录
func (history History) GetHistory(page *utils.Pagination) (data map[string][]History, total uint, err error) {
	var today []History
	var yesterday []History
	var earlier []History

	if page.Page == 1 {
		err = db.Db.Model(&History{}).Preload("Article").Preload("Article.User").Preload("Article.Category").Order("updated_at desc").Where("user_id = ? and DATEDIFF(updated_at,NOW())=0", history.UserId).Find(&today).Error
		if err != nil {
			return
		}

		err = db.Db.Model(&History{}).Preload("Article").Preload("Article.User").Preload("Article.Category").Order("updated_at desc").Where("user_id = ? and DATEDIFF(updated_at,NOW())=-1", history.UserId).Find(&yesterday).Error
		if err != nil {
			return
		}
	}

	date := time.Now().Add(-time.Hour * 24)
	query := db.Db.Model(&History{}).Preload("Article").Preload("Article.User").Preload("Article.Category").Where("user_id = ? and updated_at < ?", history.UserId, date.Format("2006-01-02"))
	// 分页
	total, err = utils.ToPage(page, query, &earlier)
	if err != nil {
		return
	}

	data = make(map[string][]History)
	data["today"] = today
	data["yesterday"] = yesterday
	data["earlier"] = earlier
	return
}

func (History History) Delete() error {
	return db.Db.Unscoped().Delete(&History).Error
}
