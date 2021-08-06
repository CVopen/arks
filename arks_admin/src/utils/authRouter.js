import store from '../store/index'
import Session from './sessionStorage'
export const authSide = (router) => {
  
  const authRouter = []

  router.forEach(item => {
    if (item.meta.auth) {
      if (store.state.user.userInfo.userId == 1) {
        authRouter.push(item)
      }
    } else {
      if (item.children) {
        const children = JSON.parse(JSON.stringify(item.children))
        children.forEach((el, index) => {
          if (el.meta.auth) {
            if (store.state.user.userInfo.userId == 1) {
              item.children.splice(index, 1)
            }
          }
        })
      }
      authRouter.push(item)
    }
  })
  return authRouter
}

export const auth = (item) => {
  const userInfo = Session('get', 'userInfo')
  if (item.meta.auth && store.state.user.userInfo.userId != 1) {
    if (userInfo && JSON.parse(userInfo).userId != 1) {
      return false
    }
  }
  return true
}