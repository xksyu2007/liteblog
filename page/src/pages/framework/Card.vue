<script setup lang="ts">
import {computed, type ComputedRef} from "vue"

// args
type direction = 'column' | 'row'
type arrangement = 'start' | 'center' | 'end'
const props = defineProps<{
    direction?: direction,
    alignx?: arrangement,
    aligny?: arrangement,
    gap?: string,
    padding?: string,
    bgcolor?: string
}>()

// Direction - set col as default
const direction: ComputedRef<direction> = computed(() => props.direction ?? 'column')

// Justify & Align
const alignx = computed(() => props.alignx ?? 'start')
const aligny = computed(() => props.aligny ?? 'center')
const justify = computed(() => {
    if(direction.value === 'row'){
        return alignx
    } else {
        return aligny
    }
})
const align = computed(() => {
    if(direction.value === 'row'){
        return aligny
    } else {
        return alignx
    }
})

// other styles
const gap = computed(() => props.gap ?? '0')
const padding = computed(() => props.padding ?? '20px')
const bgcolor = computed(() => props.bgcolor ?? 'inherit')
</script>

<template>
    <div class="card-main-layout" id="card-main-layout">
        <slot/>
    </div>
</template>

<style scoped>
.card-main-layout{
    display: flex;
    flex-direction: v-bind(direction);
    justify-content: v-bind(justify);
    align-items: v-bind(align);

    gap: v-bind(gap);
    padding: v-bind(padding);
    border-radius: 20px;

    background-color: v-bind(bgcolor);
}
</style>