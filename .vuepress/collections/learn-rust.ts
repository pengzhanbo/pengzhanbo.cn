import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  title: 'rust学习简记',
  linkPrefix: '/learn-rust/',
  dir: 'rust学习简记',
  sidebar: [
    '',
    {
      prefix: '环境准备',
      text: '环境准备',
      collapsed: false,
      items: ['安装', '编辑器扩展', 'Cargo'],
    },
    {
      prefix: '基础入门',
      text: '基础入门',
      collapsed: false,
      items: [
        '变量',
        '类型推导',
        '基本类型',
        '数字类型',
        '字符,布尔,单元类型',
        '语句和表达式',
        '函数',
        '复合类型',
        '字符串与切片',
        '元组',
        '结构体',
        '枚举',
        '数组',
        '所有权',
        '引用与借用',
      ],
    },
  ],
})
