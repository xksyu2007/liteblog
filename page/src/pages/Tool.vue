<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {tool} from "@misc/interface.ts";

const config = ref<tool>()
onMounted(async () => {
    const response1 = await fetch('/config/tool.json')
    config.value = await response1.json()
})
</script>

<template>
    <div class="main-layout">
        <div class="sub-layout">
            <div class="head">
                <router-link class="head-back" to="/">
                    <i class="bi bi-arrow-left-circle size-big-title"></i>
                </router-link>
                <div class="size-big-title">Tool</div>
            </div>

            <div v-if="!config" class="load">
                <i class="bi bi-arrow-clockwise"></i>
                Loading ...
            </div>

            <div v-if="config" class="tool-layout no-select">
                <div v-for="item in config" class="tool-single">
                    <div class="tool-single-title size-title"
                         @click="$router.push(`/tool/${encodeURIComponent(item.file)}`)">
                        {{item.name}}
                    </div>
                    <div class="tool-single-content size-content">
                        {{item.abstract}}
                    </div>
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
    margin-bottom: 20px;
    align-items: center;
    justify-content: start;
    gap: 20px;
}

.head-back{
    width: 10%;
    border-radius: 80px;
    padding: 10px 0;
    background-color: lavender;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.tool-layout{
    columns: 3;
    column-gap: 20px;
    width: 100%;
    margin-top: 20px;
}

.tool-layout > :deep(*) {
    margin-top: 0;
}

.tool-single{
    display: flex;
    flex-direction: column;
    gap: 10px;
    break-inside: avoid;
    text-wrap: pretty;
    white-space: pre-wrap;
    margin-bottom: 20px;
}

.tool-single-title{
    padding: 20px;
    border-radius: 25px;
    text-wrap: balance;
}

.tool-single:nth-child(even) .tool-single-title{
    background-color: aliceblue;
}
.tool-single:nth-child(odd) .tool-single-title{
    background-color: floralwhite;
}

@media screen and (max-width: 768px) {
    .head-back{
        width: 20%;
    }

    .tool-layout {
        columns: 1;
        column-gap: 15px;
    }

    .head{
        margin-bottom: 10px;
    }
}

@media screen and (min-width: 769px) and (max-width: 1280px) {
    .tool-layout {
        columns: 2;
        column-gap: 15px;
    }
}
</style>