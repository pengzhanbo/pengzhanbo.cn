import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { path } from '@vuepress/utils'
import { resolveCanIuseOption } from './utils/resolveCanIUse'

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh',
    title: '鹏展博',
    description: '热爱生活',
    dest: 'docs',
    temp: '.vuepress/.temp',
    cache: '.vuepress/.cache',
    public: path.resolve(__dirname, '../public'),
    head: [
        ['link', { rel: 'icon', href: '/g.gif' }],
        ['meta', { 'name': 'keywords', content: '鹏展博,前端，健身' }],
        ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'id=edg' }],
        ['script', { src: 'https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/public/caniuse-embed.min.js', defer: 'defer' }]
    ],
    theme: '@pengzhanbo/vuepress-theme-plume',
    themeConfig: {
        bannerImg: '/images/big-banner.jpg', // 1200x300
        avatarUrl: '/images/blogger.jpg',
        avatar: '鹏展博',
        github: 'https://github.com/pengzhanbo',
        email: 'volodymyr@foxmail.com',
        description: '学习，生活，娱乐，我全都要',
    },
    plugins: [
      [
        '@vuepress/container',
        resolveCanIuseOption('caniuse')
      ]
    ]
})
