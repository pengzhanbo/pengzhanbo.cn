---
title: lru-cache
createTime: 2024/07/12 14:21:41
permalink: /fe-oss/lru-cache/
tags:
  - storage
  - cache
---

<Badge text="NodeJs" />

<RepoCard repo="isaacs/node-lru-cache" />

## 概述

一个高性能、功能丰富的 **Least Recently Used (LRU) 缓存** 实现库，专为 Node.js 环境设计。

**LRU (最近最少使用)**：当缓存达到设定的容量上限时，它会自动淘汰那些最近最少被访问的项，为新数据腾出空间。
这是管理有限内存资源的有效策略。

## 特性

- **LRU 缓存**：

  - 存储键值对 (`key` -> `value`)。
  - 当添加新项导致缓存大小超过 `max` 或 `maxSize` 限制时，自动淘汰最近最少使用的项。
  - 高效的 `get` (获取)、`set` (设置/更新)、`delete` (删除)、`has` (检查存在) 操作。

- **容量限制**：

  - `max`: 设置缓存允许存储的最大 条目数量。最常用的限制方式。

  - `maxSize`: 设置缓存允许使用的 最大总大小（字节数或其他单位）。需要配合 `sizeCalculation` 函数使用。

  - `sizeCalculation`: 一个函数，用于计算每个缓存项的大小（除了其键所占的内存）。
    例如，可以用来计算存储对象或字符串的实际内存占用。这对于精确控制内存使用至关重要。

- **条目过期 (TTL - Time To Live)**：

  - `ttl`: 设置全局默认的条目存活时间（毫秒）。超过此时间未访问的条目会被视为过期。

  - `ttlAutopurge`: 是否在读取 (`get`) 时自动删除已过期的条目 (默认 `true`)。

  - `allowStale`: 允许在读取 (`get`) 时返回已过期但尚未被淘汰的条目 (默认 `false`)。

  - `updateAgeOnGet`: 在读取 (`get`) 时是否重置条目的“年龄”，将其视为新访问，从而延长它在缓存中的生存时间 (默认 `false`)。如果为 `true`，频繁访问的条目几乎不会过期。

  - `noDeleteOnStaleGet`: 当 `allowStale` 为 `true` 时，读取过期条目是否不触发异步后台删除 (默认 `false`，即会触发删除)。

  - `ttlResolution`: 过期检查的时间间隔精度（毫秒）。为了性能，内部不会实时检查每个条目，而是按此间隔批量检查 (默认 `0 ms`，表示尽可能精确，但实际受事件循环影响)。

  - **在 `set` 时指定 TTL**: 可以单独为每个 `set` 操作设置该条目的特定 TTL，覆盖全局 `ttl`。

- **获取与更新**：

  - `fetchMethod`: 当尝试 `get` 一个不存在（或允许过期且已过期）的键时，可以用这个函数去异步获取数据。
    它会防止对同一个键的重复并发请求（类似 Single Flight），只发出一个请求并将结果返回给所有等待者。
    极大简化了 **“缓存未命中则加载”** 的模式。`async (key, staleValue, { options, signal, context }) => {}`。
  - `noDeleteOnFetchRejection`: 如果 `fetchMethod` 拒绝 (`reject`)，是否不删除该键（默认 `false`，即会删除占位符）。
  - `allowStaleOnFetchRejection`: 如果 `fetchMethod` 拒绝 (`reject`) 且 `allowStale` 为 `true`，
    是否返回过期的旧值（如果有） (默认 `false`)。

## 安装

::: npm-to

```sh
npm install lru-cache
```

:::

## 使用

```ts
import { LRUCache } from 'lru-cache'

const cache = new LRUCache({
  max: 500, // 最大缓存条数

  // maxSize 和 sizeCalculation 配合使用
  maxSize: 5000, // 最大缓存大小
  sizeCalculation: (value, key) => value.length, // 计算每个缓存项的大小

  ttl: 1000 * 60 * 5, // 存活时间，单位毫秒

  allowStale: false, // 在从缓存中移除之前返回过期项？

  updateAgeOnGet: false,
  updateAgeOnHas: false,

  /// 用于cache.fetch()的异步方法，实现
  // 类似stale-while-revalidate（后台更新缓存）的行为模式
  fetchMethod: async (
    key,
    staleValue,
    { options, signal, context }
  ) => {},
})

// 设置值
cache.set('key', 'value')
// 获取值
cache.get('key') // "value"
// 检查是否存在
cache.has('key') // true
// 删除
cache.delete('key')

// 非字符串键名完全支持
// 但需注意必须是同一个对象，而非
// 仅结构等效的JSON对象
let someObject = { a: 1 }
cache.set(someObject, 'a value')

cache.clear() // 清空缓存
```

## 性能

- **高度优化**： 使用纯 JavaScript 实现，针对 V8 引擎做了优化。
- **零依赖**： 不依赖任何其他 npm 包，体积小，安全性高，安装快速。
- **O(1) 操作**： get, set, delete, has 等核心操作的时间复杂度都是常数级，非常高效。

## 适用场景

- **数据库查询缓存**： 缓存频繁查询的数据库结果。
- **API 响应缓存**： 缓存外部 API 调用的结果。
- **计算/渲染结果缓存**： 缓存耗时的计算结果、模板渲染结果。
- **会话存储 (Session Storage)**： 在内存中存储用户会话信息（注意持久化和分布式问题）。
- **速率限制**： 存储请求计数。
- 任何需要内存中快速键值存储且有容量限制和淘汰策略的地方。
