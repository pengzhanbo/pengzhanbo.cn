import { defineThemeConfig } from 'vuepress-theme-plume'
import navbar from './navbar.js'
import notes from './notes/index.js'

export default defineThemeConfig({
  logo: '/logo.png',

  navbar,
  notes,

  profile: {
    name: '鹏展博',
    avatar: '/images/blogger-fav.png',
    description: '世间的美好总是不期而遇',
  },
  social: [
    { icon: 'github', link: 'https://github.com/pengzhanbo' },
    { icon: 'discord', link: 'https://discord.gg/ZPV9tQyRuh' },
  ],

  editLinkText: '在 GitHub 上编辑此页',
  footer: { copyright: 'Copyright © 2021-present pengzhanbo' },
  externalLinkIcon: false,
})
