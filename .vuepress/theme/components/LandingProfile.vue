<script setup lang="ts">
import VPSocialLinks from '@theme/VPSocialLinks.vue'
import { computed } from 'vue'
import { useData } from 'vuepress-theme-plume/client'

defineProps<{
  name?: string
  avatar?: string
}>()

const { theme } = useData()

const profile = computed(() => theme.value.profile)
const social = computed(() => theme.value.social)
</script>

<template>
  <div v-if="profile || (name && avatar)" class="landing-profile">
    <div class="landing-card profile-avatar">
      <img :src="avatar || profile?.avatar" alt="Avatar">
    </div>
    <div>
      <h2 class="profile-name">
        {{ name || profile?.name }}
      </h2>
      <VPSocialLinks :links="social" />
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .landing-profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
  }
}

.landing-card.profile-avatar {
  width: 128px;
  height: 128px;
  padding: 4px;
  margin: 0 auto 16px;
  border-radius: 100%;
  overflow: hidden;
}

@media (min-width: 768px) {
  .landing-card.profile-avatar {
    margin: 0;
  }
}

.landing-card.profile-avatar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  border: 6px solid transparent;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-size: 200% 200%;
  background-position: center;
  background-image: var(--landing-card-conic);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff -100% 200%);
  mask-composite: subtract;
  opacity: 0;
  transition: opacity var(--vp-t-color);
  pointer-events: none;
  overflow: hidden;
}

.landing-card.profile-avatar:hover::before {
  opacity: 1;
  animation: landing-card-avatar-ani 1s ease-in-out;
}

@keyframes landing-card-avatar-ani {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.landing-card.profile-avatar img {
  border-radius: 50%;
}

.profile-name {
  flex: 1 2;
  color: var(--landing-c-text);
  font-size: 48px;
  font-family: 'Ma Shan Zheng', sans-serif;
  font-weight: 400;
  text-shadow: 1px 1px 2px var(--landing-card-bg);
  line-height: 1;
  width: fit-content;
  margin: 0 auto;
}

.landing-profile :deep(.vp-social-links) {
  width: fit-content;
  margin: 16px auto 0;
  justify-content: flex-start;
  gap: 8px;
}

@media (min-width: 768px) {
  .profile-name {
    font-size: 56px;
    margin: 0;
  }
  .landing-profile :deep(.vp-social-links) {
    margin: 16px 0 0;
  }
}

.landing-profile :deep(.vp-social-links .vp-social-link) {
  color: var(--landing-c-text);
  width: 36px;
  height: 36px;
}

.landing-profile :deep(.vp-social-links .vp-social-link [class^="vpi-social-"]) {
  width: 24px;
  height: 24px;
}
</style>
