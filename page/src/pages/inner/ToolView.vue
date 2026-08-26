<script setup lang="ts">
import { useRoute } from 'vue-router'
import {defineAsyncComponent, shallowRef, watch} from "vue";
import "@pages/inner/override.css"

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
    <Page/>
</template>

<style scoped>

</style>