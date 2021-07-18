export const random = (num) => {
  return Math.random()*num
}

//封装的Hooks⽤用use开头
export const formDate = (time, type = 'YYYY-MM-DD') =>{
  const date = new Date(time)
  const d = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    H: date.getHours(),
    Mi: date.getMinutes(),
    S: date.getSeconds()
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