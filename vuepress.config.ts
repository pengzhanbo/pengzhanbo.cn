import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { llmsPlugin } from '@vuepress/plugin-llms'
import dotenv from 'dotenv'
import isCI from 'is-ci'
import { globSync } from 'tinyglobby'
import { defineUserConfig } from 'vuepress'
import { fs, getDirname, path } from 'vuepress/utils'
import { tocGetter } from './.vuepress/llmstxtTOC.js'
import theme from './.vuepress/theme.js'

const __dirname = getDirname(import.meta.url)
const resolve = (...dirs: string[]) => path.resolve(__dirname, ...dirs)

const isProd = process.env.NODE_ENV === 'production'

if (!isCI) {
  dotenv.config({ path: '.env.local' })
}

export default defineUserConfig({
  lang: 'zh-CN',
  locales: {
    '/': { lang: 'zh-CN', title: '鹏展博', description: '热爱生活' },
  },
  dest: 'docs',
  public: resolve('public'),
  temp: resolve('.vuepress/.temp'),
  cache: resolve('.vuepress/.cache'),
  shouldPrefetch: false,
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
    isProd ? googleAnalyticsPlugin({ id: 'G-TMXNCJR2K7' }) : [],
    isProd ? baiduAnalyticsPlugin({ id: '49ebcb8d1abfcde890ef6f320a101db7' }) : [],
    llmsPlugin({
      llmsTxtTemplateGetter: {
        toc: tocGetter,
        details: '',
        description: '鹏展博的个人博客，知识库',
      },
    }),
  ],

  alias: {
    '~theme': resolve('./.vuepress/theme'),
  },

  define: {
    __VUEPRESS_GAODE_MAP_KEY__: process.env.VUEPRESS_GAODE_MAP_KEY,
    // debug hydration mismatch
    // __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
  },

  bundler: viteBundler(),

  theme,

  onGenerated: async (app) => {
    const names = ['Ma-Shan-Zheng', 'Londrina-Sketch']
    const dest = app.dir.dest('assets')
    const indexPath = app.dir.dest('index.html')
    const assets = globSync('*.ttf', { cwd: dest }) || []
    const fonts = assets.filter(asset => names.some(name => asset.includes(name)))
    let links = ''
    fonts.forEach((font) => {
      links += `<link rel="preload" href="/assets/${font}" as="font" type="font/ttf" crossorigin="anonymous">`
    })
    const content = fs.readFileSync(indexPath, 'utf-8')
    fs.writeFileSync(indexPath, content.replace('<head>', `<head>${links}`))
  },
})
