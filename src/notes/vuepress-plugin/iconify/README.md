---
title: plugin-iconify
author: 鹏展博
createTime: 2023/02/26 05:07:33
permalink: /note/vuepress-plugin/iconify/
---

项目地址： [vuepress-plugin-iconify](https://github.com/pengzhanbo/vuepress-theme-plume/tree/main/packages/plugin-iconify)

![npm version](https://badge.fury.io/js/@vuepress-plume%2Fvuepress-plugin-iconify.svg)
![npm download](https://img.shields.io/npm/dt/@vuepress-plume/vuepress-plugin-iconify)

## 指南

添加 `iconify` 图标库支持。并注入全局组件 `<Iconify>`

支持 iconify 所有图标，支持通过 icon name 加载图标，可在[iconify search](https://icon-sets.iconify.design/) 搜索图标使用。

## 安装

::: code-tabs
@tab  npm
``` sh
npm install @vuepress-plume/vuepress-plugin-iconify
```

@tab:active yarn
``` sh
yarn add @vuepress-plume/vuepress-plugin-iconify
```

@tab pnpm
``` sh
pnpm add @vuepress-plume/vuepress-plugin-iconify
```
:::

## 使用

```ts
// .vuepress/config.ts
import iconifyPlugin from '@vuepress-plume/vuepress-plugin-iconify'
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
