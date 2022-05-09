import { path, fs } from '@vuepress/utils'
import { defineUserConfig} from 'vuepress'
import notes from './notes'
import { themePlume } from '@vuepress-plume/vuepress-theme-plume'
import { googleAnalyticsPlugin  } from '@vuepress/plugin-google-analytics'

const robotsContent = `
# Algolia-Crawler-Verif: A1A1F2E6307A7403

User-agent: *
Allow: /
Sitemap: https://pengzhanbo.cn/sitemap.xml
`

export default defineUserConfig({
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
    ['meta', { name: 'msvalidate.01', content: 'F93FF013B8AA2553779A91388C14A0F7'}],
    ['meta', { name: 'google-site-verification', content: 'X5YSaTDn-pKqQBUKD_05_dQcxVItzEq7Rlbg2ZEU7AM' }],
  ],
  plugins: [
    googleAnalyticsPlugin({
      id: 'G-TMXNCJR2K7'
    })
  ],
  onGenerated: (app) => {
    const filepath = app.dir.dest('robots.txt')
    setTimeout(() => {
      fs.writeFileSync(filepath, robotsContent, 'utf-8')
    }, 500)
  },
  theme: themePlume({
    logo: '/g.gif',
    darkMode: true,
    hostname: "https://pengzhanbo.cn/",
    avatar: {
      name: '鹏展博',
      url: '/images/blogger.png',
      description: 'good good study, day day up !'
    },
    social: {
      email: 'volodymyr@foxmail.com',
      github: 'pengzhanbo',
      QQ: '942450674',
    },
    navbar: [
      { text: 'Theme-Plume', link: '/note/vuepress-theme-plume/' },
      {
        text: '笔记',
        children: [
          { text: '面试题解析', link: '/note/interview-question/' },
        ]
      }
    ],
    notes,
    footer: {
      copyright: 'Copyright © 2022-present pengzhanbo',
      content: '',
    },
    themePlugins: {
      baiduTongji: {
        key: '8a4e65dd3f2d30e64c828481295e09d1'    
      },
      // search: {
      //   locales: {
      //     '/': {
      //       placeholder: '搜索',
      //     },
      //   },
      // },
      // search: false,
      docsearch: {
        appId: 'KRJOJ00KBL',
        apiKey: '3f3b13613235873fbcbc9d304de18126',
        indexName: 'pengzhanbo',
        locales: {
          '/zh/': {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消',
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除',
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接',
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者',
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈',
                },
              },
            },
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
      markdownEnhance: {
        sub: true,
        sup: true,
        container: true,
        codegroup: true,
        align: true,
        mark: true,
        tasklist: true,
        demo: true,
      }
    },
  }),
})
