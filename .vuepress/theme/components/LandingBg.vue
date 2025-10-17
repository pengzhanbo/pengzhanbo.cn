<script setup lang="ts">
import { useSessionStorage } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'

const list = ref<string[]>([])
const cache = useSessionStorage<string[]>('__VUEPRESS_HOME_BACKGROUND_LIST', [])
const active = ref(0)
const asyncActive = ref(0)

async function fetchBingList() {
  if (cache.value.length) {
    list.value = cache.value
    return
  }
  const res = await fetch('https://api.pengzhanbo.cn/wallpaper/bing/short')
    .then(res => res.json()) as string[]

  if (res?.length) {
    list.value = res
    cache.value = res
  }
  else {
    list.value = ['https://api.pengzhanbo.cn/wallpaper/bing']
  }
}
let interval: ReturnType<typeof setInterval> | null = null
onMounted(async () => {
  await fetchBingList()
  if (list.value.length > 1) {
    interval = setInterval(() => {
      active.value = (active.value + 1) % list.value.length
      setTimeout(() => {
        asyncActive.value = active.value
      }, 1000)
    }, 10000)
  }
})

onUnmounted(() => {
  interval && clearInterval(interval)
})
</script>

<template>
  <div class="landing-bg">
    <div
      v-for="(item, index) in list"
      :key="item"
      class="landing-bg-inner"
      :class="{ active: active === index, animation: active === index || asyncActive === index }"
      :style="{ backgroundImage: `url(${item})`, zIndex: list.length - index }"
    />
  </div>
</template>

<style scoped>
.landing-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; background-blend-mode: multiply,multiply;
}

.landing-bg-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.landing-bg-inner.active {
  opacity: 1;
}

.landing-bg-inner.animation {
  transform: scale(1);
  animation: landing-bg-ani 12s ease-in-out;
}

@keyframes landing-bg-ani {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
}
</style>
