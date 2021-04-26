package migrate

import (
	"acks_servers/config/db"
	"acks_servers/models"
)

// 自动迁移数据表
func Migrate() {
	db.Db.AutoMigrate(&models.User{})
}
