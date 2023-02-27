import { definePlumeNotesItemConfig } from '@vuepress-plume/vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  dir: 'vuepress-plugin',
  text: 'Vuepress Plugin',
  link: '/vuepress-plugin/',
  sidebar: [
    {
      text: 'Vuepress Plugin',
      items: [
        'caniuse/README',
        'auto-frontmatter/README',
        'blog-data/README',
        'notes-data/README',
        'iconify/README',
        {
          dir: 'netlify-functions',
          text: 'plugin-netlify-functions',
          link: '/note/vuepress-plugin/netlify-functions/',
          items: [
            '介绍',
            '使用',
            '功能',
            'API',
            'functions开发指南',
          ]
        }
      ]
    },
  ]
})
