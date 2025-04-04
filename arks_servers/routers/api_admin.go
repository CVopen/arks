package routers

import (
	"arks_servers/controller"
	"arks_servers/middlewares"
	"arks_servers/utils"
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
		categoryRouter.GET("/list", categoryHandler.GetCategoryList)
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
		tagRouter.GET("/list", tagHandler.GetList)
		// 新增分类
		tagRouter.POST("/add", tagHandler.CreateTag)
		// 修改分类
		tagRouter.PUT("/edit", tagHandler.EditTag)
		// 删除分类
		tagRouter.DELETE("/del", tagHandler.Remove)
	}

	articleRouter := admin.Group("/article", middlewares.JwtAuth())
	articleHandler := controller.ArticleHandler{}
	{
		// 新增文章
		articleRouter.POST("/add", articleHandler.CreatedArticle)
		// 获取文章列表
		articleRouter.GET("/list", middlewares.TypeRequest("admin"), articleHandler.GetArticle)
		// 发布文章
		articleRouter.PUT("/publish", middlewares.TypeRequest(utils.PublishedArticle), articleHandler.PutArticle)
		// 置顶文章
		articleRouter.PUT("/top", middlewares.TypeRequest(utils.TopArticle), articleHandler.PutArticle)
		// 评论文章
		articleRouter.PUT("/comment", middlewares.TypeRequest(utils.CommentedArticle), articleHandler.PutArticle)
		// 回收文章
		articleRouter.PUT("/recovery", middlewares.TypeRequest(utils.RecycledArticle), articleHandler.PutArticle)
		// 删除文章
		articleRouter.DELETE("/del", articleHandler.DelArticleHandler)
		// 获取详情
		articleRouter.GET("/detail", articleHandler.GetArticleDetailHandler)
		// 文章排序
		articleRouter.PUT("/move", articleHandler.ArticleOrderHandler)
	}

	configRouter := admin.Group("/config", middlewares.JwtAuth())
	visit := controller.VisitHandler{}
	{
		// 获取整站数据
		configRouter.GET("/visit", middlewares.TypeRequest("admin"), visit.GetVisit)
		// 修改
		configRouter.PUT("/edit", visit.SetConfig)
	}

	linkRouter := admin.Group("/links", middlewares.JwtAuth())
	link := controller.LinkHandler{}
	{
		// 工具列表
		linkRouter.GET("/tools/list", middlewares.TypeRequest("tools"), link.GetLink)
		// 友链列表
		linkRouter.GET("/friends/list", middlewares.TypeRequest("friends"), link.GetLink)
		// 修改
		linkRouter.PUT("/edit", link.EditLink)
		// 删除
		linkRouter.DELETE("/del", link.DelLink)
		// 添加
		linkRouter.POST("/add", link.CreatedLink)
		// 发布
		linkRouter.PUT("/published", middlewares.TypeRequest("IsPublished"), link.PutLinks)
		// 回收
		linkRouter.PUT("/recycled", middlewares.TypeRequest(""), link.PutLinks)
	}

	journalRouter := admin.Group("/journal", middlewares.JwtAuth())
	journal := controller.Journal{}
	{
		// 列表
		journalRouter.GET("list", journal.GetJournalList)
	}

	opinionRouter := admin.Group("/opinion", middlewares.JwtAuth())
	opinion := controller.OpinionController{}
	{
		// 列表
		opinionRouter.GET("list", opinion.GetOpinionList)
		// 修改状态
		opinionRouter.PUT("edit", opinion.PutState)
	}
}
