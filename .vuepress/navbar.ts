import { NavItem } from "@vuepress-plume/vuepress-theme-plume";

export default [
  { text: '博客', link: '/blog/' },
  {
    text: 'VuePress',
    items: [
      { text: 'theme-plume', link: '/note/vuepress-theme-plume/', activeMatch: '/note/vuepress-theme-plume/' },
      { 
        text: 'Plugin', 
        items: [
          { text: 'caniuse', link: '/note/vuepress-plugin/caniuse/', activeMatch: '/note/vuepress-plugin/caniuse/' },
          { text: 'netlify-functions', link: '/note/vuepress-plugin/netlify-functions/', activeMatch: '/note/vuepress-plugin/netlify-functions/' },
        ], 
      }
    ]
  },
  { text: '面试题解析', link: '/note/interview-question/', activeMatch: '/note/interview-question/' },
  {
    text: '笔记',
    items: [
      { text: 'type-challenges', link: '/note/type-challenges/', activeMatch: '/note/type-challenges/' },
    ]
  }
] as NavItem[]
