import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  link: '/type-challenges/',
  dir: 'type-challenges',
  sidebar: [
    '',
    {
      dir: '热身',
      text: '热身(1)',
      collapsed: false,
      items: 'auto',
    },
    {
      dir: '简单',
      text: '简单(13)',
      collapsed: false,
      items: 'auto',
    },
    {
      dir: '中等',
      text: '中等(75)',
      collapsed: false,
      items: 'auto',
    },
    {
      dir: '困难',
      text: '困难(43)',
      collapsed: true,
      items: 'auto',
    },
    {
      dir: '地狱',
      text: '地狱(14)',
      collapsed: true,
      items: 'auto',
    },
  ],
})
