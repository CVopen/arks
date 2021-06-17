package app

import (
	"arks_servers/config/db"
	"arks_servers/config/migrate"
	"arks_servers/config/setting"
	"arks_servers/routers"

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
	apiblog.InitBlogApi("/blog", router)

	router.Static("../../static", "static")

	apiadmin := routers.ApiAdmin{}
	apiadmin.InitAdminApi("/admin/v2", router)

	return router
}
