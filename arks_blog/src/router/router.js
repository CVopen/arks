import Nofound from '../pages/NoFound/index.jsx' // 404页面
import Home from '../pages/home/index.jsx'  // 主页
import Login from '../pages/user/login/index'
import Register from '../pages/user/register/index'
import Test from '../pages/test'
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
    component: Test,
  },
  {
    path: '/center',
    component: Nofound,
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '*',
    redirect: '/404'
  }
]
export default routes