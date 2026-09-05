<script setup lang="ts">
import { useRoute } from 'vue-router'
import {defineAsyncComponent, shallowRef, watch} from "vue";

const route = useRoute()
const Page = shallowRef();
watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            const componentName = (newId as string).replace('.vue', '');
            Page.value = defineAsyncComponent(() => import(`@tools/${componentName}.vue`));
        }
    },
    { immediate: true }
);
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
            <div class="page">
                <Page/>
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

.page{
    width: 100%;
    margin-top: 10px;
}
</style>