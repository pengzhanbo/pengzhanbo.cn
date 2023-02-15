import { definePlumeNotesItemConfig } from '@vuepress-plume/vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  text: 'VuePress-theme-plume',
  dir: 'vuepress-theme-plume',
  link: '/vuepress-theme-plume/',
  sidebar: [
    '',
    {
      text: '指南',
      items: [
        '快速开始',
        '编写文章',
      ]
    },
    {
      text: '配置',
      items: [
        {
          text: '主题配置',
          link: '/note/vuepress-theme-plume/theme-config/',
          items: [
            '主题插件配置',
            'notes配置',
          ]
        },
        '页面配置',
      ]
    },
    {
      text: '功能',
      items: [
        '基础功能',
        'markdown增强',
      ]
    }
  ]
})
