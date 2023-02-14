import { definePlumeNotesItemConfig } from '@vuepress-plume/vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  dir: 'vuepress-plugin',
  text: '',
  link: '/vuepress-plugin/',
  sidebar: [
    'caniuse/README',
    {
      dir: 'netlify-functions',
      text: 'plugin-netlify-functions',
      items: [
        '',
        '介绍',
        '使用',
        '功能',
        'API',
        'functions开发指南',
      ]
    }
  ]
})
