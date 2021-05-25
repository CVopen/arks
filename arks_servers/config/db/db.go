package db

import (
	"arks_servers/config/setting"
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// 数据库对象
var Db *gorm.DB

// 获取数据库链接
func getDataSource() string {
	dataSource := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true&loc=%s",
		setting.Config.Database.UserName,
		setting.Config.Database.Password,
		setting.Config.Database.Host,
		setting.Config.Database.Port,
		setting.Config.Database.Database,
		setting.Config.Database.TimeZone,
	)
	return dataSource
}

// 连接数据库
func InitDb() {
	var err error
	// 链接
	Db, err = gorm.Open(mysql.Open(getDataSource()), &gorm.Config{})
	if err != nil {
		log.Panic("数据库连接错误：", err.Error())
	}
	sql, _ := Db.DB()
	// 设置连接池参数
	sql.SetMaxIdleConns(setting.Config.Database.MaxIdleConn)
	sql.SetMaxOpenConns(setting.Config.Database.MaxOpenConn)
}
