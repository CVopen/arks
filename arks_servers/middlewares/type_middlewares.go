package middlewares

import "github.com/gin-gonic/gin"

// 文章接口请求类别中间件
func TypeRequest(str string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set("type", str)
	}
}
