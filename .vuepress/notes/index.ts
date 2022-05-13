import { definePlumeNotesConfig } from '@vuepress-plume/vuepress-theme-plume'
import vuepressThemePlume from './vuepress-theme-plume'
import interviewQuestion from './interview-question'
import vuepressPlugin from './vuepress-plugin'

export default definePlumeNotesConfig({
  dir: 'notes',
  link: '/note',
  notes: [
    vuepressThemePlume,
    interviewQuestion,
    vuepressPlugin,
  ]
})
