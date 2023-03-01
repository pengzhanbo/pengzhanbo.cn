---
title: plugin-notes-data
author: 鹏展博
createTime: 2023/02/26 05:07:59
permalink: /note/vuepress-plugin/notes-data/
---

## 指南

根据配置，读取 vuepress 应用下的 markdown 文件，将符合规则的 `page` 归类为 `notes` ，
简化配置 `sidebar`。 
并提供 `useNotesData`方法获取 notes 数据，提供给 vuepress 主题的开发者。

插件不提供组件，仅提供相关的数据，主题开发者可通过数据开发自定义的 notes 功能。

## 安装

::: code-tabs
@tab  npm
``` sh
npm install @vuepress-plume/vuepress-plugin-notes-data
```

@tab:active yarn
``` sh
yarn add @vuepress-plume/vuepress-plugin-notes-data
```

@tab pnpm
``` sh
pnpm add @vuepress-plume/vuepress-plugin-notes-data
```
:::

## 使用

```ts
// .vuepress/config.ts
import notesDataPlugin from '@vuepress-plume/vuepress-plugin-notes-data'
module.exports = {
  //...
  plugins: [
    notesDataPlugin({
      dir: '/notes/'
    })
  ]
  // ...
}
```

### Options

```ts
type NotesDataOptions = {
  dir: string
  link: string
  include?: string | string[]
  exclude?: string | string[]
  notes: NotesItem[]
}

type NotesItem = {
  dir: string
  link: string
  text: string
  sidebar?: NotesSidebar | 'auto'
}

type NotesSidebar = (NotesSidebarItem | string)[]

type NotesSidebarItem = {
  text?: string
  link?: string
  dir?: string
  collapsed?: boolean
  items?: NotesSidebar
}
```

### `useNotesData()`

在 client 端，获取 `notes sidebar data`

```vue
<script lang="ts" setup>
import { useNotesData } from '@vuepress-plume/vuepress-plugin-notes-data/client'
const notesData = useNotesData()
</script>
```