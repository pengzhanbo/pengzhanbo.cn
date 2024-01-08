import { plumeTheme } from 'vuepress-theme-plume'
import notes from './notes'
import navbar from './navbar'

export default plumeTheme({
  logo: '/images/blogger-fav.png',
  hostname: 'https://pengzhanbo.cn/',
  repo: 'https://github.com/pengzhanbo/pengzhanbo.cn',
  docsDir: 'src',
  contributors: false,

  navbar,
  notes,

  avatar: {
    name: '鹏展博',
    url: '/images/blogger-fav.png',
    description: '世间的美好总是不期而遇',
  },
  social: [
    { icon: 'github', link: 'https://github.com/pengzhanbo' },
    { icon: 'discord', link: 'https://discord.gg/ZPV9tQyRuh' },
  ],

  editLinkText: '在 GitHub 上编辑此页',
  footer: { copyright: 'Copyright © 2022-present pengzhanbo' },

  plugins: {
    externalLinkIcon: false,
    baiduTongji: { key: '49ebcb8d1abfcde890ef6f320a101db7' },

    docsearch: {
      appId: 'KRJOJ00KBL',
      apiKey: '3f3b13613235873fbcbc9d304de18126',
      indexName: 'pengzhanbo',
    },

    comment: {
      provider: 'Giscus',
      comment: true,
      repo: 'pengzhanbo/pengzhanbo.cn',
      repoId: 'MDEwOlJlcG9zaXRvcnkxNDgwMzY4MDc=',
      category: 'Blog-Comment',
      categoryId: 'DIC_kwDOCNLcx84CUulO',
      mapping: 'pathname',
      reactionsEnabled: true,
      inputPosition: 'top',
      darkTheme: 'dark_protanopia' as any,
      lightTheme: 'light_protanopia' as any,
    },
  },
})
