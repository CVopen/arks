// 传参编码
export const encodeQuery = query => {
  let queryStr = ''
  const keys = Object.keys(query)
  keys.forEach((item, index) => {
    queryStr += `${item}=${query[item]}`
    if (index !== keys.length - 1) {
      queryStr += '&'
    }
  })
  return '?' + queryStr
}

// 传参解码
export const decodeQuery = queryStr => {
  queryStr = queryStr.slice(1).split('&')
  const result = {}
  queryStr.forEach(item => {
    item = item.split('=')
    result[item[0]] = item[1]
  })
  return result
}
