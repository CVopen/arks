import { get } from '../utils/request'

// 获取工具列表
export const getToolsList = params => get({
  url: '/link/tools',
  params
})

// 获取友链列表
export const getFriendsList = params => get({
  url: '/link/friends',
  params
})