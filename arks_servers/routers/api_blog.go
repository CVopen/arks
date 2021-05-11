package routers

import (
	"acks_servers/controller"

	"github.com/gin-gonic/gin"
	"github.com/mojocn/base64Captcha"
)

type ApiBlog struct{}
type CaptchaConfig struct {
	Id           string
	CaptchaType  string
	VerifyValue  string
	DriverString *base64Captcha.DriverString
}

func (a *ApiBlog) InitBlogApi(path string, router *gin.Engine) {
	userHandler := controller.UserHandler{}
	blog := router.Group(path)
	blog.GET("/captcha", userHandler.Captcha)
	userRouter := blog.Group("/user")
	{
		userRouter.POST("/register", userHandler.CreateUser)
		userRouter.POST("/login", userHandler.LoginUser)
		userRouter.POST("/Authorization", userHandler.LoginUser2)
	}
}
