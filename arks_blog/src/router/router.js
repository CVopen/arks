import Nofound from '../pages/NoFound/index.jsx' // 404页面
import Home from '../pages/home/index.jsx'  // 主页
import Login from '../pages/user/login'
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/404',
    component: Nofound,
  },
  {
    path: '/test',
    component: Nofound,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/center',
    component: Nofound,
  },
  {
    path: '*',
    redirect: '/404'
  }
]
export default routes