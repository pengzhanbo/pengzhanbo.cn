import config from '@pengzhanbo/eslint-config-vue'

export default config({
  regexp: false,
  ignores: [
    'src/blog/1.前端/12.TypeScript/jsdoc参考.md',
    'src/面试题/JavaScript/变量.md',
    'src/blog/1.前端/2.工具/jsr使用指南.md',
    'src/blog/1.前端/6.JavaScript/2.进阶/执行上下文栈.md',
  ],
}, {
  files: ['**/*.md/**/*.{ts,js,vue,jsx,tsx}'],
  rules: {
    'prefer-regex-literals': 'off',
    'prefer-const': 'off',
    'no-proto': 'off',
    'no-restricted-properties': 'off',
    'ts/no-unsafe-function-type': 'off',
    'no-debugger': 'off',
    'no-new-func': 'off',
    'ts/no-empty-object-type': 'off',
    'ts/ban-ts-comment': 'off',
    '@typescript-eslint/prefer-literal-enum-member': 'off',
  },
}, {
  files: ['src/1.前端/3.Vue/Vue 原理解析—diff 算法.md/**/*.ts'],
  rules: {
    'unicorn/no-new-array': 'off',
    'no-unmodified-loop-condition': 'off',
  },
})
