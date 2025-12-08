import { defineMermaidConfig } from '@vuepress/plugin-markdown-chart/client'
import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import { defineClientConfig } from 'vuepress/client'
// import Qiniu from '~theme/components/AD/Qiniu.vue'
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
  layouts: {
    Layout: h(Layout, null, {
      // 'aside-top': () => h(Qiniu),
      'doc-title-after': () => h(PageContextMenu),
    }),
  },
})
