<script lang="ts" setup>
import { computed } from 'vue';
import { resolveStamp, type StampItem } from '../composables/stamps.js';

const props = defineProps<StampItem>()

const info = computed(() => resolveStamp(props))
</script>

<template>
  <img v-if="!info.link" :src="info.img" :alt="info.img" />
  <a :href="info.link" target="_blank" rel="noopener noreferrer">
    <img v-if="info.link" :src="info.img" :alt="info.img" />
  </a>
</template>
