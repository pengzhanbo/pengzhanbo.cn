import { defineCollections } from 'vuepress-theme-plume'
import defensiveCss from './defensive-css.js'
import frontendOpenSources from './fe-oss.js'
import interviewQuestion from './interview-question.js'
import learnRust from './learn-rust.js'
import memorandum from './memorandum.js'
import typeChallenges from './type-challenges.js'
import webpack from './webpack.js'

export default defineCollections([
  { type: 'post', title: '博客', dir: 'blog', linkPrefix: '/article/' },
  interviewQuestion,
  typeChallenges,
  learnRust,
  defensiveCss,
  memorandum,
  webpack,
  frontendOpenSources,
  { type: 'doc', dir: '设计模式', title: '设计模式', linkPrefix: '/design-pattern/', sidebar: 'auto' },
  { type: 'doc', dir: '算法', title: '算法', linkPrefix: '/algorithm/', sidebar: 'auto' },
])
