package main

import (
	"acks_servers/config/app"
	"acks_servers/config/setting"

	_ "acks_servers/docs"
	"log"
)

// @title web接口bolg
// @version 1.0
// @description Acks 博客项目 API 接口文档

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8888
func main() {
	engine := app.InitApp()
	err := engine.Run(":" + setting.Config.Server.Port)
	if err != nil {
		log.Panicln("项目启动失败: ", err.Error())
	}
}
