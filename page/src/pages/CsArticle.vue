<script setup lang="ts">
import type {article} from "@misc/interface.ts";
import {computed, onMounted, ref} from "vue";
import Load from "@pages/framework/Load.vue";

const whole = ref<article>()
onMounted(async () => {
    const response1 = await fetch('/config/article.json')
    whole.value = await response1.json()
})
const config = computed(() => whole.value?.cs)

const tag = ref("")
const all = ref(true)
const filteredArticles = computed(() => {
    if(config.value!==undefined) {
        if (all.value) return config.value.list
        return config.value.list.filter(post => post.tag === tag.value)
    }
})
</script>

<template>
    <div class="tp-root">
        <div class="head">
            <router-link class="tp-back-listview" to="/">
                <i class="bi bi-arrow-left-circle size-big-title"></i>
            </router-link>
            <div class="size-big-title">Computer Science</div>
        </div>

        <load v-if="!config"/>

        <div v-if="config" class="tag-layout tk-noselect">
            <div class="tag" @click="all = true">全部显示</div>
            <div class="tag" v-for="item in config.tag">
                <div @click="tag=item;all=false">
                    {{item}}
                </div>
            </div>
        </div>

        <div v-if="config" class="article-layout">
            <div class="article-card tk-noselect" v-for="item in filteredArticles"
                 @click="$router.push(`/post/${encodeURIComponent(item.file)}`)">
                <div>
                    <div class="size-title">{{item.title}}</div>
                    <div class="artcile-info-line">
                        <div class="size-tiny tag">{{item.tag}}</div>
                        <div class="article-info-date size-small-content">{{item.date}}</div>
                    </div>
                    <div class="">{{item.abstract}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .head{
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-bottom: 20px;
        align-items: center;
        justify-content: start;
        gap: 20px;
    }

    .tag-layout{
        box-sizing: border-box;
        border-radius: 20px;
        background-color: floralwhite;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 20px;
        gap: 10px;
        flex-wrap: wrap;
    }

    .tag{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        background-color: blanchedalmond;
        padding: 8px;
    }

    .article-layout{
        columns: 3;
        column-gap: 20px;
        width: 100%;
        margin-top: 20px;
    }

    .article-layout > :deep(*) {
        margin-top: 0;
    }

    .article-card{
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 15px;
        padding: 20px;
        break-inside: avoid;
        text-wrap: pretty;
        white-space: pre-wrap;
        margin-bottom: 20px;
    }

    .article-card:nth-child(3n+1){
        background-color: aliceblue;
    }
    .article-card:nth-child(3n+2){
        border-width: 2px;
        border-style: solid;
        border-color: lightblue;
    }
    .article-card:nth-child(3n){
        background-color: mintcream;
    }

    .artcile-info-line{
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
    }

    .article-info-date{
        color: gray;
    }

    @media screen and (max-width: 768px) {
        .article-layout {
            columns: 1;
            column-gap: 15px;
        }

        .tag-layout{
            justify-content: start;
        }
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
        .article-layout {
            columns: 2;
            column-gap: 15px;
        }
    }
</style>