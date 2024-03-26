<script lang="ts" setup>
import { toRefs } from 'vue'
import Stamp from './Stamp.vue'
import type { StampsProps } from '../composables/stamps.js'
import { useStamps } from '../composables/stamps.js'

const props = defineProps<StampsProps>()

const stampList = useStamps(toRefs(props))
</script>

<template>
  <p class="stamps-list">
    <Stamp v-for="(item, index) in stampList" :key="index" v-bind="item" />
  </p>
</template>

<style scoped>
.stamps-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.stamps-list :deep(a) {
  text-decoration: none;
  text-underline-offset: 0;
}
</style>
