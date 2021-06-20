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

	router.GET("/admin", func(c *gin.Context) {
		c.HTML(http.StatusOK, "admin/index.html", nil)
	})

	// 签名验证
	admin := router.Group(path, middlewares.Sign())
	// 获取验证码图片
	admin.GET("/captcha", userHandler.Captcha)
	//登录
	admin.POST("/login", userHandler.LoginUser)
	categoryRouter := admin.Group("/category", middlewares.JwtAuth())
	categoryHandler := controller.CategoryHandler{}
	{
		// 获取全部分类
		categoryRouter.GET("/list", categoryHandler.GetAllCategory)
		// 新增分类
		categoryRouter.POST("/add", categoryHandler.CreateCategory)
		// 修改分类
		categoryRouter.PUT("/edit", categoryHandler.EditCategory)
		// 删除分类
		categoryRouter.DELETE("/del", categoryHandler.RemoveCategory)
	}

	tagRouter := admin.Group("/tag", middlewares.JwtAuth())
	tagHandler := controller.TagHandler{}
	{
		// 获取全部分类
		tagRouter.GET("/list", categoryHandler.GetAllCategory)
		// 新增分类
		tagRouter.POST("/add", tagHandler.CreateTag)
		// 修改分类
		tagRouter.PUT("/edit", categoryHandler.EditCategory)
		// 删除分类
		tagRouter.DELETE("/del", categoryHandler.RemoveCategory)
	}
}
