import { defineClientConfig } from '@vuepress/client'
import Stamps from './.vuepress/theme/components/Stamps.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Stamps', Stamps)
  },
})
