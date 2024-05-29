import { getDirname, path } from 'vuepress/utils'
import { defineUserConfig } from 'vuepress'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import theme from './.vuepress/theme.js'
import { viteBundler } from '@vuepress/bundler-vite'

const __dirname = getDirname(import.meta.url)
const resolve = (...dirs: string[]) => path.resolve(__dirname, ...dirs)

export default defineUserConfig({
  lang: 'zh-CN',
  locales: {
    '/': { lang: 'zh-CN', title: '鹏展博', description: '热爱生活' },
  },
  dest: 'docs',
  public: resolve('public'),
  temp: resolve('.vuepress/.temp'),
  cache: resolve('.vuepress/.cache'),
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }],
    ['meta', { name: 'keywords', content: '鹏展博,前端,pengzhanbo,front-end' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edg' }],
    ['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'msvalidate.01', content: 'F93FF013B8AA2553779A91388C14A0F7' }],
    ['meta', { name: 'google-site-verification', content: 'X5YSaTDn-pKqQBUKD_05_dQcxVItzEq7Rlbg2ZEU7AM' }],
  ],
  plugins: [
    googleAnalyticsPlugin({ id: 'G-TMXNCJR2K7' }),
  ],

  bundler: viteBundler(),

  theme,
})
