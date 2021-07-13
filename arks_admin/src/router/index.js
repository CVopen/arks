import {createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/index.vue"
import Session from '../utils/sessionStorage'
const routes = [
    {
      path: '/',
      redirect: '/home'
    }, 
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '系统首页'
          },
          component: () => import (
          /* webpackChunkName: "home" */
          "../views/home/index.vue"),
        },
        {
          path: "/charts",
          name: "basecharts",
          meta: {
              title: '图表'
          },
          component: () => import (
          /* webpackChunkName: "charts" */
          "../views/BaseCharts.vue")
        },
        
        {
          path: "/upload",
          name: "upload",
          meta: {
              title: '上传插件'
          },
          component: () => import (
          /* webpackChunkName: "upload" */
          "../views/Upload.vue")
        }
      ]
    },
    {
      path: "/category",
      name: "category",
      component: Home,
      children: [
        {
          path: "list",
          name: "category-list",
          meta: {
              title: '文章分类'
          },
          component: () => import (
            /* webpackChunkName: "category" */
            "../views/category/index.vue")
        },
        {
          path: "tag",
          name: "category-tag",
          meta: {
              title: '标签分类'
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
      children: [
        {
          path: "list",
          name: "arcitle-list",
          meta: {
              title: '文章列表'
          },
          component: () => import (
            /* webpackChunkName: "arcitle-list" */
            "../views/arcitle/list.vue")
        },
        {
          path: "add",
          name: "arcitle-add",
          meta: {
              title: '添加文章'
          },
          component: () => import (
            /* webpackChunkName: "category-add" */
            "../views/arcitle/detail.vue")
        }
      ],
    },
    {
      path: "/permission",
      name: "permission",
      meta: {
          title: '权限管理',
          permission: true
      },
      component: () => import (
      /* webpackChunkName: "permission" */
      "../views/Permission.vue")
    }, 
    {
      path: '/404',
      name: '404',
      meta: {
          title: '找不到页面'
      },
      component: () => import (/* webpackChunkName: "404" */
      '../views/404.vue')
    }, 
    {
      path: '/403',
      name: '403',
      meta: {
          title: '没有权限'
      },
      component: () => import (/* webpackChunkName: "403" */
      '../views/403.vue')
    },
    {
      path: "/login",
      name: "Login",
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