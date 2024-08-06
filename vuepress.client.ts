import { defineClientConfig } from 'vuepress/client'
import type { ClientConfig } from 'vuepress/client'
import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('RepoCard', RepoCard)
    app.component('NpmBadge', NpmBadge)
    app.component('NpmBadgeGroup', NpmBadgeGroup)
  },
}) as ClientConfig
