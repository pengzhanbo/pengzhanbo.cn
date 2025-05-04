<script setup lang="ts">
import { ref } from 'vue'
import LandingProfile from './LandingProfile.vue'
import LandingTagline from './LandingTagline.vue'
import LandingHitokoto from './LandingHitokoto.vue'
import LandingToday from './LandingToday.vue'
import LandingNav from './LandingNav.vue'

interface LandingNavItem {
  text: string
  link: string
  icon: string
}

withDefaults(defineProps<{
  name?: string
  avatar?: string
  tagline?: string
  hitokoto?: boolean
  today?: boolean
  nav?: (LandingNavItem)[]
}>(), {
  hitokoto: true,
  today: true
})

const active = ref(false)
</script>

<template>
  <div class="landing-wrapper">
    <div class="landing-bg" />

    <div class="landing-container" :class="{ active }">
      <div class="landing-container-inner">

        <div class="landing-left">
          <LandingProfile :name="name" :avatar="avatar" />
          <LandingTagline :tagline="tagline" />
        </div>

        <div class="landing-right">
          <div class="landing-extra" v-if="hitokoto || today">
            <LandingHitokoto v-if="hitokoto" />
            <LandingToday v-if="today" />
          </div>

          <LandingNav :nav="nav" />
        </div>
      </div>
    </div>
    <div class="landing-card landing-btn">
      <div class="landing-btn-inner" :class="{ active }" @click="active = !active">
        <span class="vpi-landing-menu" />
        <span class="vpi-landing-home" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.landing-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(https://api.pengzhanbo.cn/wallpaper/bing);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.landing-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  transition: background-color var(--vp-t-color);
}

.landing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 1;
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  padding: 0 24px var(--vp-footer-height) 24px;
  transform: translate3d(0, 0, 0);
  transition: transform var(--vp-t-color);
}

@media (max-width: 767px) {
  .landing-container {
    width: 200%;
  }

  .landing-container.active {
    transform: translate3d(-50%, 0, 0);
  }
}

.landing-container-inner {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0 48px;
}

.landing-container-inner .landing-left {
  display: flex;
  flex-direction: column;
  flex: 1 2;
}

.landing-container-inner .landing-right {
  display: flex;
  flex-direction: column;
  flex: 1 2;
}


.landing-extra {
  display: grid;
  gap: 24px;
  margin-bottom: 24px;
  grid-template-columns: 1;
}

@media (min-width: 960px) {
  .landing-extra {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1110px) {
  .landing-extra {
    grid-template-columns: repeat(2, 1fr);
  }
}

.landing-btn {
  position: fixed;
  bottom: 56px;
  left: calc(50% - 24px);
  padding: 0;
  width: 48px;
  height: 32px;
  overflow: hidden;
  z-index: 2;
}

@media (min-width: 768px) {
  .landing-btn {
    display: none;
  }
}

.landing-btn-inner {
  width: 200%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate3d(0, 0, 0);
  transition: transform var(--vp-t-color);
}

.landing-btn-inner.active {
  transform: translate3d(-50%, 0, 0);
}

.landing-btn-inner span {
  margin: 0;
  flex: 1 2;
}

.vpi-landing-menu {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376v103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3l123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4zm52.1 25.5L409.7 90.6L190.1 336l1.2 1zm335.1 139.7l-166.6-69.5l214.1-239.3z'/%3E%3C/svg%3E");
}

.vpi-landing-home {
 --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='m21.1 6.551l.03.024c.537.413.87 1.053.87 1.757v11.256A3.4 3.4 0 0 1 18.6 23H5.4A3.4 3.4 0 0 1 2 19.588V8.332c0-.704.333-1.344.87-1.757l.029-.023l7.79-5.132a2.195 2.195 0 0 1 2.581 0zM10 13v8H8v-8.2c0-.992.808-1.8 1.8-1.8h4.4c.992 0 1.8.808 1.8 1.8V21h-2v-8z' clip-rule='evenodd'/%3E%3C/svg%3E");
}
</style>
