---
title: vuepress-theme-plume
createTime: 2022/04/08 08:52:12
permalink: /note/vuepress-theme-plume/
author: 鹏展博
---

[![npm version](https://img.shields.io/npm/v/vuepress-theme-plume?color=32A9C3&labelColor=1B3C4A&label=npm)](https://www.npmjs.com/package/vuepress-theme-plume){style="margin-right:8px"}
[![npm beta download](https://img.shields.io/npm/dy/@vuepress-plume/vuepress-theme-plume?color=32A9C3&labelColor=1B3C4A&label=beta%20downloads)](https://www.npmjs.com/package/vuepress-theme-plume){style="margin-right:8px"}
[![npm download](https://img.shields.io/npm/dy/vuepress-theme-plume?color=32A9C3&labelColor=1B3C4A&label=downloads)](https://www.npmjs.com/package/vuepress-theme-plume){style="margin-right:8px"}
[![github source](https://img.shields.io/badge/source-a?logo=github&color=1B3C4A)](https://github.com/pengzhanbo/vuepress-theme-plume)

::: info 提示
基于 [vuepress-next](https://github.com/vuepress/vuepress-next), 目前处于 RC 阶段。

这意味着功能和API 趋于稳定，但在未来的更新中仍有小概率出现破坏更改。
:::


__基于 `vuepress 2.0` 制作的 `Blog` 主题。__

> 如果在使用过程中遇到问题，请在 [issue](https://github.com/pengzhanbo/vuepress-theme-plume/issues/new) 中提出

## 功能

- 低配置化，安装后仅需少量的配置即可使用
- markdown功能增强，支持 代码分组、嵌入代码demo、内容增强容器。
- 支持 文章分类、标签
- 支持以文档形式整合同体系文章。
- 支持搜索、评论
- 自动生成文章永久链接

## 安装

::: code-tabs
@tab pnpm
```sh
pnpm add vuepress-theme-plume
```
@tab yarn
``` sh
yarn add vuepress-theme-plume
```

@tab npm
``` sh
npm i vuepress-theme-plume
```
:::

> 你可能需要手动安装 `katex`: `npm i katex`

## 使用

::: code-tabs
@tab ts
``` ts
// .vuepress/config.ts
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
export default defineUserConfig({
  theme: plumeTheme({
    // more...
  })
})
```

@tab js
``` js
// .vuepress/config.js
import { plumeTheme } from 'vuepress-theme-plume'
module.exports = {
  theme: plumeTheme({
    // more...
  })
}
```
:::

## 示例

- [我的博客](https://pengzhanbo.cn)

::: tip 
欢迎各位使用本主题；

也欢迎各位fork本主题后自行修改；

也欢迎各位参考本主题，制作自己的主题。
:::
