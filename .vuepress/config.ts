import { defineUserConfig } from 'vuepress'
import type {PlumeThemeOptions } from '@vuepress-plume/vuepress-theme-plume'
import { path } from '@vuepress/utils'

export default defineUserConfig<PlumeThemeOptions>({
  lang: 'zh',
  title: '鹏展博',
  description: '热爱生活',
  dest: 'docs',
  public: path.resolve(__dirname, '../public'),
  temp: path.resolve(__dirname, '.temp'),
  cache: path.resolve(__dirname, '.cache'),
  head: [
    ['link', { rel: 'icon', href: '/g.gif' }],
    ['meta', { 'name': 'keywords', content: '鹏展博,前端，健身' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'id=edg' }],
  ],
  theme: '@vuepress-plume/vuepress-theme-plume',
  themeConfig: {
    logo: '/g.gif',
    darkMode: true,
    avatar: {
      name: '鹏展博',
      url: '/images/blogger.jpg',
      description: 'good good study, day day up !'
    },
    social: {
      email: 'volodymyr@foxmail.com',
      github: 'pengzhanbo',
      QQ: '942450674',
    },
    navbar: [],
    footer: {
      copyright: 'Copyright © 2022-present pengzhanbo',
      content: '',
    },
    themePlugins: {
      caniuse: { mode: 'embed' },
      search: {
        locales: {
          '/': {
            placeholder: '搜索',
          },
        },
      },
    },
  },
})
