package controller

import (
	"acks_servers/forms"
	"acks_servers/models"
	"acks_servers/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type UserHandler struct{}

// @Title 新增模版
// @Author mengyilingjian@outlook.com
// @Description 新增模版
// @Tags release template
// @Param Authorization	header	string true "Bearer 31a165baebe6dec616b1f8f3207b4273"
// @Param body body	ReleaseTemplateAdd true "JSON数据"
// @Success 200 {object} handler.ReportJSONResult
// @Router	/api/v1/release/template/add [post]
func (u *UserHandler) CreateUser(ctx *gin.Context) {
	// 从请求中把数据拿出来
	var user models.User
	var err error
	if err = ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err = user.Create(); err != nil {
		ctx.JSON(http.StatusOK, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (uh *UserHandler) LoginUser(ctx *gin.Context) {
	loginForm := forms.LoginForm{}
	result := utils.Result{
		Code: utils.Success,
		Msg:  "登录成功",
		Data: nil,
	}

	if err := ctx.ShouldBindJSON(&loginForm); err != nil {
		// 表单校验失败
		result.Code = utils.RequestError
		result.Msg = "参数错误"
		ctx.JSON(http.StatusOK, result)
		return
	}

	captchaConfig := &utils.CaptchaConfig{
		Id:          loginForm.CaptchaId,
		VerifyValue: loginForm.CaptchaVal,
	}

	if !utils.CaptchaVerify(captchaConfig) {
		// 检验失败
		result.Code = utils.RequestError
		result.Msg = "验证码错误"
		ctx.JSON(http.StatusOK, result)
		return
	}

	user := loginForm.BindToModel()
	u, _ := user.GetByUserName()
	if u.Username == "" {
		// 用户不存在
		result.Code = utils.RequestError
		result.Msg = "用户不存在"
		ctx.JSON(http.StatusOK, result)
		return
	}

	if !utils.CheckPwd(user.Password, u.Password) { // 密码错误
		result.Code = utils.RequestError
		result.Msg = "密码错误"
		ctx.JSON(http.StatusOK, result) // 返回 json
		return
	}

	token, _ := utils.GenToken(u.ID)
	result.Code = utils.Success
	result.Msg = "登录成功"
	data := gin.H{
		"userId":   u.ID,
		"username": u.Username,
		"userImg":  u.UserImg,
		"token":    token,
	}
	result.Data = data
	ctx.JSON(http.StatusOK, result)
}

func (u *UserHandler) LoginUser2(ctx *gin.Context) {
	authHeader := ctx.Request.Header.Get("Authorization")
	tokens := strings.Split(authHeader, " ")

	token, _ := utils.ParseToken(tokens[1])
	ctx.JSON(http.StatusOK, token.Id)
}

func (u *UserHandler) Captcha(ctx *gin.Context) {
	captcha := utils.CaptchaConfig{} // 创建验证码配置结构
	result := utils.Result{          // 返回数据结构
		Code: utils.Success,
		Msg:  "验证码创建成功",
		Data: nil,
	}

	base64, err := utils.GenerateCaptcha(&captcha) // 创建验证码
	if err != nil {                                // 异常处理
		result.Code = http.StatusBadRequest
		result.Msg = "服务器端错误"
		ctx.JSON(http.StatusOK, result)
		return
	}

	result.Data = gin.H{ // 封装 data
		"captcha_id":  captcha.Id,
		"captcha_url": base64,
	}

	ctx.JSON(http.StatusOK, result) // 返回 json 数据
}
