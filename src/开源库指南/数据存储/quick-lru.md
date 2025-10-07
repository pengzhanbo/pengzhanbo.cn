---
title: quick-lru
createTime: 2024/07/18 14:21:53
permalink: /fe-oss/quick-lru/
tags:
  - storage
  - cache
---

<Badge text="NodeJs" /> <Badge text="Browser" />

<RepoCard repo="sindresorhus/quick-lru" />

## 概述

一个轻量级、高性能的 **最近最少使用（LRU）**缓存库，专为 Node.js 和现代浏览器设计。
通过灵活的内存管理和高效的数据淘汰策略，广泛应用于需要优化资源占用的场景。

## 安装

::: npm-to

```sh
npm install quick-lru
```

:::

## 使用

```ts
import QuickLRU from 'quick-lru'

// 初始化缓存（最大100条，条目存活10秒）
const lru = new QuickLRU({ maxSize: 100, maxAge: 10000 })

// 写入数据
lru.set('user1', { name: 'Alice' })

// 读取数据
lru.get('user1') // => { name: 'Alice' }

// 查看数据，不更新访问时间
lru.peek('user1') // => { name: 'Alice' }

// 检查是否存在
lru.has('user1') // => true

// 删除数据
lru.delete('user1')

// 清空缓存
lru.clear()
```

## 适用场景

- 中小型应用，小规模的缓存，需要优化内存占用
- **数据库查询缓存**：减少重复查询，如缓存用户信息2。
- **API 响应缓存**：存储第三方 API 结果，降低调用频率（需注意数据时效性）
- **前端资源缓存**：预加载图片或计算密集型操作结果
