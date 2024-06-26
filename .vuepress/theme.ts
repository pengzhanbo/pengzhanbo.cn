import { plumeTheme } from 'vuepress-theme-plume'
import notes from './notes/index.js'
import navbar from './navbar.js'

export default plumeTheme({
  logo: '/logo.png',
  hostname: 'https://pengzhanbo.cn/',
  docsRepo: 'https://github.com/pengzhanbo/pengzhanbo.cn',
  docsDir: 'src',
  contributors: false,

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
  externalLinkIcon: false as any,

  plugins: {
    baiduTongji: { key: '49ebcb8d1abfcde890ef6f320a101db7' },
    shiki: {
      twoslash: true,
      languages: ['shell', 'bash', 'json', 'txt', 'markdown', 'html', 'css', 'javascript', 'scss', 'typescript', 'vue', 'rust', 'jsx', 'tsx', 'stylus', 'dockerfile', 'yaml', 'nginx', 'toml', 'groovy'],
    },
    markdownEnhance: { demo: true },
    markdownPower: { caniuse: true, jsfiddle: true, },

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
      darkTheme: 'dark_protanopia',
      lightTheme: 'light_protanopia',
    },
  },
})
