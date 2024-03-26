import { definePlumeNotesConfig } from 'vuepress-theme-plume'
// import vuepressThemePlume from './vuepress-theme-plume'
import interviewQuestion from './interview-question.js'
// import vuepressPlugin from './vuepress-plugin.js'
import typeChallenges from './type-challenges.js'
import learnRust from './learn-rust.js'
import defensiveCss from './defensive-css.js'

export default definePlumeNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [
    // vuepressThemePlume,
    interviewQuestion,
    // vuepressPlugin,
    typeChallenges,
    learnRust,
    defensiveCss,
  ],
})
