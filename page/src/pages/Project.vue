<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {home, project} from "@misc/interface.ts";

const config1 = ref<project>()
const config2 = ref<home>()
const day = ref(1314)

onMounted(async () => {
    const response1 = await fetch('/config/project.json')
    config1.value = await response1.json()
    const response2 = await fetch('/config/home.json')
    config2.value = await response2.json()

    if(config2.value) {
        const timestampNow: number = Date.now()
        const timestampStart: number = Date.parse(config2.value.card.date)
        day.value = Math.floor((timestampNow - timestampStart) / (1000 * 60 * 60 * 24))
    }
})

function visit(link:string){
    window.location.href = link
}
</script>

<template>
    <div class="main-layout">
        <div class="sub-layout">
            <div class="head no-select" v-if="config2">
                <div class="head-left">
                    <div class="head-left-a">
                        <router-link class="head-left-a-back" to="/">
                            <i class="bi bi-arrow-left-circle size-big-title"></i>
                        </router-link>
                        <div class="size-big-title">Project</div>
                    </div>
                    <div class="head-left-b" @click="visit(config2.card.github)">
                        <i class="bi bi-git size-big-title"></i>
                    </div>
                </div>

                <div class="head-right">
                    <div class="size-title">
                        学习程序设计知识
                    </div>
                    <div class="counter-b">
                        已经
                        <div class="size-subheader">{{day}}</div>
                        天
                    </div>
                </div>
            </div>

            <div v-if="!config1||!config2" class="load">
                <i class="bi bi-arrow-clockwise"></i>
                Loading ...
            </div>

            <div class="project" v-if="config1">
                <div class="project-single" v-for="item in config1">
                    <div class="project-title-layout">
                        <div class="size-big-title project-title">{{item.name}}</div>
                        <div class="project-button no-select size-small-content"
                            @clic="visit(item.link)">
                            Visit
                        </div>
                    </div>
                    <div>{{item.abstract}}</div>
                </div>
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

.head{
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: stretch;
}

.head-left{
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 30%;
}

.head-left-a{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 20px;
}

.head-left-a-back{
    width: 40%;
    border-radius: 80px;
    padding: 10px 0;
    background-color: lavender;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.head-left-b{
    border-radius: 80px;
    padding: 10px 0;
    background-color: floralwhite;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
}

.head-right{
    width: auto;
    background-color: aliceblue;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    justify-content: center;
}

.counter-b{
    align-self: end;
    align-items: end;
    display: flex;
    flex-direction: row;
}

.project{
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
}

.project-single{
    display: flex;
    flex-direction: column;
    gap: 15px;
    white-space: pre-wrap;
    padding: 30px;
}

.project-single:nth-child(even){
    background-color: mintcream;
    border-radius: 20px;
}
.project-single:nth-child(odd){
    align-items: end;
}

.project-title-layout{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px
}

.project-button{
    padding: 8px;
    border-radius: 50px;
    background-color: peachpuff;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media screen and (max-width: 768px) {
    .head{
        flex-direction: column;
        gap: 20px;
    }

    .head-left{
        width: 100%;
    }

    .head-left-b{
        display: none;
    }

    .head-right{
        box-sizing: border-box;
        width: 100%;
    }

    .project{
        gap: 10px;
    }

    .project-title-layout{
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }

    .project-single:nth-child(odd){
        align-items: start;
    }

    .project-title{
        white-space: pre-wrap;
    }
}
</style>