package models

import (
	"arks_servers/config/db"
	"arks_servers/utils"

	"gorm.io/gorm"
)

// 日志
type Journal struct {
	gorm.Model
	User    User   `gorm:"ForeignKey:UserId;not null;" json:"user"`    // 用
	UserId  uint   `json:"user_id"`                                    // 用户id
	Content string `gorm:"type:varchar(255);not null;" json:"content"` // 内容
}

// 新增日志
func CreateFunc(id uint, action, name string) {
	var user User
	user, _ = user.FindUser(utils.TypeInterFaceToUint(id))

	db.Db.Create(&Journal{
		UserId:  id,
		Content: "用户" + user.Nickname + action + name,
	})
}

// 根据id查询日志
func (journal Journal) GetJournalList(page *utils.Pagination) ([]Journal, uint, error) {
	var list []Journal
	query := db.Db.Model(&Journal{}).Preload("User")

	var err error
	if journal.UserId > 1 {
		query = query.Where("`user_id` = ?", journal.UserId)
	}

	// 分页
	total, err := utils.ToPage(page, query, &list)

	return list, total, err

}
