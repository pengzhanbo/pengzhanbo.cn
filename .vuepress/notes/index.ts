// import { definePlumeNotesConfig } from '@vuepress-plume/vuepress-theme-plume'
import vuepressThemePlume from './vuepress-theme-plume'
import interviewQuestion from './interview-question'
export default {
  dir: 'notes',
  link: '/note',
  notes: [
    vuepressThemePlume,
    interviewQuestion,
  ]
}
