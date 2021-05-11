package middlewares

import (
	"acks_servers/config/setting"
	"acks_servers/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 公共参数：
// timestamp 必传，时间戳 ；放在header中
// token token 登录后返回；放在header中

// sign 必传，签名；放在header中

// 签名生成的通用步骤如下：

// 第一步，设<timestamp, token>集合M，将集合M内所有参数按照参数名ASCII码从小到大排序（字典序），使用URL键值对的格式（即key1value1key2value2…）拼接成字符串stringA。

// 特别注意以下重要规则：

// ◆ 参数名ASCII码从小到大排序（字典序）；
// ◆ 参数名区分大小写；
// 第二步，在stringA最后拼接上key得到stringSignTemp字符串，并对stringSignTemp进行MD5运算，得到sign值signValue。

// ◆ key值：xyhOpen@ali

// 举例：

// 假设传送的参数如下：

// token： 115f08f670726c7c8c247fd08dd4e7e6

// timestamp： 1604391161983

// 第一步：对参数按照key=value的格式，并按照参数名ASCII字典序排序如下：

// stringA=”timestamp1604391161983token115f08f670726c7c8c247fd08dd4e7e6”;

// 第二步：拼接API密钥：

// stringSignTemp=stringA+”hdj!!$$@&333”

// sign=MD5(stringSignTemp)=”” //注：MD5签名方式

// 请求签名验证
// key值：
func Sign() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		timestamp := ctx.Request.Header.Get("timestamp")
		token := ctx.Request.Header.Get("Authorization")
		sign := ctx.Request.Header.Get("sign")
		str := utils.CryptoPwd("timestamp" + timestamp + "Authorization" + token + setting.Config.Server.Keysign)
		if sign != str {
			ctx.JSON(http.StatusOK, utils.Result{
				Code: utils.Forbidden,
				Msg:  "签名错误",
				Data: nil,
			})
			ctx.Abort()
		}
		ctx.Set("token", token)
		ctx.Next()
	}
}
