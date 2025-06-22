import { defineMermaidConfig } from '@vuepress/plugin-markdown-chart/client'
import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import { defineClientConfig } from 'vuepress/client'
import Landing from '~theme/components/Landing.vue'
import { useStatistics } from '~theme/composables/statistics'

import '~theme/styles/index.css'

defineMermaidConfig({
  class: {
    hideEmptyMembersBox: true,
  },
  look: 'handDrawn',
})

export default defineClientConfig({
  enhance({ app }) {
    app.component('RepoCard', RepoCard)
    app.component('NpmBadge', NpmBadge)
    app.component('NpmBadgeGroup', NpmBadgeGroup)
    app.component('Landing', Landing)
  },
  setup() {
    useStatistics()
  },
})
