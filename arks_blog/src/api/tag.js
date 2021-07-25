import { get } from '../utils/request'

// 获取标签列表
export const getTagList = params => get({
  url: '/tag/list',
  params
})