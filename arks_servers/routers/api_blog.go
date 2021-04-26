package routers

import (
	"acks_servers/controller"

	"github.com/gin-gonic/gin"
)

type ApiBlog struct{}

func (a *ApiBlog) InitBlogApi(path string, router *gin.Engine) {
	userHandler := controller.UserHandler{}
	bolg := router.Group(path)
	userRouter := bolg.Group("/user")
	{
		userRouter.POST("/register", userHandler.CreateUser)
		userRouter.POST("/login", userHandler.LoginUser)
		userRouter.POST("/Authorization", userHandler.LoginUser2)
	}
}
