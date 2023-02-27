---
title: plugin-blog-data
author: 鹏展博
createTime: 2023/02/26 05:06:44
permalink: /note/vuepress-plugin/blog-data/
---

项目地址： [vuepress-plugin-blog-data](https://github.com/pengzhanbo/vuepress-theme-plume/tree/main/packages/plugin-blog-data)

![npm version](https://badge.fury.io/js/@vuepress-plume%2Fvuepress-plugin-blog-data.svg)
![npm download](https://img.shields.io/npm/dt/@vuepress-plume/vuepress-plugin-blog-data)

## 指南

根据配置，读取 vuepress 应用下的 markdown 文件，将符合规则的 `page` 归类为 `blog` ，并提供 `useBlogPostData`方法获取 文章列表 数据，提供给 vuepress 主题的开发者。

插件不提供组件，仅提供相关的数据，主题开发者可通过数据开发自定义的 blog 文章列表页、以及其他功能。

## 安装

::: code-tabs
@tab  npm
``` sh
npm install @vuepress-plume/vuepress-plugin-blog-data
```

@tab:active yarn
``` sh
yarn add @vuepress-plume/vuepress-plugin-blog-data
```

@tab pnpm
``` sh
pnpm add @vuepress-plume/vuepress-plugin-blog-data
```
:::

## 使用

```ts
// .vuepress/config.ts
import blogDataPlugin from '@vuepress-plume/vuepress-plugin-blog-data'
module.exports = {
  //...
  plugins: [
    blogDataPlugin({
      include: ['**/*.md']
    })
  ]
  // ...
}
```

### Options

```ts
interface BlogDataPluginOptions {
  /**
   * 包含的文件， glob匹配
   */
  include?: string | string[]
  /**
   * 排除的文件， glob匹配
   */
  exclude?: string | string[]
  /**
   * 排序方式
   */
  sortBy?: 'createTime' | false | (<T>(prev: T, next: T) => boolean)
  /**
   * 是否生成文章摘要
   */
  excerpt?: boolean
  /**
   * 扩展单个 post 的数据
   */
  extendBlogData?: <T = any>(page: T) => Record<string, any>
}
```

### `useBlogPostData()`

在 client 端，获取 `blog post data`

```vue
<script lang="ts" setup>
import { useBlogPostData } from '@vuepress-plume/vuepress-plugin-blog-data/client'
const postList = useBlogPostData()
</script>
<template>
  <div v-for="post in postList">
    <h3>{{ post.title }}</h3>
    <a :href="post.path" >阅读全文</a>
  </div>
</template>
```
