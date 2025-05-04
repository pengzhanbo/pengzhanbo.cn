<script setup lang="ts">
import VPLink from 'vuepress-theme-plume/components/VPLink.vue'
import VPIcon from 'vuepress-theme-plume/components/VPIcon.vue'

interface LandingNavItem {
  text: string
  link?: string
  icon: string
}

defineProps<{
  nav?: LandingNavItem[]
}>()
</script>

<template>
  <div class="landing-nav">
    <div
      class="landing-card nav-item"
      v-for="(item, index) in nav"
      :key="item.text + index"
    >
      <VPLink :href="item.link" no-icon class="nav-item-link">
        <VPIcon :name="item.icon" v-if="item.icon" />
        <span>{{ item.text }}</span>
      </VPLink>
    </div>
  </div>
</template>

<style scoped>
.landing-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.landing-card.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.landing-card .nav-item-link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  gap: 8px 16px;
  width: 100%;
  padding: 24px 16px;
}

.landing-card .nav-item-link :deep(.vp-icon) {
  margin: 0;
  width: 1.5em;
  height: 1.5em;
}

@media (max-width: 767px) {
  .landing-card .nav-item-link {
    gap: 8px;
    font-size: 14px;
    padding: 16px 8px;
  }

  .landing-card .nav-item-link :deep(.vp-icon) {
  width: 1.25em;
  height: 1.25em;
}
}
</style>
