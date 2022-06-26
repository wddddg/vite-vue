import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from "../App.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: App
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login/index.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router