import { get } from '../utils/request'

export const getCaptcha = () => get({
  url: '/captcha'
})
