import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  title: '备忘录',
  dir: '备忘录',
  linkPrefix: '/memorandum/',
  sidebar: [
    '',
    'ssh',
    'grep',
    'git',
    'pm2',
    'nginx',
    'cargo',
    'gitmoji',
  ],
})
