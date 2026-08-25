<script setup lang="ts">
    import {onMounted, ref} from "vue";
    import type {home} from "@misc/interface";

    const config = ref<home>()
    onMounted(async () => {
        const response1 = await fetch('/config/home.json')
        config.value = await response1.json()
    })

    function visit(link:string){
        window.location.href = link
    }
</script>

<template>
<div class="main-layout no-select">
    <div class="sub-layout">

        <div class="title-layout">
            <div class="title-zh size-header">流年未止 未来可期</div>
            <div class="title-en size-subheader">The story continues.</div>
        </div>
        <div class="headcard-layout">
            <div class="headcard-block" v-for="item in config.headcard" v-if="config">
                <div class="headcard-block-inner-layout" @click="visit(item.link)">
                    <div class="size-title">{{item.title}}</div>
                    <div class="size-small-content">{{item.content}}</div>
                </div>
            </div>
        </div>
        <div class="card-layout">
            <router-link to="project" class="card-single">
                <i class="bi bi-boxes size-title"></i>
                <div class="size-small-content">项目</div>
            </router-link>
            <router-link to="tool" class="card-single">
                <i class="bi bi-wrench-adjustable-circle size-title"></i>
                <div class="size-small-content">工具</div>
            </router-link>
            <router-link to="cspost" class="card-single">
                <i class="bi bi-code-slash size-title"></i>
                <div class="size-small-content">计算机</div>
            </router-link>
            <router-link to="miscpost" class="card-single">
                <i class="bi bi-text-paragraph size-title"></i>
                <div class="size-small-content">随笔杂文</div>
            </router-link>

            <div class="card-single" @click="visit('https://cloud.xksyu.cn')">
                <i class="bi bi-cloud size-title"></i>
                <div class="size-small-content">云盘</div>
            </div>
            <div class="card-single" @click="visit(config.card.email)" v-if="config">
                <i class="bi bi-envelope size-title"></i>
                <div class="size-small-content">Email</div>
            </div>
            <div class="card-single" @click="visit(config.card.github)" v-if="config">
                <i class="bi bi-git size-title"></i>
                <div class="size-small-content">Github</div>
            </div>
        </div>

    </div>
</div>
</template>

<style scoped>
.main-layout{
    width: 100vw;
    height: 100vh;
    background-color: ghostwhite;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.sub-layout{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 90%;
    min-width: 70%;
}

.title-layout{
    display: flex;
    flex-direction: column;
    align-self: start;
    text-wrap: balance;
}

.title-zh{
    font-family: ZH_A, sans-serif;
}

.headcard-layout{
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: space-between;
    width: 100%;
}

.headcard-block{
    border-radius: 20px;
    background-color: antiquewhite;
    padding: 20px;
    margin: 20px 0;
    width: 48%;
    text-wrap: balance;
}

.card-layout{
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width: 100%;
}

.card-single{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: lavender;
    padding: 20px;
    width: 15%;
    height: 80px;
    text-wrap: balance;
}
</style>