---
title: minimatch
createTime: 2024/05/10 14:32:15
permalink: /fe-oss/minimatch/
---

<Badge text="NodeJS 20 || >=22" />

<RepoCard repo="isaacs/minimatch"  />

## 概述

一个极简的匹配工具。

这是 **npm** 内部使用的匹配库。

其工作原理是将 glob 表达式转换为 JavaScript 正则表达式对象。

## 场景

- 检查当前文件的路径是否符合特定模式
- 当需要从一个文件列表中 过滤/排除 出符合特定模式的文件集合

## 安装

:::npm-to

```sh
npm install minimatch
```

:::

## 使用

## 基础用法

```ts
import { minimatch } from 'minimatch'

minimatch('bar.foo', '*.foo') // true!
minimatch('bar.foo', '*.bar') // false!
minimatch('bar.foo', '*.+(bar|foo)', { debug: true }) // true, and noisy!
```

## 从文件列表中过滤

`minimatch.filter(pattern)` 返回一个用于测试其输入参数的函数，适合与 `Array.filter` 一起使用

```ts
import { minimatch } from 'minimatch'

const filtered = fileList.filter(minimatch.filter('*.js', { matchBase: true }))
```
