
import { lazy } from 'react'

const routes = [
  {
    path: '/',
    // 主页
    component: lazy(() => import('../pages/home/index.jsx'))
  },
  {
    path: '/404',
    // 404
    component: lazy(() => import('../pages/NoFound/index.jsx'))
  },
  {
    path: '/center',
    component: lazy(() => import('../pages/center/index.jsx')),
  },
  {
    path: '/login',
    component: lazy(() => import('../pages/user/login/index.jsx'))
  },
  {
    path: '/register',
    component: lazy(() => import('../pages/user/register/index.jsx')),
  },
  {
    path: '/forget',
    component: lazy(() => import('../pages/user/forget/index.jsx')),
  },
  {
    path: '/category',
    component: lazy(() => import('../pages/category/index.jsx'))
  },
  {
    path: '/tag',
    component: lazy(() => import('../pages/tag/index.jsx'))
  },
  {
    path: '/tools',
    component: lazy(() => import('../pages/tools/index.jsx'))
  },
  {
    path: '/friends',
    component: lazy(() => import('../pages/friends/index.jsx'))
  },
  {
    path: '/article_list',
    component: lazy(() => import('../pages/articleList/index.jsx'))
  },
  {
    path: '/article_details',
    component: lazy(() => import('../pages/detail/index.jsx'))
  },
  {
    path: '*',
    redirect: '/404'
  }
]
export default routes