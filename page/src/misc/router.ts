import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@pages/Home.vue'

export const navList: RouteRecordRaw[] = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/project',
        component: () => import('@pages/Project.vue'),
    },
    {
        path: '/cspost',
        component: () => import('@pages/CsArticle.vue'),
    },
    {
        path: '/miscpost',
        component: () => import('@pages/MiscArticle.vue'),
    },
    {
        path: '/tool',
        component: () => import('@pages/Tool.vue'),
    },
    {
        path: '/post/:id',
        component: () => import('@pages/inner/ArticleView.vue'),
    },
    {
        path: '/tool/:id',
        component: () => import('@pages/inner/ToolView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: navList
})

export default router