package middlewares

import (
	"arks_servers/utils"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// jwt 权限校验中间件
func JwtAuth() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenH, _ := ctx.Get("token")
		tokenHeader := tokenH.(string)
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
			result.Msg = "签名失效"
			ctx.JSON(http.StatusOK, result)
			ctx.Abort()
			return
		}
		ctx.Set("id", token.Id)
		ctx.Next()
	}
}

// cbc 权限校验中间件
func CBCAuth() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenH, _ := ctx.Get("token")
		tokenHeader := tokenH.(string)
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
		id, _ := strconv.ParseUint(utils.DecryptDES_CBC(strings.Split(tokenHeader, " ")[1]), 10, 64)
		ctx.Set("id", uint(id))
		ctx.Next()
	}
}
