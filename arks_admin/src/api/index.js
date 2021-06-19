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

// 添加分类
export const addCategory = ({ name, desc }) => post({
  url: '/category/add',
  data: {
    name, // 分类名
    desc
  }
})

// 分类列表
export const getCategoryAll = () => get({
  url: '/category/list'
})