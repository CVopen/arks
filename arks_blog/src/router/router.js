import Nofound from '../pages/NoFound/index.jsx' // 404页面
import Home from '../pages/home/index.jsx'  // 主页
import Login from '../pages/user/login/index' // 登录页
import Register from '../pages/user/register/index' // 注册页
import Forget from '../pages/user/forget/index' // 忘记密码
import Test from '../pages/test'
import Center from '../pages/center/index'
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
    component: Center,
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