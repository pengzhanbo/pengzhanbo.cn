export default {
  text: 'VuePress-theme-plume',
  dir: 'vuepress-theme-plume',
  link: '/vuepress-theme-plume',
  sidebar: [
    '',
    {
      text: '指南',
      children: [
        '快速开始',
        '编写文章',
      ]
    },
    {
      text: '配置',
      children: [
        {
          text: '主题配置',
          link: '主题配置',
          children: [
            '主题插件配置',
            'notes配置',
          ]
        },
        '页面配置',
      ]
    },
    {
      text: '功能',
      children: [
        '基础功能',
        'markdown增强',
      ]
    }
  ]
}
