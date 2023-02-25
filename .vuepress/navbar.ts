import { NavItem } from "@vuepress-plume/vuepress-theme-plume";

export default [
  { text: '首页', link: '/', icon: 'material-symbols:home' },
  { text: '博客', link: '/blog/', activeMatch: '/(blog|article)/', icon: 'material-symbols:menu-book' },
  { text: 'Projects', link: '/projects/', icon: 'ri:open-source-fill' },
  {
    text: '技术文档',
    icon: 'mdi:idea',
    items: [
      {
        text: 'Vite Plugin',
        icon: 'vscode-icons:file-type-vite',
        items: [
          { text: 'vite-plugin-mock-dev-server', link: 'https://vite-plugin-mock-dev-server.netlify.app/', icon: 'carbon:server-proxy' }
        ]
      },
      {
        text: 'Vuepress Theme',
        icon: 'icon-park-solid:theme',
        items: [
          { text: 'vuepress-theme-plume', link: '/note/vuepress-theme-plume/', icon: 'mdi:paper-airplane' }
        ]
        },
      { 
        text: 'Vuepress Plugin', 
        icon: 'mingcute:plugin-2-fill',
        items: [
          { text: 'caniuse', link: '/note/vuepress-plugin/caniuse/', activeMatch: '/note/vuepress-plugin/caniuse/', icon: 'pajamas:feature-flag' },
          { text: 'netlify-functions', link: '/note/vuepress-plugin/netlify-functions/', activeMatch: '/note/vuepress-plugin/netlify-functions/', icon: 'teenyicons:netlify-solid' },
        ], 
      }
    ]
  },
  {
    text: '笔记',
    icon: 'icon-park-solid:bookshelf',
    items: [
      { text: '书籍推荐', link: '/ebooks/', icon: 'material-symbols:recommend', activeMatch: '/ebooks/' },
      { text: '面试题解析', link: '/note/interview-question/', activeMatch: '/note/interview-question/', icon: 'codicon:comment-unresolved' },
      { text: 'type-challenges', link: '/note/type-challenges/', activeMatch: '/note/type-challenges/', icon: 'mdi:language-typescript' },
    ]
  }
] as NavItem[]
