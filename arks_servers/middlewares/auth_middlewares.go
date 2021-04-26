package middlewares

import (
	"acks_servers/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// jwt 权限校验中间件
func JwtAuth() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenHeader := ctx.Request.Header.Get("Authorzation")

		result := utils.Result{
			Code: utils.Forbidden,
			Msg:  "",
			Data: nil,
		}

		if tokenHeader == "" {
			result.Msg = "请求未携带 token, 无法访问"
			ctx.JSON(http.StatusOK, result)
			ctx.Abort()
			return
		}
		token, err := utils.ParseToken(tokenHeader)
		if err != nil {
			result.Msg = err.Error()
			ctx.JSON(http.StatusOK, result)
			ctx.Abort()
			return
		}
		ctx.Set("id", token.Id)
	}
}
