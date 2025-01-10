import { plumeTheme } from 'vuepress-theme-plume'

export default plumeTheme({
  hostname: 'https://pengzhanbo.cn/',
  docsRepo: 'https://github.com/pengzhanbo/pengzhanbo.cn',
  docsDir: 'src',

  plugins: {
    shiki: {
      twoslash: true,
      lineNumbers: 10,
      languages: ['sh','css','html','jsx','javascript','js','ts','stylus','json','yaml','tsx','dockerfile','bash','groovy','yml','md','nginx','toml','rust','vue'],
    },
    markdownEnhance: { demo: false, mermaid: true },
    markdownPower: { caniuse: true, jsfiddle: true, demo: true },

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
