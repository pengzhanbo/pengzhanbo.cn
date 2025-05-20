import { useDateFormat, useNow } from '@vueuse/core'
import { computed } from 'vue'

const weekList = ['日', '一', '二', '三', '四', '五', '六']

export function useDate() {
  const date = computed(() => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const week = weekList[date.getDay()]

    return {
      year,
      month,
      day,
      week,
    }
  })

  const now = useNow()
  const time = useDateFormat(now, 'HH:mm:ss')

  return { date, time }
}
