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

// 添加分类
export const addCategory = ({ name, desc }) => post({
  url: '/category/add',
  data: {
    name, // 分类名
    desc
  }
})

// 修改分类
export const editCategory = ({ name, desc, id }) => put({
  url: '/category/edit',
  data: { name, desc, id }
})

// 分类列表
export const getCategoryList = (params) => get({
  url: '/category/list',
  params
})