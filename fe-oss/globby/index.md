---
url: /fe-oss/globby/index.md
---
## 概述

[**globby** 官方文档](https://github.com/sindresorhus/globby){.read-more}

基于 [fast-glob](./fast-glob.md)，但添加了许多有用的功能。

## 特性

* Promise API
* 多种模式支持
* 否定模式：`['foo*', '!foobar']`
* 自动展开目录：`foo → foo/**/*`
* 兼容 `.gitignore` 及同类忽略配置文件
* 支持 `URL` 作为 `cwd`

## 安装

:::npm-to

```sh
npm install globby
```

:::

## 使用

```ts
import { globby, globbyStream, globbySync } from 'globby'
```

```ts
// 异步模式
const paths = await globby(['*', '!cake'])

console.log(paths)
// => ['unicorn', 'rainbow']
```

```ts
// 同步模式
const paths = globbySync(['*', '!cake'])

console.log(paths)
// => ['unicorn', 'rainbow']
```

```ts
// 流模式
import { globbyStream } from 'globby'

for await (const path of globbyStream('*.tmp')) {
  console.log(path)
}
```
