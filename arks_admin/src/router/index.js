import {createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/index.vue"
import Session from '../utils/sessionStorage'
const routes = [
    {
      path: '/',
      redirect: '/home',
      meta: { title: '系统首页', icon: 'el-icon-lx-home', index: "/" },
    },
    {
      path: "/",
      hidden: true,
      component: Home,
      meta: { title: '系统首页', icon: 'el-icon-lx-home', index: "/" },
      children: [
        {
          path: "/home",
          name: "home",
          meta: {
            title: '系统首页',
            index: "/home",
          },
          component: () => import (
            /* webpackChunkName: "home" */
            "../views/home/index.vue"),
        },
      ]
    },
    {
      path: "/",
      component: Home,
      meta: { title: '系统设置', icon: 'el-icon-setting', index: "/" },
      children: [
        {
          path: "/system",
          name: "system",
          meta: {
            title: '系统设置',
            index: "/system",
          },
          component: () => import (
            /* webpackChunkName: "home" */
            "../views/system/index.vue"),
        },
      ]
    },
    {
      path: "/category",
      name: "category",
      component: Home,
      meta: { title: '分类', icon: 'el-icon-lx-cascades', index: "/category" },
      children: [
        {
          path: "list",
          name: "category-list",
          meta: {
            title: '文章分类',
            index: "/category/list",
          },
          component: () => import (
            /* webpackChunkName: "category" */
            "../views/category/index.vue")
        },
        {
          path: "tag",
          name: "category-tag",
          meta: {
            index: "/category/tag",
            title: '文章标签'
          },
          component: () => import (
            /* webpackChunkName: "category" */
            "../views/tag/index.vue")
        }
      ],
    },
    {
      path: "/arcitle",
      name: "arcitle",
      component: Home,
      meta: { title: '文章', icon: 'el-icon-lx-copy', index: "/arcitle" },
      children: [
        {
          path: "list",
          name: "arcitle-list",
          meta: {
            index: "/arcitle/list",
            title: "文章列表"
          },
          component: () => import (
            /* webpackChunkName: "arcitle-list" */
            "../views/arcitle/list.vue")
        },
        {
          path: "add",
          name: "arcitle-add",
          meta: {
            index: "/arcitle/add",
            title: "添加文章"
          },
          component: () => import (
            /* webpackChunkName: "category-add" */
            "../views/arcitle/detail.vue")
        }
      ],
    },
    {
      path: '/404',
      name: '404',
      hidden: true,
      meta: {
          title: '找不到页面'
      },
      component: () => import (/* webpackChunkName: "404" */
      '../views/404.vue')
    }, 
    {
      path: '/403',
      name: '403',
      hidden: true,
      meta: {
          title: '没有权限'
      },
      component: () => import (/* webpackChunkName: "403" */
      '../views/403.vue')
    },
    {
      path: "/login",
      name: "Login",
      hidden: true,
      meta: {
          title: 'login'
      },
      component: () => import (
      /* webpackChunkName: "login" */
      "../views/login/index.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title ? to.meta.title : 'login'} | ark_admin`
    const token = Session('get', 'token')
    if (token) {
        if (to.path === '/login') {
            next('/')
        }
        next()
    } else {
        if (to.path === '/login') {
            next()
        }
        next('/login')
    }
});

export default router;