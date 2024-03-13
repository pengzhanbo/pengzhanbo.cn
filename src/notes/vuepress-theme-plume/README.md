---
title: vuepress-theme-plume
createTime: 2022/04/08 08:52:12
permalink: /vuepress-theme-plume/
author: 鹏展博
---

<Stamps :stamps="['nv', 'ndy', 'g']" repo="pengzhanbo/vuepress-theme-plume"  />

::: caution 重要通知
主题文档已迁移到 [这个文档](https://plume.pengzhanbo.cn/)， 当前旧文档已不再维护！
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
