<script setup lang="ts">
import { useDate } from '../composables/date'
import { useWeather } from '../composables/weather'

const { city, weather } = useWeather()
const { date, time } = useDate()
</script>

<template>
  <div class="landing-card landing-today">
    <p class="today-date">
      <span>{{ date.year }}</span><span>年</span>
      <span>{{ date.month }}</span><span>月</span>
      <span>{{ date.day }}</span><span>日</span>
      <span>星期{{ date.week }}</span>
    </p>
    <p class="today-time">
      <span>{{ time }}</span>
    </p>
    <p v-if="city && weather" class="today-weather">
      <span>{{ city.name }}</span>
      <span>{{ weather.weather }}</span>
      <span>{{ weather.temperature }}°C</span>
      <span>{{ weather.winddirection }}风</span>
      <span>{{ weather.windpower }}级</span>
    </p>
  </div>
</template>

<style scoped>
.landing-card.landing-today {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5;
  gap: 8px;
}

@media (min-width: 960px) {
  .landing-card.landing-today {
    grid-column: span 3;
  }
}

@media (min-width: 1110px) {
  .landing-card.landing-today {
    grid-column: auto;
  }
}

.landing-card.landing-today > p {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  text-align: center;
}

.landing-card.landing-today .today-time {
  font-size: 48px;
  line-height: 1;
  font-family: 'Londrina Sketch', sans-serif;
  letter-spacing: 2px;
  font-weight: 500;
}
</style>
