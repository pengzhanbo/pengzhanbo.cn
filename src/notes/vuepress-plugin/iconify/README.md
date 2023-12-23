---
title: plugin-iconify
author: 鹏展博
createTime: 2023/02/26 05:07:33
permalink: /note/vuepress-plugin/iconify/
---

[![npm version](https://img.shields.io/npm/v/@vuepress-plume/plugin-iconify?color=32A9C3&labelColor=1B3C4A&label=npm)](https://www.npmjs.com/package/@vuepress-plume/plugin-iconify){style="margin-right:8px"}
[![npm beta download](https://img.shields.io/npm/dy/@vuepress-plume/vuepress-plugin-iconify?color=32A9C3&labelColor=1B3C4A&label=beta%20downloads)](https://www.npmjs.com/package/@vuepress-plume/plugin-iconify){style="margin-right:8px"}
[![npm download](https://img.shields.io/npm/dy/@vuepress-plume/plugin-iconify?color=32A9C3&labelColor=1B3C4A&label=downloads)](https://www.npmjs.com/package/@vuepress-plume/plugin-iconify){style="margin-right:8px"}
[![github source](https://img.shields.io/badge/source-a?logo=github&color=1B3C4A)](https://github.com/pengzhanbo/vuepress-theme-plume/tree/main/plugins/plugin-iconify)



## 指南

添加 `iconify` 图标库支持。并注入全局组件 `<Iconify>`

支持 iconify 所有图标，支持通过 icon name 加载图标，可在[iconify search](https://icon-sets.iconify.design/) 搜索图标使用。

## 安装

::: code-tabs
@tab  npm
``` sh
npm install @vuepress-plume/plugin-iconify
```

@tab:active yarn
``` sh
yarn add @vuepress-plume/plugin-iconify
```

@tab pnpm
``` sh
pnpm add @vuepress-plume/plugin-iconify
```
:::

## 使用

```ts
// .vuepress/config.ts
import iconifyPlugin from '@vuepress-plume/plugin-iconify'
module.exports = {
  //...
  plugins: [
    iconifyPlugin({
      componentName: 'Iconify'
    })
  ]
  // ...
}
```

### Options

```ts
interface IconifyOptions {
  /**
   * 组件名， 默认 `Iconify`
   */
  componentName?: string
  color?: string
  size?: string | number
}
```

### Component

```vue
<template>
  <Iconify name="material-symbols:home" color="currentColor" size="1em" />
</template>
```

效果： <Iconify name="material-symbols:home" color="currentColor" size="1em" />
