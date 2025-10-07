---
title: undici
createTime: 2024/09/20 18:40:01
permalink: /fe-oss/undici/
---

<Badge text="NodeJS" />

<RepoCard repo="nodejs/undici" />

## 概述

[**undici** 官方文档](https://undici.nodejs.org/){.read-more}

==undici== 是由 Node.js 官方团队开发的高性能 HTTP/1.1 客户端库。

它旨在解决 Node.js 原生 HTTP 模块的设计瓶颈，通过底层优化实现显著的性能提升，并支持 HTTP/2 和代理等高级特性

::: tip Node.js 自 v18 版本起内置了基于 `undici` 实现的 `fetch()` 功能。
:::

## 安装

::: npm-to

```sh
npm install undici
```

:::

## 使用

### 基础请求

使用 `fetch`:

```ts
import { fetch } from 'undici'

const response = await fetch('http://localhost:3000/api', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ account: 'test', password: '123456' })
})
const data = await response.json()
```

使用 `request`:

```ts
import { request } from 'undici'

const { statusCode, body } = await request('http://localhost:3000/api')
for await (const chunk of body) {
  console.log(chunk.toString()) // 流式处理响应
}
```

### 连接复用

创建持久化客户端实例，提升重复请求效率：

```ts
import { Client } from 'undici'

const client = new Client('http://localhost:3000')
const { body } = await client.request({ path: '/api', method: 'GET' })
body.on('data', console.log) // 事件监听数据流
```

### 代理转发

```ts
import { createServer } from 'node:http'
import { Client } from 'undici'

const client = new Client('http://upstream-server')
createServer((req, res) => {
  client.stream({ path: req.url, opaque: res }, ({ opaque }) => opaque)
}).listen(3010)
```

### 文件下载

```ts
import fs from 'node:fs'
import { stream } from 'undici'

const out = fs.createWriteStream('./image.jpg')
stream('https://example.com/image.jpg', { opaque: out }, ({ opaque }) => opaque)
```

### 全局代理配置

```ts
import { ProxyAgent, setGlobalDispatcher } from 'undici'

// HTTP 代理
setGlobalDispatcher(new ProxyAgent({ uri: 'http://127.0.0.1:7890' }))

// SOCKS5 代理
setGlobalDispatcher(new ProxyAgent({ uri: 'socks5://127.0.0.1:1080' }))

// 此后所有 fetch 请求均通过代理
fetch('https://httpbin.org/ip').then(res => res.json()).then(console.log)
```

### 请求中断

```ts
import AbortController from 'abort-controller'
import { request } from 'undici'

const controller = new AbortController()
request('http://localhost:3000', { signal: controller.signal })
  .catch(err => console.error(err.name)) // 捕获 RequestAbortedError

controller.abort() // 主动中断
```

## 使用场景

- **高性能后端服务**

  - **API 网关/微服务**：高并发下保持低延迟，连接池复用降低资源消耗
  - **实时数据处理**：流式响应支持即时处理大文件或持续数据流（如日志分析）

- **爬虫与数据抓取**

  - **批量请求优化**：管道化（Pipeline）模式显著提升网页抓取效率

- **代理与中间件**

  - **全局代理**：通过 ProxyAgent 统一管理出口流量，无需修改业务代码

- **资源受限环境**

  - **低内存占用**：适合 IoT 设备或嵌入式系统
