import { get, post, put } from '../utils/request'

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

// 修改密码验证
export const forgetPwd = ({ username, email, captcha_id, captcha_val }) => post({
  url: '/forget_pwd',
  data: {
    username, // 用户名
    email, // 邮箱
    captcha_id,  // 验证码 ID
    captcha_val // 验证码
  }
})

// 修改密码
export const editPwd = ({ password, email, second_pwd, captcha_id, captcha_val }) => put({
  url: '/edit_pwd',
  data: {
    password,  // 密码
    email, // 邮箱
    second_pwd, // 重复密码
    captcha_id,  // 验证码 ID
    captcha_val // 验证码
  }
})

// 刷新登录 
export const refresh = () => post({
  url: '/user/Authorization'
})