import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  title: 'Agent Skills',
  linkPrefix: '/ai-agent-skills/',
  dir: 'AI-agent-skills',
  sidebar: [
    '',
    'overview',
    'what-are-skills',
    'specification',
    'integrate',
    {
      text: '相关文章',
      prefix: 'about',
      items: [
        'equipping-agents-for-the-real-world-with-agent-skills',
      ],
    },
  ],
})
