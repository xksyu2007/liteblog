import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@pages/Home.vue'
import Project from "@pages/Project.vue";
import CsArticle from "@pages/CsArticle.vue";
import MiscArticle from "@pages/MiscArticle.vue";
import Tool from "@pages/Tool.vue";
import ArticleView from "@pages/inner/ArticleView.vue";
import ToolView from "@pages/inner/ToolView.vue";

export const navList:RouteRecordRaw[] = [
    {path:'/',component:Home},
    {path:'/project',component:Project},
    {path:'/cspost', component:CsArticle},
    {path:'/miscpost', component:MiscArticle},
    {path:'/tool',component:Tool},
    {path:'/post/:id',component: ArticleView},
    {path:'/tool/:id',component: ToolView}
]

const router = createRouter({
    history: createWebHistory(),
    routes: navList
})

export default router