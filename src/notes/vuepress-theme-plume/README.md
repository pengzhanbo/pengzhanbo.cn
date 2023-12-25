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

## 作者的话

### 背景
开发本主题的原因，是在我个人学习 `vue@3`以及 `vite` 时，想做一个学习的笔记。

在我之前使用的 vuepress1时，发现版本挺长时间没升级了，想顺手做下升级，发现 `vuepress@2` 已经出于 beta阶段，而且还是在`vue3` 和`vite` 等的基础上做的重构，而且还是使用 `typescript` 编写的代码。

这刚好跟我的学习计划都撞上了，于是就开始阅读 `vuepress@2` 的相关源码，然后着手开始重构我的个人站点，并通过开发一款 主题的方式，熟悉 `vuepress2` 和 `vue3`的相关内容，简直是一举多得。

当然也由于本主题是 学习过程中的作品， 很多内容在一开始并没有做完备的规划，仅是一个大概的想法，然后就进行了开发，所以截止到目前阶段，项目代码还没有进行比较严格的整理，稍显散乱；部分功能也还没有完善，出于开发中，可能在使用过程中出现一些意外情况。

`vuepress`一直是我非常喜欢的一个静态文档站点制作工具，我用它在我工作中的不少项目中建立文档站点，以及编写自己的个人博客（虽然很懒经常没写...）。

### 想法
开发这个主题，我一开始的想法是希望做一个能够尽可能的少配置化的，能够更关注于写作的主题。不需要去配置 navbar、不需要去关注链接，不需要去关注配置文件中怎么去编排文章。能够仅仅通过一些简单的约定，根据目录以及文件名称，自动生成文章列表，以及自动生成文章的默认配置。

以目前的进度，初期的想法基本都按照我的预期实现了，后续如果有新的想法，还会继续添加。

在达到一个合适的阶段后，会将重点放在代码的整理上，希望能够让本主题也称为喜欢`vuepress`并考虑自行开发一个主题或者插件的人，给到一个项目示例的参考。

::: tip 寄语
欢迎各位使用本主题；

也欢迎各位fork本主题后自行修改；

也欢迎各位参考本主题，制作自己的主题。
:::
