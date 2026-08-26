<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {article} from "@misc/interface.ts";

const config = ref<article>()
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
                <div class="size-big-title">Misc Article</div>
            </div>

            <div v-if="!config" class="load">
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
</style>