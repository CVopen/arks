import {createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/index.vue";
import Session from '../utils/sessionStorage'
const routes = [
    {
        path: '/',
        redirect: '/home'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/home",
                name: "home",
                meta: {
                    title: '系统首页'
                },
                component: () => import (
                /* webpackChunkName: "dashboard" */
                "../views/home/index.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import (
                /* webpackChunkName: "table" */
                "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import (
                /* webpackChunkName: "charts" */
                "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import (
                /* webpackChunkName: "form" */
                "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import (
                /* webpackChunkName: "tabs" */
                "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import (
                /* webpackChunkName: "donate" */
                "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import (
                /* webpackChunkName: "permission" */
                "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import (
                /* webpackChunkName: "i18n" */
                "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import (
                /* webpackChunkName: "upload" */
                "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import (
                /* webpackChunkName: "icon" */
                "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */
                '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */
                '../views/403.vue')
            }
        ]
    }, {
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