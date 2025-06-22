---
title: tiny-glob
createTime: 2024/05/14 16:51:10
permalink: /fe-oss/tiny-glob/
---

<Badge text="NodeJS" />

<RepoCard repo="terkelg/tiny-glob" />

## 概述

[**tiny-glob** 官方文档](https://github.com/terkelg/tiny-glob){.read-more}

微型且极速的文件与文件夹匹配库，支持使用通配符模式。

**比 [glob](./glob.md) 快约 350%！** **比 [fast-glob](./fast-glob.md) 快约 230%！**

## 安装

:::npm-to

```sh
npm install tiny-glob
```

:::

## 使用

```ts
import glob from 'tiny-glob'

let files = await glob('src/*/*.{js,md}')
```
