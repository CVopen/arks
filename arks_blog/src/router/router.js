import Nofound from '../pages/NoFound/index.jsx' // 404页面
import Home from '../pages/home/index.jsx'  // 主页
import Login from '../pages/user/login/index' // 登录页
import Register from '../pages/user/register/index' // 注册页
import Forget from '../pages/user/forget/index' // 忘记密码
import Center from '../pages/center/index' // 个人中心页面
import Category from '../pages/category/index' // 文章分类
import Tag from '../pages/tag/index' // 文章分类
import Tools from '../pages/tools/index' // 文章分类
import Friends from '../pages/friends/index' // 文章分类
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
    path: '/category',
    component: Category
  },
  {
    path: '/tag',
    component: Tag
  },
  {
    path: '/tools',
    component: Tools
  },
  {
    path: '/friends',
    component: Friends
  },
  {
    path: '*',
    redirect: '/404'
  }
]
export default routes