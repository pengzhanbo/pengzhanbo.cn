import type { Theme } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default plumeTheme({
  hostname: 'https://pengzhanbo.cn/',
  docsRepo: 'https://github.com/pengzhanbo/pengzhanbo.cn',
  docsDir: 'src',

  codeHighlighter: {
    twoslash: true,
    lineNumbers: 10,
  },

  markdown: {
    mermaid: true,
    caniuse: true,
    jsfiddle: true,
    demo: true,
    npmTo: true,
    audioReader: true,
    chat: true,
  },

  search: {
    provider: 'algolia',
    appId: 'KRJOJ00KBL',
    apiKey: '9217486bf6a0a9048a44b826a1549b0c',
    indices: ['pengzhanbo'],
    askAi: {
      indexName: 'pengzhanbo-markdown',
      assistantId: 'LkVhmvMjn8rl',
    },
  } as any,

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

  llmstxt: {
    llmsTxtTemplateGetter: {
      details: '',
      description: '鹏展博的个人博客，知识库',
    },
  },
}) as Theme
