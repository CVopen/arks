package migrate

import (
	"arks_servers/config/db"
	"arks_servers/models"
)

// 自动迁移数据表
func Migrate() {
	db.Db.AutoMigrate(
		&models.User{},
		&models.Article{},
		&models.Category{},
		&models.Tag{},
	)
}
