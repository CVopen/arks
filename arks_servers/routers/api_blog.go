package routers

import (
	"acks_servers/controller"
	"acks_servers/middlewares"

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
	blog := router.Group(path, middlewares.Sign()) // 签名验证
	blog.GET("/captcha", userHandler.Captcha)      // 获取验证码图片
	blog.POST("/register", userHandler.CreateUser) //注册
	blog.POST("/login", userHandler.LoginUser)     //登录
	userRouter := blog.Group("/user", middlewares.JwtAuth())
	{
		userRouter.POST("/Authorization", userHandler.LoginUser2)
	}
}
