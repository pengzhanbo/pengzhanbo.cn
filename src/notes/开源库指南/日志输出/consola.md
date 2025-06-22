---
title: consola
createTime: 2024/05/04 23:48:03
permalink: /fe-oss/consola/
tags:
  - console
  - logging
  - cli
---

<Badge text="NodeJS" /> <Badge text="Browsers" />

<RepoCard repo="unjs/consola" />

## 概述

::: center
优雅的控制台包装器

![consola](https://github.com/unjs/consola/assets/904724/0e511ee6-2543-43ab-9eda-152f07134d94)
:::

`Consola` 是一个由 `Nuxt.js` 团队开发的现代化、高性能的 Node.js 日志管理库，专为简化开发和生产环境中的日志记录而设计。
它结合了美观的输出格式、灵活的配置和轻量级架构，成为 Node.js 生态中流行的日志解决方案。

## 使用场景

- 开发环境下的日志输出
- 构建部署时的日志输出
- 在 CI/CD 环境下的日志输出
- 命令行工具的日志输出

如果你的应用服务需要日志输出库，推荐使用 [pino](./pino.md) 作为日志输出库，
因为它更适合高性能的日志记录，同时还支持多种输出渠道，如文件、控制台、远程日志服务等。

## 安装

:::npm-to

```sh
npm install consola
```

:::

## 使用

```ts
import consola from 'consola'

// 不同级别日志
consola.info('启动服务')
consola.success('操作完成！')
consola.error(new Error('文件未找到'))

// 带标签的日志
const dbLogger = consola.withTag('Database')
dbLogger.debug('连接池初始化')
```
