package middlewares

import "github.com/gin-gonic/gin"

// 文章接口请求类别中间件
func TypeArticle(str string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set("type", str)
	}
}

func VisitType(str string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set("type", str)
	}
}
