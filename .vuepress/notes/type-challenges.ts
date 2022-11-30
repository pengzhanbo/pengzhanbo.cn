import { definePlumeNotesItemConfig } from '@vuepress-plume/vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  link: '/type-challenges/',
  text: 'Type Challenges',
  dir: 'type-challenges',
  sidebar: [
    '',
    {
      dir: '热身',
      text: '热身',
      children: [
        'HelloWorld',
      ]
    },
    {
      dir: '简单',
      text: '简单',
      children: [
        'pick',
        'readonly',
        'tupleToObject',
        'firstOfArray',
        'lengthOfTuple'
      ]
    },
    {
      dir: '中等',
      text: '中等',
      children: [
      ]
    },
    {
      dir: '困难',
      text: '困难',
      children: [
      ]
    },
    {
      dir: '地狱',
      text: '地狱',
      children: [
      ]
    },
  ]
})
