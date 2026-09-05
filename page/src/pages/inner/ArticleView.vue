<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from "markdown-it";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";
import hljs from 'highlight.js/lib/core';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import kotlin from 'highlight.js/lib/languages/kotlin';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import powershell from 'highlight.js/lib/languages/powershell';
import dos from 'highlight.js/lib/languages/dos';
import rust from 'highlight.js/lib/languages/rust';
import nginx from 'highlight.js/lib/languages/nginx'
import 'highlight.js/styles/github.css';
import type {article, articleInfo} from "@misc/interface.ts";
hljs.registerLanguage('c', c);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('java', java);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('powershell', powershell);
hljs.registerLanguage('dos', dos);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('nginx', nginx);
const languageAliases: Record<string, string> = {
    'c++': 'cpp',
    js: 'javascript',
    ts: 'typescript',
    html: 'xml',
    vue: 'xml',
    sh: 'bash',
    shell: 'bash',
    ps: 'powershell',
    ps1: 'powershell',
    cmd: 'dos',
    bat: 'dos',
    batch: 'dos',
    kt: 'kotlin',
    rs: 'rust',
};

const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str: string, lang: string): string {
        const language = languageAliases[lang.toLowerCase()] ?? lang.toLowerCase();
        if (language && hljs.getLanguage(language)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(str, { language, ignoreIllegals: true }).value}</code></pre>`;
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
                     @click="$router.back()">
                    <i class="bi bi-arrow-left-circle size-title"></i>
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
    margin-top: 20px;
}
</style>