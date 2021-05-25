package controller

import (
	"arks_servers/forms"
	"arks_servers/utils"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type UserHandler struct{}

// @Summary 注册
// @Tags 授权
// @version 1.0
// @Accept application/json
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /blog/register [post]
func (uh *UserHandler) CreateUser(ctx *gin.Context) {
	// 从请求中把数据拿出来
	registerForm := forms.RegisterForm{}
	result := utils.Result{
		Code: utils.Success,
		Msg:  "注册用户成功",
		Data: nil,
	}
	var err error
	if err := ctx.ShouldBindJSON(&registerForm); err != nil {
		fmt.Println(err)
		result.Msg = "参数错误"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusBadRequest, result)
		return
	}

	captchaConfig := &utils.CaptchaConfig{
		Id:          registerForm.CaptchaId,
		VerifyValue: registerForm.CaptchaVal,
	}

	if !utils.CaptchaVerify(captchaConfig) {
		// 检验失败
		result.Code = utils.RequestError
		result.Msg = "验证码错误"
		ctx.JSON(http.StatusOK, result)
		return
	}

	// 绑定表单到实体结构
	user := registerForm.BindToModel()
	u, _ := user.GetByUserName() // 查询是否存在该用户
	if u.Username != "" {
		// 用户已经被注册
		result.Code = utils.RequestError
		result.Msg = "该用户已存在"
		ctx.JSON(http.StatusOK, result)
		return
	}
	if u.Email != "" {
		// 邮箱已经被注册
		result.Code = utils.RequestError
		result.Msg = "该邮箱已经被注册"
		ctx.JSON(http.StatusOK, result)
		return
	}
	if err = user.Create(); err != nil {
		result.Msg = "创建用户失败"
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// @Summary 登录
// @Tags 授权
// @version 1.0
// @Accept application/json
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /blog/login [post]
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
		"nickName": u.Nickname,
		"sign":     u.Signature,
		"github":   u.Github,
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

// @Summary 创建验证码
// @Tags 授权
// @version 1.0
// @Accept application/json
// @Success 100 {object} utils.Result{"code":10000,"data":base64,"msg":"验证码创建成功"}
// @Failure 103/104 object utils.Result {"code":10001,"data":base64,"msg":"服务器端错误"}
// @Router /blog/captcha [get]
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

// @Summary 修改密码验证
// @Tags 授权
// @version 1.0
// @Accept application/json
// @Success 100 {object} utils.Result{"code":10000,"data":base64,"msg":"验证码创建成功"}
// @Failure 103/104 object utils.Result {"code":10001,"data":base64,"msg":"服务器端错误"}
// @Router /blog/captcha [get]
func (uh *UserHandler) ForgetPws(ctx *gin.Context) {
	forgetForm := forms.ForgetForm{}
	result := utils.Result{
		Code: utils.Success,
		Msg:  "验证成功",
		Data: nil,
	}
	if err := ctx.ShouldBindJSON(&forgetForm); err != nil {
		// 表单校验失败
		result.Code = utils.RequestError
		result.Msg = "参数错误"
		ctx.JSON(http.StatusOK, result)
	}

	captchaConfig := &utils.CaptchaConfig{
		Id:          forgetForm.CaptchaId,
		VerifyValue: forgetForm.CaptchaVal,
	}
	if !utils.CaptchaVerify(captchaConfig) {
		// 检验失败
		result.Code = utils.RequestError
		result.Msg = "验证码错误"
		ctx.JSON(http.StatusOK, result)
		return
	}

	user := forgetForm.BindToModel()
	u, _ := user.GetByEmailToUser()
	if u.Username == "" {
		// 用户不存在
		result.Code = utils.RequestError
		result.Msg = "用户不存在"
		ctx.JSON(http.StatusOK, result)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// @Summary 修改密码
// @Tags 授权
// @version 1.0
// @Accept application/json
// @Success 100 {object} utils.Result{"code":10000,"data":base64,"msg":"验证码创建成功"}
// @Failure 103/104 object utils.Result {"code":10001,"data":base64,"msg":"服务器端错误"}
// @Router /blog/captcha [get]
func (uh *UserHandler) EditPwd(ctx *gin.Context) {
	editPwdForm := forms.EditPwdForm{}
	result := utils.Result{
		Code: utils.Success,
		Msg:  "重置密码成功",
		Data: nil,
	}

	if err := ctx.ShouldBindJSON(&editPwdForm); err != nil {
		result.Code = utils.RequestError
		result.Msg = "参数错误"
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}

	captchaConfig := &utils.CaptchaConfig{
		Id:          editPwdForm.CaptchaId,
		VerifyValue: editPwdForm.CaptchaVal,
	}

	if !utils.CaptchaVerify(captchaConfig) {
		// 检验失败
		result.Code = utils.RequestError
		result.Msg = "验证码错误"
		ctx.JSON(http.StatusOK, result)
		return
	}

	user := editPwdForm.BindToModel()
	err := user.EditUserPwd()
	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "server error"
		ctx.JSON(http.StatusOK, result)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// @Summary 刷新token
// @Tags 授权
// @version 1.0
// @Accept application/json
// @Success 100 {object} utils.Result{"code":10000,"data":base64,"msg":"验证码创建成功"}
// @Failure 103/104 object utils.Result {"code":10001,"data":base64,"msg":"服务器端错误"}
// @Router /blog/captcha [get]
func (uh *UserHandler) RefreshToken(ctx *gin.Context) {
	id, _ := ctx.Get("id")
	result := utils.Result{
		Code: utils.Success,
		Msg:  "刷新token成功",
		Data: nil,
	}
	token, err := utils.RefreshToken(id.(uint))
	if err != nil {
		// 检验失败
		result.Code = utils.RequestError
		result.Msg = err.Error()
		ctx.JSON(http.StatusOK, result)
		return
	}
	result.Data = gin.H{
		"token": token,
	}
	ctx.JSON(http.StatusOK, result)
}
