---
url: /fe-oss/path-to-regexp/index.md
---
## 概述

[**path-to-regexp** 官方文档](https://github.com/pillarjs/path-to-regexp){.read-more}

将路径字符串，如 `/user/:name`，转换为正则表达式。

此模块是 `Express` 的基础依赖，可以用于 Node.js 中的路由匹配等场景。

## 安装

::: npm-to

```sh
npm install path-to-regexp
```

:::

## 路径规则

::: warning `v6` 和 `v8`
最新的 `v8` 版本和 旧版本 `v6` 在路径规则上差异较大，废弃了很多参数规则。

此处仅介绍 `v8` 的路径规则
:::

### 参数

在 `/user/:name` 中， `:name` 表示为一个参数，它可以匹配 `/user/mark` 这样的路径。
被匹配的参数可以通过 `params` 获取到，解析为 `{ params: { name: 'mark' } }`

`/:foo/:bar` 表示两个参数，可以匹配 `/foo/bar` 这样的路径，解析为 `{ params: { foo: 'foo', bar: 'bar' } }`

### 通配符

通配符参数可匹配跨多个段的一个或多个字符。其定义方式与常规参数相同，但需以星号（\*foo）作为前缀。

比如 `/*splat` 可以匹配 `/foo/bar` 这样的路径，解析为 `{ params: { splat: ['foo', 'bar'] } }`

通常情况下，通配符参数应该在最后，因为匹配结果的优先级是从左到右的。

### 可选部分

大括号可用于定义路径中可选的部分。

**可选部分不只指参数可选，路径中的任何部分都可以被定义为可选。**

比如 `/user{/:id}/delete` 可以匹配 `/user/delete` 和 `/user/123/delete` 这样的路径:

* `/user/delete` 解析为 `{ params: {} }`
* `/user/123/delete` 解析为 `{ params: { id: '123' } }`

## 使用

```ts
import { compile, match, parse, pathToRegexp, stringify } from 'path-to-regexp'
```

### 路径匹配

```ts
// 创建匹配函数
const matchFn = match('/user/:id')

matchFn('/user/123') // { path: '/user/:id', params: { id: '123' }

matchFn('/u/abc') // 不匹配则返回 false
```

### 路径正则表达式

```ts
const { regexp, keys } = pathToRegexp('/user/:id')

const result = regexp.exec('/user/123') // // ['/user/123', '123']
// 执行正则表达式，匹配参数顺序保存在 keys 中
console.log(keys) // [{ type: 'param', name: 'id' }]
```

### compiler

`compiler(path)` 是反向的 `pathToRegexp`，可以将 路径规则 + 参数 转换为路径字符串

```ts
const toPath = compile('/user/:id')

toPath({ id: 'name' }) // => "/user/name"
```
