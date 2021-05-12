package forms

import "acks_servers/models"

// 登录表单
type LoginForm struct {
	Username   string `json:"username" binding:"required,min=3,max=30" label:"用户名"`   // 用户名
	Password   string `json:"password" binding:"required,min=6,max=20" label:"密码"`    // 密码
	CaptchaId  string `json:"captcha_id" binding:"required" label:"验证码 ID"`           // 验证码 ID
	CaptchaVal string `json:"captcha_val" binding:"required,min=4,max=4" label:"验证码"` // 验证码
}

// 绑定表单到实体结构
func (form LoginForm) BindToModel() models.User {
	return models.User{
		Username: form.Username,
		Password: form.Password,
	}
}
