import { get } from '../utils/request'

// 获取整站配置
export const getConfig = () => get({
  url: '/config'
})