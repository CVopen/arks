package routers

import (
	"arks_servers/controller"
	"arks_servers/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ApiAdmin struct{}

func (a *ApiAdmin) InitAdminApi(path string, router *gin.Engine) {
	userHandler := controller.UserHandler{}
	categoryHandler := controller.CategoryHandler{}

	router.LoadHTMLGlob("template/admin/*")

	router.GET("/admin", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	// 签名验证
	admin := router.Group(path, middlewares.Sign())
	// 获取验证码图片
	admin.GET("/captcha", userHandler.Captcha)
	//登录
	admin.POST("/login", userHandler.LoginUser)
	userRouter := admin.Group("/category", middlewares.JwtAuth())
	{
		// 获取全部分类
		userRouter.POST("/all", categoryHandler.GetAllCategory)
		// 新增分类
		userRouter.POST("/add", categoryHandler.CreateCategory)
	}
}
