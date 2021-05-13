import { get, post } from '../utils/request'

// 获取验证码base64
export const getCaptcha = () => get({
  url: '/captcha'
})

// 登录
export const login = ({ username, password, captcha_id, captcha_val }) => post({
  url: '/login',
  data: {
    username, // 用户名
    password,  // 密码
    captcha_id,  // 验证码 ID
    captcha_val // 验证码
  }
})

// 注册
export const register = ({ username, password, nickname, email, second_pwd, captcha_id, captcha_val }) => post({
  url: '/register',
  data: {
    username, // 用户名
    password,  // 密码
    nickname, // 用户昵称
    email, // 邮箱
    second_pwd, // 确认密码
    captcha_id,  // 验证码 ID
    captcha_val // 验证码
  }
})

