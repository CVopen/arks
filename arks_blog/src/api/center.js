import { get, post, del } from '../utils/request'

// 获取意见
export const getOpinion = () => get({
  url: '/opinion/list'
})

// 添加意见
export const AddOpinion = data => post({
  url: '/opinion/add',
  data
})

// 获取历史记录
export const getHistoryList = params => get({
  url: '/history/list',
  params
})

// 删除历史记录
export const delHistoryList = ({ id }) => del({
  url: '/history/del',
  data: { id }
})

// 获取我的文章
export const getArticleList = params => get({
  url: '/article/auth',
  params
})