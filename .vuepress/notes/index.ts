import { defineNotesConfig } from 'vuepress-theme-plume'
import interviewQuestion from './interview-question.js'
import typeChallenges from './type-challenges.js'
import learnRust from './learn-rust.js'
import defensiveCss from './defensive-css.js'
import memorandum from './memorandum.js'

export default defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [
    interviewQuestion,
    typeChallenges,
    learnRust,
    defensiveCss,
    memorandum,
  ],
})
