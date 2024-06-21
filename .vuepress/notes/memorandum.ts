import { definePlumeNotesItemConfig } from 'vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  dir: '备忘录',
  link: '/memorandum/',
  sidebar: [
    '',
    'ssh',
    'grep',
    'git',
    'pm2',
    'cargo',
  ]
})
