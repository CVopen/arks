import Nofound from '../pages/NoFound/index.jsx' // 404页面
import Home from '../pages/home/index.jsx'  // 主页
const routes = [
  {
    path: '/',
    component: Home
  },
  // {
  //   path: '/index',
  //   redirect: '/index/discover'
  // },
  {
    path: '*',
    component: Nofound
  }
]
export default routes