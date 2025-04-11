import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: '备忘录',
  link: '/memorandum/',
  sidebar: [
    '',
    'ssh',
    'grep',
    'git',
    'pm2',
    'nginx',
    'cargo',
    'gitmoji',
  ]
})
