<script setup lang="ts">
import { computed } from 'vue'
import { gitmojis } from 'gitmojis'
import {  useClipboard } from '@vueuse/core'

const list = computed(() => gitmojis.map((item) => ({
  name: item.name,
  desc: item.description,
  code: item.code,
  emoji: item.emoji,
})))

const { copy, copied } = useClipboard()
</script>

<template>
  <div class="gitmoji-wrapper">
    <div class="gitmoji-item" v-for="item in list" :key="item.code">
      <div class="emoji">
        <span>{{ item.emoji }}</span>
      </div>
      <div class="info">
        <p>{{  item.code }}</p>
        <p>{{ item.desc }}</p>
      </div>
      <button
        type="button"
        class="gitmoji-copy"
        :class="{ copied }"
        :aria-label="copied ? 'Copied' : 'Copy'"
        :title="copied ? 'Copied' : 'Copy'"
        @click="copy(item.code)"
      >
        <span class="vpi-gitmoji-copy"></span>
        <span class="visually-hidden">Copy</span>
      </button>
    </div>
  </div>
</template>

<style>
.gitmoji-item {
  position: relative;
  flex: 1 2;
  display: flex;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 0 0 0 transparent;
  transition: box-shadow var(--vp-t-color);
  margin-bottom: 16px;
  overflow: hidden;
}

.gitmoji-item:hover {
  box-shadow: var(--vp-shadow-2);
}

@media (min-width: 768px) {
  .gitmoji-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .gitmoji-item {
    margin-bottom: 0;
  }
}

.gitmoji-item .emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  width: 64px;
}

.gitmoji-item .info {
  padding: 16px 16px 16px 0;
}

.gitmoji-item .info p {
  margin: 0;
}

.gitmoji-item .info p:first-child {
  font-weight: bold;
  font-size: 18px;
}

.gitmoji-item .info p:last-child {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 22px;
}

.gitmoji-item .gitmoji-copy {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  color: var(--vp-c-text-2);
  padding: 8px;
  cursor: pointer;
  line-height: 1;
  opacity: 0;
  border-bottom-left-radius: 8px;
  transition: opacity var(--vp-t-color), color var(--vp-t-color), background-color var(--vp-t-color);
}

.gitmoji-item:hover .gitmoji-copy {
  opacity: 1;
}

.gitmoji-item .gitmoji-copy:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}

.vpi-gitmoji-copy {
  width: 1.25em;
  height: 1.25em;
  --icon: var(--code-copy-icon);
}

.gitmoji-item .gitmoji-copy.copied .vpi-gitmoji-copy {
  --icon: var(--code-copied-icon);
}
</style>
