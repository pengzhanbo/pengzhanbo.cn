import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'vuepress-theme-plume',
  link: '/vuepress-theme-plume/',
  sidebar: [
    '',
    {
      text: '指南',
      items: ['快速开始', '编写文章', '效果预览'],
    },
    {
      text: '配置',
      items: [
        '主题配置',
        '多语言配置',
        '主题插件配置',
        '导航栏配置',
        'notes配置',
        '页面配置',
        '内容搜索',
        '文章评论',
        '加密',
        '自定义样式',
        '扩展页面',
      ],
    },
    {
      text: '功能',
      items: ['基础功能', '内置插件', '全局组件', '代码块高亮', 'markdown增强', '实验性功能'],
    },
  ],
})
