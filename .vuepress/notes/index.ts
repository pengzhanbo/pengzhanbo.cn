import { definePlumeNotesConfig } from 'vuepress-theme-plume'
import vuepressThemePlume from './vuepress-theme-plume'
import interviewQuestion from './interview-question.js'
import vuepressPlugin from './vuepress-plugin.js'
import typeChallenges from './type-challenges.js'
import learnRust from './learn-rust.js'

export default definePlumeNotesConfig({
  dir: 'notes',
  link: '/note',
  notes: [
    vuepressThemePlume,
    interviewQuestion,
    vuepressPlugin,
    typeChallenges,
    learnRust,
  ],
})
