import { defineUserConfig } from 'vuepress'
import type {PlumeThemeOptions } from '@vuepress-plume/vuepress-theme-plume'
import { path } from '@vuepress/utils'
import notes from './notes'

export default defineUserConfig<PlumeThemeOptions>({
  lang: 'zh-CN',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '鹏展博',
      description: '热爱生活',
    },
  },
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
    navbar: [{ text: 'Theme-Plume', link: '/note/vuepress-theme-plume' }],
    notes: {
      dir: 'notes',
      link: '/note',
      notes,
    },
    footer: {
      copyright: 'Copyright © 2022-present pengzhanbo',
      content: '',
    },
    themePlugins: {
      search: {
        locales: {
          '/': {
            placeholder: '搜索',
          },
        },
      },
      comment: {
        type: 'giscus',
        comment: true,
        repo: 'pengzhanbo/pengzhanbo-blog-vuepress',
        repoId: 'MDEwOlJlcG9zaXRvcnkxNDgwMzY4MDc=',
        category: 'Announcements',
        categoryId: 'DIC_kwDOCNLcx84COcVd',
        mapping: 'pathname',
        reactionsEnabled: true,
        inputPosition: 'top',
      },
    },
  },
})
/**
<script src="https://giscus.app/client.js"
        data-repo="pengzhanbo/pengzhanbo-blog-vuepress"
        data-repo-id="MDEwOlJlcG9zaXRvcnkxNDgwMzY4MDc="
        data-category="Announcements"
        data-category-id="DIC_kwDOCNLcx84COcVd"
        data-mapping="pathname"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>
 */
