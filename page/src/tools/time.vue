<script setup lang="ts">
  import {basicReaderAsync,gui} from 'coursemap'
  import 'coursemap/style.css'
  import {onMounted, ref} from "vue";

  const ui =  ref<HTMLDivElement | null>(null)
  onMounted(async () => {
    await basicReaderAsync(()=>
       fetch('/tool-config/time.json').then(r => r.text())
    )
    if(ui.value) {
      ui.value.appendChild(gui())
    }
  })
</script>

<template>
  <div ref="ui" class="ui"></div>
</template>

<style>
</style>