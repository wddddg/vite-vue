import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from "../pages/home/index.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/article-management',
                name: 'article-management',
                component: () => import('../pages/article-management/index.vue'),
                children: [
                    {
                        path: '/article-management/add',
                        name: 'add',
                        component: () => import('../pages/article-management/components/add.vue'),
                    },
                    {
                        path: '/article-management/management',
                        name: 'management',
                        component: () => import('../pages/article-management/components/management.vue'),
                    }
                ]
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('../pages/list/index.vue')
            },
            {
                path: '/user-center',
                name: 'userCenter',
                component: () => import('../pages/user-center/index.vue')
            },
            {
                path: '/user-list',
                name: 'userList',
                component: () => import('../pages/user-list/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        props: { isLogin: true },
        component: () => import('../pages/login/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        props: { isLogin: false },
        component: () => import('../pages/login/index.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router