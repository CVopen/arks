package routers

import (
	"arks_servers/controller"
	"arks_servers/middlewares"
	"net/http"

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

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "blog/index.html", nil)
	})
	// 签名验证
	blog := router.Group(path, middlewares.Sign())
	// 获取验证码图片
	blog.GET("/captcha", userHandler.Captcha)
	//注册
	blog.POST("/register", userHandler.CreateUser)
	//登录
	blog.POST("/login", userHandler.LoginUser)
	//修改密码验证
	blog.POST("/forget_pwd", userHandler.ForgetPws)
	//修改密码
	blog.PUT("/edit_pwd", userHandler.EditPwd)
	userRouter := blog.Group("/user", middlewares.JwtAuth())
	{
		// 刷新token
		userRouter.POST("/Authorization", userHandler.RefreshToken)
		// userRouter.POST("/Authorization", userHandler.LoginUser2)
	}

	configBlog := controller.VisitHandler{}
	// 获取整站配置
	blog.GET("/config", middlewares.TypeRequest("blog"), configBlog.GetVisit)

	articleBlog := controller.ArticleHandler{}
	articleRouter := blog.Group("/article")
	{
		articleRouter.GET("/new", articleBlog.GetNewArticle)
		articleRouter.GET("/list", middlewares.TypeRequest("blog"), articleBlog.GetArticle)
	}
}
