/**
 * 每日一言
 *
 * https://developer.hitokoto.cn/
 */

import { onMounted, onUnmounted, ref } from 'vue'
import { useThrottleFn, useSessionStorage } from '@vueuse/core'

interface HitokotoData {
  content: string
  author: string
  from: string
}


const API = 'https://v1.hitokoto.cn/'

export function useHitokoto() {
  const hitokoto = ref<HitokotoData | null>(null)
  const loaded = ref(true)
  const cache = useSessionStorage<{ data?: HitokotoData, updatedAt?: number }>('__VUEPRESS_LANDING_HITOKOTO__', {})

  async function fetchHitokoto({
    min_length,
    max_length,
    c
  }: HitokotoParams = {}) {
    if (cache.value.updatedAt && Date.now() - cache.value.updatedAt < 6000 && cache.value.data) {
      hitokoto.value = cache.value.data
      return
    }

    if (!loaded.value)
      return

    const url = new URL(API)
    min_length && url.searchParams.append('min_length', String(min_length))
    max_length && url.searchParams.append('max_length', String(max_length))

    const type = c || ['i', 'k']
    const list = Array.from(new Set(Array.isArray(type) ? type : [type]))
    list.forEach(c => url.searchParams.append('c', c))
    

    try {
      loaded.value = false
      const res = (await fetch(url).then((res) => res.json())) as HitokotoResponse

      loaded.value = true
      hitokoto.value = {
        content: res.hitokoto,
        author: res.from_who,
        from: res.from
      }

      cache.value = { data: hitokoto.value, updatedAt: Date.now() }

    } catch {}
  }

  /**
   * 更新数据，节流，限制请求频率
   */
  const updateHitokoto = useThrottleFn(fetchHitokoto, 6000, true)

  let interval: ReturnType<typeof setInterval> | null = null
  onMounted(() => {
    updateHitokoto()
    interval = setInterval(updateHitokoto, 15000)
  })

  onUnmounted(() => {
    interval && clearInterval(interval)
  })

  return {
    hitokoto,
    loaded,
    updateHitokoto,
  }
}

type HitokotoType = 
  | 'a' // 动画
  | 'b' // 漫画
  | 'c' // 游戏
  | 'd' // 文字
  | 'e' // 原创
  | 'f' // 网络
  | 'g' // 其它
  | 'h' // 影视
  | 'i' // 诗词
  | 'j' // 网易云
  | 'k' // 哲学
  | 'l' // 抖机灵


interface HitokotoParams {
  /**
   * 句子类型
   */
  c?: HitokotoType | HitokotoType[]
  /**
   * 最小句子长度
   */
  min_length?: number
  /**
   * 最大句子长度
   */
  max_length?: number
}

interface HitokotoResponse {
  uuid: string

  id: string
  /**
   * 一言正文
   */
  hitokoto: string
  /**
   * 一言的类型
   */
  type: HitokotoType
  /**
   * 一言的出处
   */
  from: string
  /**
   * 一言的作者
   */
  from_who: string
  /**
   * 一言的长度
   */
  length	: string
}
