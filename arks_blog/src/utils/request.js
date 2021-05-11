import axios from 'axios'

const instance = axios.create({
  baseURL: '/blog',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
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

export const post = ({ url, params, data, headers = {} }) => {
  return factory({
    url,
    method: "post",
    params,
    data,
    headers
  })
}

export const put = ({ url, params, data, headers = {} }) => {
  return factory({
    url,
    method: "put",
    params,
    data,
    headers
  })
}

export const del = ({ url, params, data, headers = {} }) => {
  return factory({
    url,
    method: "delete",
    params,
    data,
    headers
  })
}
