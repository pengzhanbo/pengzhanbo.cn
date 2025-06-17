import { defineNotesConfig } from 'vuepress-theme-plume'
import defensiveCss from './defensive-css.js'
import interviewQuestion from './interview-question.js'
import learnRust from './learn-rust.js'
import memorandum from './memorandum.js'
import typeChallenges from './type-challenges.js'
import webpack from './webpack.js'

export default defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [
    interviewQuestion,
    typeChallenges,
    learnRust,
    defensiveCss,
    memorandum,
    webpack,
    { dir: '设计模式', link: '/design-pattern/', sidebar: 'auto' },
    { dir: '算法', link: '/algorithm/', sidebar: 'auto' },
  ],
})
