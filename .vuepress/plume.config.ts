import { defineThemeConfig } from 'vuepress-theme-plume'
import collections from './collections/index.js'
import navbar from './navbar.js'

export default defineThemeConfig({
  logo: '/logo.png',

  navbar,
  collections,

  profile: {
    name: '鹏展博',
    avatar: '/images/blogger-fav.png',
    description: '世间的美好总是不期而遇',
  },
  social: [
    { icon: 'github', link: 'https://github.com/pengzhanbo' },
    { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 3.121V15h16V3.121l-8 8z"/><path fill="currentColor" d="M16 1H0l8 8z"/></svg>', name: 'email' }, link: 'mailto:hi@pengzhanbo.cn' },
    { icon: 'discord', link: 'https://discord.gg/ZPV9tQyRuh' },
  ],
  navbarSocialInclude: ['github', 'email', 'discord'],

  editLinkText: '在 GitHub 上编辑此页',
  footer: { copyright: 'Copyright © 2021-present pengzhanbo' },
})
