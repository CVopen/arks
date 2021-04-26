package utils

const (
	Success      = 10000 // 请求成功
	RequestError = 10001 // 请求参数有误
	Forbidden    = 10002 // 禁止访问
)

// 返回信息结构
type Result struct {
	Code int         `json:"code"` // 状态码
	Msg  string      `json:"msg"`  // 提示
	Data interface{} `json:"data"` // 数据
}
