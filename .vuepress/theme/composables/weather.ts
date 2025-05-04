import { onMounted, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

declare const __VUEPRESS_GAODE_MAP_KEY__: string

const MAP_KEY = __VUEPRESS_GAODE_MAP_KEY__
const API = `https://restapi.amap.com/v3/`

interface City {
  adcode: string
  name: string
}

interface CityWeather {
  weather?: string // 天气现象
  temperature?: string // 实时气温
  winddirection?: string // 风向描述
  windpower?: string // 风力级别
}

// 获取高德地理位置信息
const getCity = async () =>
  await fetch(`${API}ip?key=${MAP_KEY}`).then((res) => res.json())

// 获取高德地理天气信息
const getWeather = async (cityCode: string) =>
  await fetch(
    `${API}weather/weatherInfo?key=${MAP_KEY}&city=${cityCode}`,
  ).then((res) => res.json())

export function useWeather() {
  const city = ref<City | null>(null)
  const weather = ref<CityWeather | null>(null)
  const loaded = ref(true)

  const cache = useLocalStorage<{ city?: City; weather?: CityWeather, updatedAt?: number }>('__VUEPRESS_HOME_LANDING_WEATHER__', {})

  async function fetchWeather() {
    const current = Date.now()
    if (cache.value.updatedAt && current - cache.value.updatedAt < 60 * 60 * 1000 && cache.value.city && cache.value.weather) {
      city.value = cache.value.city
      weather.value = cache.value.weather
      return
    }
    loaded.value = false
    try {
      if (!city.value) {
        const res = await getCity()
        if (res.infocode !== '10000')
          throw new Error('获取城市信息失败')
        city.value ={ name: res.city, adcode: res.adcode }
      }
      const data = await getWeather(city.value.adcode)
      weather.value = {
        weather: data.lives[0].weather,
        temperature: data.lives[0].temperature,
        winddirection: data.lives[0].winddirection,
        windpower: data.lives[0].windpower,
      }

      cache.value = { city: city.value, weather: weather.value, updatedAt: current }
    } catch (e) {
      console.error('查询天气失败', e)
    }
    loaded.value = true
  }

  onMounted(() => fetchWeather())

  return { city, weather, loaded, fetchWeather }
}
