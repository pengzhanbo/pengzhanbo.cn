---
title: level
createTime: 2024/07/12 14:22:22
permalink: /fe-oss/level/
---

<Badge text="NodeJS" /> <Badge text="Browser" />

<RepoCard repo="Level/level" />

## 概述

[**level** 官方文档](https://github.com/Level/abstract-level){.read-more}

LevelDB 是由 Google 开发的高性能键值存储引擎，而 level 是其在 Node.js 环境中的开源实现，通过 JavaScript 封装提供轻量级 NoSQL 数据库解决方案。

## 安装

::: npm-to

```sh
npm install level
```

:::

## 使用

```ts
import { Level } from 'level'

// 创建数据库
const db = new Level('example', { valueEncoding: 'json' })

// 设置值
await db.put('a', 1)

// 批量操作
await db.batch([{ type: 'put', key: 'b', value: 2 }])

// 获取值
const value = await db.get('a')

// 遍历键大于'a'的条目
for await (const [key, value] of db.iterator({ gt: 'a' })) {
  console.log(value) // 2
}
```

## 适用场景

- **高频写入**：日志收集、实时监控数据（LSM-Tree 写优化）
- **嵌入式存储**：本地化数据缓存
