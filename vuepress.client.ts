import { defineMermaidConfig } from '@vuepress/plugin-markdown-chart/client'
import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
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
    app.component('Landing', Landing)
  },
  setup() {
    useStatistics()
  },
  layouts: {
    Layout: h(Layout, null, {
      'doc-title-after': () => h(PageContextMenu),
    }),
  },
})
