<script setup lang="ts">

import Card from "@pages/framework/Card.vue";
</script>

<template>
    <card direction="row" alignx="center" aligny="center" bgcolor="lightcyan" padding="20px"
        class="load-main-layout">
        <i class="bi bi-arrow-clockwise"></i>
        Loading ...
    </card>
</template>

<style scoped>
    .load-main-layout{
        align-self: start;
        margin: 15px 0;
    }
</style>