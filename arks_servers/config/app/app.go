package app

import (
	"acks_servers/config/db"
	"acks_servers/config/migrate"
	"acks_servers/config/setting"
	"acks_servers/routers"

	"github.com/gin-gonic/gin"
)

// 初始化 gin

func InitApp() *gin.Engine {
	// s := setting.Setting{}
	// s.InitSetting()
	setting.Config.InitSetting()

	db.InitDb()
	gin.SetMode(setting.Config.Server.Mode)
	migrate.Migrate()

	router := gin.Default()
	apiSwg := routers.ApiSwg{}
	apiSwg.InitSwgApi(router)
	apiblog := routers.ApiBlog{}
	apiblog.InitBlogApi("/bolg", router)
	return router
}
