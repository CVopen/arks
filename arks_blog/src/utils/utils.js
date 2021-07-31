export const random = (num) => {
  return Math.random()*num
}

//封装的Hooks⽤用use开头
export const formDate = (time, type = 'YYYY-MM-DD') =>{
  const date = new Date(time)
  const d = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
    D: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    H: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    Mi: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    S: date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  }
  switch (type) {
    case 'YYYY-MM-DD':
      return`${d.Y}-${d.M}-${d.D}`
    case 'YYYY-MM-DD hh:mm:ss':
      return`${d.Y}-${d.M}-${d.D} ${d.H}:${d.Mi}:${d.S}`
    default:
      return `${d.Y}-${d.M}-${d.D}`
  }
}

// 获取日期
export const getDate = () => {
  const date = new Date()
  return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getFullYear()}`
}

// 获取时间
export const getTime = () => {
  const date = new Date()
  return `${date.getHours() < 10 ? `0${date.getHours()}`: date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`
}