import axios from 'axios'
import Session from './sessionStorage'
import md5 from 'js-md5'
// import { message } from 'antd';
// import store from '../store/index'

const instance = axios.create({
  baseURL: '/admin/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const signString = (strObj) => {
  let str = ''
  for (const key in strObj) {
    str += (key + strObj[key])
  }
  str += 'xyhOpen@666'
  return md5(str)
}

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    const timestamp = Date.parse(new Date())
    const token = Session('get', 'token')
    config.headers.timestamp = timestamp
    config.headers.Authorization = token ? 'Bearer ' + token : ''
    config.headers.sign = signString({ timestamp: timestamp / 1000, Authorization: token ? 'Bearer ' + token : '' })
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    if (response.data.code === 10002) {
    //   store.dispatch({type: 'SET_USERINFO', value: {}})
      Session('remove', 'token')
      Session('remove', 'userInfo')
    }
    if (response.data.code !== 10000) {
    //   message.error(response.data.msg)
      return Promise.reject("请求失败")
    }
    return response.data
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

const factory = ({ method, url, params = {}, data = {}, headers = {} }) => {
  return instance.request({
    url,
    method,
    headers,
    data,
    params
  })
}

export const get = ({ url, params, headers = {} }) => {
  return factory({
    url,
    method: "get",
    params,
    headers
  })
}

export const post = ({ url, params, data, headers = {} }) => factory({
  url,
  method: "post",
  params,
  data,
  headers
})

export const put = ({ url, params, data, headers = {} }) => factory({
  url,
  method: "put",
  params,
  data,
  headers
})

export const del = ({ url, params, data, headers = {} }) => factory({
  url,
  method: "delete",
  params,
  data,
  headers
})
