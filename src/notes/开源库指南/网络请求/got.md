---
title: got
createTime: 2024/09/15 20:32:34
permalink: /fe-oss/got/
---

<Badge text="NodeJS" />

<RepoCard repo="sindresorhus/got" />

## 概述

Got 是一个轻量级、功能丰富且基于 Promise 的 Node.js HTTP 客户端库，旨在简化 HTTP 请求的处理过程。

与 Node.js 原生 http 模块或其他流行库（如 axios）相比，Got 提供了更简洁的 API、自动重试机制、流式支持和高度的可定制性。

### 特性

- **自动重试**：在网络波动或服务不可用时自动重试请求，提升鲁棒性。
- **Promise 原生支持**：完美适配 async/await 语法，避免回调地狱。
- **流式处理**：通过 got.stream 支持大文件下载或实时数据流处理。
- **高度可定制**：可修改请求头、超时时间、查询参数等，并支持钩子（hooks）扩展。
- **内置 JSON 处理**：自动解析响应为 JSON 对象，简化数据消费流程。

## 安装

::: npm-to

```sh
npm install got
```

:::

## 使用

### 基础示例

GET 请求

```ts
import got from 'got'

// 获取 JSON 数据
const response = await got('https://jsonplaceholder.typicode.com/posts/1')
console.log(JSON.parse(response.body))
```

POST 请求

```ts
const response = await got.post('https://api.example.com/login', {
  json: { username: 'foo', password: 'bar' },
  responseType: 'json' // 自动解析响应为 JSON
})
console.log(response.body.token)
```

### 自定义请求配置

```ts
await got('https://api.example.com/data', {
  headers: { 'User-Agent': 'MyApp/1.0' },
  searchParams: { page: 2 }, // 添加查询参数 ?page=2
  timeout: { request: 5000 } // 5 秒超时
})
```

### 流式下载文件

```ts
import fs from 'node:fs'
import got from 'got'

const downloadStream = got.stream('https://example.com/large-file.zip')
const fileWriter = fs.createWriteStream('file.zip')
downloadStream.pipe(fileWriter)

fileWriter.on('finish', () => console.log('下载完成！'))
```

## 适用场景

- 高频 API 调用

  适合需频繁调用外部 API 的服务（如微服务架构）。自动重试和超时管理保障了请求的可靠性

- 数据爬取与流处理

  流式支持使其高效处理大规模数据下载（如爬虫场景），避免内存溢出

- 服务器端通信

  在 BFF（Backend for Frontend）层中，Got 可聚合多个下游服务的数据，并通过统一的错误处理简化逻辑
