<script setup lang="ts">
defineProps<{ tagline?: string }>()
</script>

<template>
  <div v-if="tagline" class="landing-card tagline">{{ tagline }}</div>
</template>

<style scoped>
.landing-card.tagline {
  width: fit-content;
  padding: 24px 32px;
  font-family: 'Ma Shan Zheng', sans-serif;
  font-weight: 400;
  font-size: 20px;
  margin-top: 48px;
}

.landing-card.tagline::before,
.landing-card.tagline::after {
  position: absolute;
  color: var(--landing-c-text);
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  mask: var(--icon);
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: currentColor;
  transition: background-color var(--vp-t-color);
}

.landing-card.tagline::before {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='24' viewBox='0 0 34 24'%3E%3Cpath fill='%23000' d='M31.2 0H24l-4.8 9.6V24h14.4V9.6h-7.2zM12 0H4.8L0 9.6V24h14.4V9.6H7.2z'/%3E%3C/svg%3E");
  top: 8px;
  left: 8px;
}

.landing-card.tagline::after {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='24' viewBox='0 0 34 24'%3E%3Cpath fill='%23000' d='M2.4 24h7.2l4.8-9.6V0H0v14.4h7.2zm19.2 0h7.2l4.8-9.6V0H19.2v14.4h7.2z'/%3E%3C/svg%3E");
  bottom: 8px;
  right: 8px;
}
</style>
