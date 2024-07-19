import { plumeTheme } from 'vuepress-theme-plume'

export default plumeTheme({
  hostname: 'https://pengzhanbo.cn/',

  plugins: {
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
