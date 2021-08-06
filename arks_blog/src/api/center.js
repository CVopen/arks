import { get, post } from '../utils/request'

// 获取意见
export const getOpinion = () => get({
  url: '/opinion/list'
})

export const AddOpinion = data => post({
  url: '/opinion/add',
  data
})
