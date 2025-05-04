<script setup lang="ts">
import { useHitokoto } from '../composables/hitokoto'

const { hitokoto, updateHitokoto } = useHitokoto()
</script>

<template>
  <div
    class="landing-card landing-hitokoto"
    v-if="hitokoto"
    @click="() => updateHitokoto()"
  >
    <p>{{ hitokoto.content }}</p>
    <p class="from" v-if="hitokoto.from || hitokoto.author">
      「 {{ hitokoto.from }}
      {{ hitokoto.from && hitokoto.author ? ' | ' : '' }}
      {{ hitokoto.author }} 」
    </p>
  </div>
</template>

<style scoped>
.landing-card.landing-hitokoto {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5;
  gap: 8px;
}

@media (min-width: 960px) {
  .landing-card.landing-hitokoto {
    display: flex;
    grid-column: span 2;
  }
}

@media (min-width: 1110px) {
  .landing-card.landing-hitokoto {
    grid-column: auto;
  }
}

.landing-card.landing-hitokoto > p {
  width: 100%;
}

.landing-card.landing-hitokoto .from {
  margin-top: 8px;
  text-align: right;
}
</style>
