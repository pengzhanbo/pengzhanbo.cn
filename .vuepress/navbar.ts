import { NavItem } from "@vuepress-plume/vuepress-theme-plume";

export default [
  { text: '首页', link: '/', icon: 'material-symbols:home' },
  { text: '博客', link: '/blog/', activeMatch: '/(blog|article)/', icon: 'material-symbols:menu-book' },
  { text: 'Projects', link: '/projects/', icon: 'mdi:open-source-initiative' },
  {
    text: 'vuepress',
    icon: 'la:vuejs',
    items: [
      {
        text: 'Theme',
        items: [
          { text: 'vuepress-theme-plume', link: '/note/vuepress-theme-plume/' }
        ]
        },
      { 
        text: 'Plugin', 
        items: [
          { text: 'caniuse', link: '/note/vuepress-plugin/caniuse/', activeMatch: '/note/vuepress-plugin/caniuse/' },
          { text: 'netlify-functions', link: '/note/vuepress-plugin/netlify-functions/', activeMatch: '/note/vuepress-plugin/netlify-functions/' },
        ], 
      }
    ]
  },
  {
    text: '笔记',
    icon: 'icon-park-outline:bookshelf',
    items: [
      { text: 'type-challenges', link: '/note/type-challenges/', activeMatch: '/note/type-challenges/' },
      { text: '面试题解析', link: '/note/interview-question/', activeMatch: '/note/interview-question/' },
    ]
  }
] as NavItem[]
