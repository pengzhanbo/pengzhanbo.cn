import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { path } from '@vuepress/utils'

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh',
    title: '鹏展博',
    description: '热爱生活',
    dest: 'docs',
    temp: '.vuepress/.temp',
    cache: '.vuepress/.cache',
    public: path.resolve(__dirname, '../public'),
    theme: '@pengzhanbo/vuepress-theme-plume',
    themeConfig: {
        bannerImg: '/images/big-banner.jpg', // 1200x300
        avatarUrl: '/images/blogger.jpg',
        avatar: '鹏展博',
        github: 'https://github.com/pengzhanbo',
        email: 'volodymyr@foxmail.com',
        description: '学习，生活，娱乐，我全都要',
    }
})
