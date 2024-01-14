<script lang="ts" setup>
import { computed } from 'vue'
import { resolveStamp, type StampItem } from '../composables/stamps.js'

const props = defineProps<StampItem>()

const info = computed(() => resolveStamp(props))
</script>

<template>
  <img v-if="!info.link" :src="info.img" :alt="info.alt" />
  <a :href="info.link" target="_blank" rel="noreferrer">
    <img v-if="info.link" :src="info.img" :alt="info.alt" />
  </a>
</template>
