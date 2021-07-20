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
        {
          path: "/system",
          name: "system",
          meta: {
            title: '系统设置',
            index: "/system",
          },
          component: () => import (
            /* webpackChunkName: "system" */
            "../views/system/index.vue"),
        },
        {
          path: 'journal',
          name: 'journal',
          meta: {
            index: '/journal',
          },
          component: () => import (
            /* webpackChunkName: "journal" */
            "../views/tag/index.vue")
        },
        {
          path: 'opinion',
          name: 'opinion',
          meta: {
            index: '/opinion',
          },
          component: () => import (
            /* webpackChunkName: "opinion" */
            "../views/tag/index.vue")
        }
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
            /* webpackChunkName: "category-list" */
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
            /* webpackChunkName: "category-tag" */
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
      path: "/links",
      name: "links",
      component: Home,
      meta: { title: '外链', icon: 'el-icon-paperclip', index: "/links" },
      children: [
        {
          path: 'friends',
          name: 'friends',
          meta: {
            title: '友链',
            index: '/links/friends',
          },
          component: () => import (
            /* webpackChunkName: "friends" */
            "../views/links/index.vue")
        },
        {
          path: 'tools',
          name: 'tools',
          meta: {
            title: '工具',
            index: '/links/tools',
          },
          component: () => import (
            /* webpackChunkName: "tools" */
            "../views/links/index.vue")
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
    },
    {
      path: '/',
      redirect: '/system',
      meta: { title: '系统设置', icon: 'el-icon-setting', index: "/system" },
    },
    {
      path: '/',
      redirect: '/journal',
      meta: { title: '系统日志', icon: 'el-icon-s-order', index: "/journal" }
    },
    {
      path: '/',
      redirect: 'opinion',
      meta: { title: '意见', icon: 'el-icon-s-comment', index: "/opinion" }
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title ? to.meta.title : 'login'} | ark_admin`
    const token = Session('get', 'token')
    if (to.path === '/login') {
      if (token) next('/')
      next()
    } else {
      if (!token) next('/login')
      next()
    }

});

export default router;