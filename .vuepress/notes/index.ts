import { definePlumeNotesConfig } from 'vuepress-theme-plume'
import vuepressThemePlume from './vuepress-theme-plume'
import interviewQuestion from './interview-question'
import vuepressPlugin from './vuepress-plugin'
import typeChallenges from './type-challenges'
import learnRust from './learn-rust'

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
