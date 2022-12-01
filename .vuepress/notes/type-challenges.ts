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
        'lengthOfTuple',
        'exclude',
        'awaited',
        'if',
        'concat',
        'includes',
        'push',
        'unshift',
        'parameters',
      ]
    },
    {
      dir: '中等',
      text: '中等',
      children: [
        'getReturnType',
        'omit',
        'readonly2',
        'deepReadonly',
        'tupleToUnion',
        'chainableOptions',
        'lastOfArray',
        'pop',
        'promiseAll',
        'typeLookup',
        'trimLeft',
        'trim',
        'capitalize',
        'replace',
        'replaceAll',
        'appendArgument',
        'permutation',
        'lengthOfString',
        'flatten',
        'appendToObject',
        'absolute',
        'stringToUnion',
        'merge',
        'kebabCase',
        'diff',
        'anyOf',
        'isNever',
        'isUnion',
        'replaceKeys',
        'removeIndexSignature',
        'percentageParser',
        'dropChar',
        'minusOne',
        'pickByType',
        'startsWith',
        'endsWith',
        'mutable',
        'omitByType',
        'objectEntries',
        'shift',
        'tupleToNestedObject',
        'reverse',
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
