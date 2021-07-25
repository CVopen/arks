import { get } from '../utils/request'

// 获取文章列表
export const getCategoryList = params => get({
  url: '/category/list',
  params
})