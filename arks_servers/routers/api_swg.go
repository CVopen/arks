package routers

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type ApiSwg struct {
}

// 初始化swagger接口文档
func (a *ApiSwg) InitSwgApi(router *gin.Engine) {

	url := ginSwagger.URL("/swagger/doc.json") // The url pointing to API definition
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, url))
	// url2 := ginSwagger.URL("/swagger/doc.json") // The url pointing to API definition
	// router.GET("/api/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, url2))
}
