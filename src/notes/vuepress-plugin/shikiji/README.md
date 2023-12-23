---
title: plugin-shikiji
author: 鹏展博
createTime: 2023/12/23 13:21:28
permalink: /note/vuepress-plugin/shikiji/
---

项目地址： [@vuepress-plume/plugin-shikiji](https://github.com/pengzhanbo/vuepress-theme-plume/tree/main/plugins/plugin-shikiji)

![npm version](https://badge.fury.io/js/@vuepress-plume%2Fplugin-shikiji.svg)
![npm download](https://img.shields.io/npm/dt/@vuepress-plume/plugin-shikiji)

## 指南

使用 [`shikiji`](https://shikiji.netlify.app/) 来为 Markdown 代码块启用代码高亮。

## 安装

::: code-tabs
@tab  npm
``` sh
npm install @vuepress-plume/plugin-shikiji
```

@tab:active yarn
``` sh
yarn add @vuepress-plume/plugin-shikiji
```

@tab pnpm
``` sh
pnpm add @vuepress-plume/plugin-shikiji
```
:::

## 使用

```ts
// .vuepress/config.ts
import shikijiPlugin from '@vuepress-plume/plugin-shikiji'
module.exports = {
  //...
  plugins: [
    shikijiPlugin({
      // options ...
    })
  ]
  // ...
}
```

## Options

```ts
interface ShikijiOptions {
  /**
   * 用于语法高亮显示的自定义主题。
   *
   * 你也可以传递一个带有 `light` 和 `dark` 主题的对象来支持双重主题。
   *
   * @example { theme: 'github-dark' }
   * @example { theme: { light: 'github-light', dark: 'github-dark' } }
   *
   * 可以使用现有的主题。
   * @see https://github.com/antfu/shikiji/blob/main/docs/themes.md#all-themes
   * 或者添加自己的主题。
   * @see https://github.com/antfu/shikiji/blob/main/docs/themes.md#load-custom-themes
   */
  theme?: ThemeOptions
  /**
   * 语法高亮显示的语言。
   * @see https://github.com/antfu/shikiji/blob/main/docs/languages.md#all-themes
   */
  languages?: LanguageInput[]
  /**
   * 自定义语言别名。
   *
   * @example { 'my-lang': 'js' }
   * @see https://github.com/antfu/shikiji/tree/main#custom-language-aliases
   */
  languageAlias?: Record<string, string>
  /**
   * Setup Shikiji instance
   */
  shikijiSetup?: (shikiji: Highlighter) => void | Promise<void>
  /**
   * 指定语言不可用时的回退语言。
   */
  defaultHighlightLang?: string
  /**
   * Transformers applied to code blocks
   * @see https://github.com/antfu/shikiji#hast-transformers
   */
  codeTransformers?: ShikijiTransformer[]
}

```
