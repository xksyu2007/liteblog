<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from "markdown-it";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import type {article, articleInfo} from "@misc/interface.ts";
import "@pages/inner/markdown.css"


const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str: string, lang: string): string {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
            } catch (__) {}
        }
        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    }
});
md.use(MarkdownItGitHubAlerts);

const route = useRoute()
const Page = ref('')
const loading = ref(true)
onMounted(async () => {
    try {
        const id = route.params.id
        const response = await fetch(`/article/${id}`)

        if (response.ok) {
            const rawText = await response.text()
            Page.value = md.render(rawText)
        } else {
            Page.value = ''
        }
    } catch (error) {
        Page.value = ''
    } finally {
        loading.value = false
    }
})

const post = ref<articleInfo>()
onMounted(async () => {
    const response1 = await fetch('/config/article.json')
    const data:article = await response1.json()
    post.value = data.cs.list.find((item: articleInfo) => item.file === route.params.id)
    if(post.value === undefined){
        post.value = data.misc.list.find((item: articleInfo) => item.file === route.params.id)
    }
})
</script>

<template>
    <div class="main-layout">
        <div class="sub-layout">
            <div class="title no-select">
                <div class="title-home"
                     @click="$router.push(`/`)">
                    <i class="bi bi-house size-title"></i>
                </div>
                <div class="title-name size-title">
                    夏空拾雨小站
                </div>
            </div>

            <div class="head" v-if="post">
                <div class="size-big-title">{{post.title}}</div>
                <div class="head-info-layout">
                    <div class="head-tag size-tiny">{{post.tag}}</div>
                    <div class="head-date size-small-content">{{post.date}}</div>
                </div>
                <div class="size-content">{{post.abstract}}</div>
            </div>
            <div v-html="Page" class="article-content md size-content"/>

            <div v-if="loading||!post" class="load">
                <i class="bi bi-arrow-clockwise"></i>
                Loading ...
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-layout{
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sub-layout{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85vw;
}

.title{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
    margin-bottom: 20px;
}

.title-home{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    background-color: lavenderblush;
    padding: 20px;
    width: 25px;
    height: 25px;
}

.title-name{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    background-color: azure;
    padding: 20px;
    font-family: 'ZH_A', sans-serif;
    width: auto;
    flex-grow: 1;
}

.head{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    background-color: aliceblue;
    border-radius: 20px;
    width: 100%;
    white-space: pre-wrap;
    box-sizing: border-box;
}

.head-info-layout{
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
}

.head-tag{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: blanchedalmond;
    padding: 8px;
}

.head-date{
    color: gray;
}

.article-content{
    width: 100%;
}
</style>