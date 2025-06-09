import { watch } from 'vue'
import { useRoute } from 'vuepress/client'

export function useStatistics() {
  if (__VUEPRESS_DEV__ || __VUEPRESS_SSR__)
    return

  const route = useRoute()

  watch(() => route.path, () => {
    let img: HTMLImageElement | null = new Image()
    const { hostname, pathname, protocol } = window.location
    img.src = `https://api.pengzhanbo.cn/statistics/collect?url=${encodeURIComponent(`${protocol}//${hostname}${pathname}`)}&t=${Date.now()}`
    img.onload = () => {
      img?.remove()
      img = null
    }
  }, { immediate: true })
}
