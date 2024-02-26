---
title: vuepress-theme-plume
createTime: 2022/04/08 08:52:12
permalink: /note/vuepress-theme-plume/
author: 鹏展博
---

<Stamps :stamps="['nv', { type: 'ndt', label: 'beta downloads', package: '@vuepress-plume/vuepress-theme-plume' }, 'ndy', 'g']" repo="pengzhanbo/vuepress-theme-plume"  />

::: tip
基于 [vuepress-next](https://github.com/vuepress/vuepress-next), 目前处于 RC 阶段。

功能和API 趋于稳定，但在未来的更新中仍有小概率出现破坏更改。
:::


__基于 `vuepress 2.0` 制作的 `Blog` 主题。__

> 如果在使用过程中遇到问题，请在 [issue](https://github.com/pengzhanbo/vuepress-theme-plume/issues/new) 中提出

## 功能

- 低配置化，安装后仅需少量的配置即可使用
- markdown功能增强，支持 代码分组、嵌入代码demo、内容增强容器。
- 支持 文章分类、标签、搜索
- 支持以文档形式整合同体系文章。
- 支持搜索、评论
- 自动生成文章永久链接
- 多语言支持
- 支持全站加密、部分加密

## 安装

::: code-tabs
@tab pnpm
```sh
# 安装 vuepress
pnpm add -D vuepress@next vue
# 安装 主题和打包工具
pnpm add -D vuepress-theme-plume @vuepress/bundler-vite@next
```
@tab yarn
``` sh
# 安装 vuepress
yarn add -D vuepress@next
# 安装 主题和打包工具
yarn add -D vuepress-theme-plume @vuepress/bundler-vite@next
```

@tab npm
``` sh
# 安装 vuepress
npm i -D vuepress@next
# 安装 主题和打包工具
npm i -D vuepress-theme-plume @vuepress/bundler-vite@next
```
:::

## 使用

::: code-tabs
@tab .vuepress/config.js
``` ts
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  theme: plumeTheme({
    // more...
  }),
  bundler: viteBundler(),
})
```
:::

查看 [快速开始](./快速开始.md) 了解更多。

## 示例

- [我的博客](https://pengzhanbo.cn)

::: tip 
欢迎各位使用本主题；

也欢迎各位fork本主题后自行修改；

也欢迎各位参考本主题，制作自己的主题。
:::
