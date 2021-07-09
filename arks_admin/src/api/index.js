import { get, post, put, del } from '../utils/request'

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

// 删除分类
export const delCategory = ({ id }) => del({
  url: '/category/del',
  data: { id }
})

// 添加标签
export const addTag = ({ name, id }) => post({
  url: '/tag/add',
  data: { name, id }
})

// 修改标签
export const editTag = ({ name, id }) => put({
  url: '/tag/edit',
  data: { name, id }
})

// 标签列表
export const getTagList = (params) => get({
  url: '/tag/list',
  params
})

// 删除标签
export const delTag = ({ id }) => del({
  url: '/tag/del',
  data: { id }
})

// 添加文章
export const addArcitle = (data) => post({
  url: '/article/add',
  data
})

// 获取文章
export const getArcitleList = (params) => get({
  url: '/article/list',
  params
})