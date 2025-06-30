---
title: ofetch
createTime: 2024/09/12 13:14:56
permalink: /fe-oss/ofetch/
---

<Badge text="NodeJS" /> <Badge text="Browser" /> <Badge text="Workers" />

<RepoCard repo="unjs/ofetch" />

## 概述

ofetch 是由 UnJS 团队开发的增强版 Fetch API 库，基于 TypeScript 实现，兼容 Node.js、浏览器和 Web Workers 环境。
它在原生 fetch 的基础上引入了 **智能响应处理**、**错误自动抛出**、**请求拦截** 等特性，同时保留了轻量级（约 4KB）和类型安全的优势。

### 特性

- 智能响应解析：自动处理 JSON、文本、二进制等响应类型，无需手动调用 .json() 等方法
- 全局拦截器：支持 onRequest、onResponse 和 onError 拦截器，用于统一添加请求头、处理错误或日志
- 自动错误处理：非 2xx 响应状态码自动抛出错误，并附带结构化错误信息（如 error.data 和 error.status）
- TypeScript 原生支持：提供完整的类型定义，支持请求/响应类型推断
- 多环境兼容：在 Node.js 中基于 node-fetch-native 实现，浏览器端复用原生 Fetch API

## 安装

::: npm-to

```sh
npm install ofetch
```

:::

## 使用

### 基础示例

```ts
import { ofetch } from 'ofetch'

// 自动解析 JSON 响应
const data = await ofetch('https://api.example.com/users')

// 处理二进制数据（如图片）
const imageBlob = await ofetch('/api/avatar', {
  responseType: 'blob'
})
```

### 全局配置与拦截器

```ts
const customFetch = ofetch.create({
  baseURL: 'https://api.example.com',
  headers: { Authorization: 'Bearer TOKEN' },
  timeout: 5000, // 5 秒超时
  retry: 2, // 自动重试次数
  onRequest({ options }) {
    // 请求前添加逻辑
    options.headers.set('X-Request-Source', 'browser')
  }
})
```

### 错误处理

```ts
try {
  await ofetch('https://api.example.com/invalid')
}
catch (error) {
  console.error(`Status: ${error.status}`) // 输出状态码（如 404）
  console.error(`Data: ${error.data}`) // 输出错误响应体
}
```

## 使用场景

- Nuxt.js 应用：

  ofetch 是 Nuxt 的默认 HTTP 客户端（通过 $fetch）。可通过插件注入全局配置：

  ```ts
  // plugins/fetch.js
  export default defineNuxtPlugin(() => {
    const { apiToken } = useRuntimeConfig().public
    globalThis.$fetch = ofetch.create({
      headers: { Authorization: `Bearer ${apiToken}` }
    })
  })
  ```

- 全栈 JavaScript 项目：

  在 Node.js 后端服务中替代 axios 或 node-fetch，实现前后端请求逻辑统一

- 轻量级前端应用：

  对包体积敏感的项目，ofetch 的轻量化优势明显
