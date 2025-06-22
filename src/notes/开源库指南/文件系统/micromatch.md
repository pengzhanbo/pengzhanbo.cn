---
title: micromatch
createTime: 2024/05/10 14:32:31
permalink: /fe-oss/micromatch/
---

<Badge text="NodeJS 8+" />

<RepoCard repo="micromatch/micromatch" />

## 概述

针对 **JavaScript/Node.js** 的 glob 匹配工具。作为 minimatch 和 multimatch 的更快速替代方案。

## 场景

- 检查当前文件的路径是否符合特定模式
- 当需要从一个文件列表中 过滤/排除 出符合特定模式的文件集合

## 安装

:::npm-to

```sh
npm install micromatch
```

:::

## 使用

```ts
import micromatch from 'micromatch'

// 返回匹配的列表
console.log(micromatch(['foo', 'bar', 'baz', 'qux'], ['f*', 'b*'])) // => ['foo', 'bar', 'baz']
console.log(micromatch(['foo', 'bar', 'baz', 'qux'], ['*', '!b*'])) // => ['foo', 'qux']

// 检查是否匹配
console.log(micromatch.isMatch('foo', 'f*')) // => true
console.log(micromatch.isMatch('foo', ['b*', 'f*'])) // => true

// 根据模式返回一个匹配函数
const isMatch = mm.matcher('*.!(*a)')
console.log(isMatch('a.a')) // => false
console.log(isMatch('a.b')) // => true
```
