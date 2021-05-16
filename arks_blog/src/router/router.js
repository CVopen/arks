import Nofound from '../pages/NoFound/index.jsx' // 404页面
import Home from '../pages/home/index.jsx'  // 主页
import Login from '../pages/user/login/index'
import Register from '../pages/user/register/index'
import Forget from '../pages/user/forget/index'
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
    path: '/user/login',
    component: Login
  },
  {
    path: '/user/register',
    component: Register,
  },
  {
    path: '/user/forget',
    component: Forget,
  },
  {
    path: '*',
    redirect: '/404'
  }
]
export default routes