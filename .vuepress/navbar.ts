import  { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home' },
  {
    text: '博客',
    link: '/blog/',
    activeMatch: '^/(blog|article)/',
    icon: 'material-symbols:menu-book',
  },
  { text: 'Projects', link: '/projects/', icon: 'ri:open-source-fill' },
  {
    text: '技术文档',
    icon: 'mdi:idea',
    activeMatch: '^/(vuepress-theme-plume|vuepress-plugin)/',
    items: [
      {
        text: 'Vite',
        icon: 'vscode-icons:file-type-vite',
        items: [
          {
            text: 'vite-plugin-mock-dev-server',
            link: 'https://vite-plugin-mock-dev-server.netlify.app/',
            icon: 'carbon:server-proxy',
          },
          {
            text: 'vite-plugin-image-placeholder',
            link: 'https://github.com/pengzhanbo/vite-plugin-image-placeholder',
            icon: 'bi:image-fill',
          }
        ],
      },
      {
        text: 'Vuepress',
        icon: 'vscode-icons:file-type-vue',
        items: [
          {
            text: 'vuepress-theme-plume',
            link: '/vuepress-theme-plume/',
            icon: 'mdi:paper-airplane',
            activeMatch: '^/vuepress-theme-plume/',
          },
          {
            text: 'plugin-caniuse',
            link: '/vuepress-plugin/caniuse/',
            activeMatch: '/vuepress-plugin/caniuse/',
            icon: 'pajamas:feature-flag',
          },
          {
            text: 'plugin-auto-frontmatter',
            link: '/vuepress-plugin/auto-frontmatter/',
            activeMatch: '/vuepress-plugin/auto-frontmatter/',
            icon: 'material-symbols:move-selection-down-rounded',
          },
          {
            text: 'plugin-blog-data',
            link: '/vuepress-plugin/blog-data/',
            activeMatch: '/vuepress-plugin/blog-data/',
            icon: 'ic:baseline-post-add',
          },
          {
            text: 'plugin-notes-data',
            link: '/vuepress-plugin/notes-data/',
            activeMatch: '/vuepress-plugin/notes-data/',
            icon: 'material-symbols:note-alt-rounded',
          },
          {
            text: 'plugin-shikiji',
            link: '/vuepress-plugin/shikiji/',
            activeMatch: '/vuepress-plugin/shikiji/',
            icon: 'material-symbols-light:code-blocks-outline-rounded',
          },
          {
            text: 'plugin-iconify',
            link: '/vuepress-plugin/iconify/',
            activeMatch: '/vuepress-plugin/iconify/',
            icon: 'line-md:iconify1',
          },
          {
            text: 'plugin-netlify-functions',
            link: '/vuepress-plugin/netlify-functions/',
            activeMatch: '/vuepress-plugin/netlify-functions/',
            icon: 'teenyicons:netlify-solid',
          },
        ],
      },
    ],
  },
  {
    text: '笔记',
    icon: 'icon-park-solid:bookshelf',
    items: [
      {
        text: '前端面试题',
        link: '/interview-question/',
        activeMatch: '^/note/interview-question/',
        icon: 'codicon:comment-unresolved',
      },
      {
        text: 'type-challenges',
        link: '/type-challenges/',
        activeMatch: '^/note/type-challenges/',
        icon: 'mdi:language-typescript',
      },
      {
        text: 'Rust学习简记',
        link: '/learn-rust/',
        activeMatch: '^/note/learn-rust/',
        icon: 'mdi:language-rust',
      },
    ],
  },
  {
    text: '更多',
    icon: 'mingcute:more-3-fill',
    items: [
      {
        text: '书籍推荐',
        link: '/ebooks/',
        icon: 'material-symbols:recommend',
        activeMatch: '^/ebooks/',
      },
      {
        text: '站点导航',
        link: '/sites-collect/',
        icon: 'mdi:roadmap',
        activeMatch: '^/sites-collect',
      },
      {
        text: 'Command-Line Interface',
        link: '/cli/',
        icon: 'grommet-icons:cli',
        activeMatch: '^/cli',
      },
      // {
      //   text: 'You-Need-Know-Vite',
      //   link: 'https://you-need-know-vite.netlify.app/',
      //   icon: 'vscode-icons:file-type-vite',
      // },
      // {
      //   text: '中国古典文学',
      //   link: 'https://poetry.pengzhanbo.cn',
      //   icon: 'icon-park-outline:chinese',
      // },
    ],
  }
])
