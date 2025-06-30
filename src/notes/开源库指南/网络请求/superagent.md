---
title: superagent
createTime: 2024/09/17 11:33:00
permalink: /fe-oss/superagent/
---

<Badge text="NodeJS" /> <Badge text="Browser" />

<RepoCard repo="ladjs/superagent" />

## 概述

Superagent 是一个轻量级、渐进式的JavaScript HTTP客户端库，适用于Node.js和浏览器环境。它由TJ Holowaychuk创建，以链式语法设计为核心，提供灵活、可读性强的API，大幅简化HTTP请求处理流程。

### 特性

- 跨平台支持：在Node.js（基于HTTP模块）和浏览器（基于XMLHttpRequest）中保持一致的API设计
- 轻量与高性能：无冗余依赖，压缩后仅约6KB，支持Promise、async/await和回调函数等多种异步模式
- 插件生态：可通过中间件扩展功能（如缓存控制、请求重试）
- 自动化数据处理：内置对JSON、表单数据、文件上传（multipart/form-data）的序列化与解析，支持自定义内容类型

## 安装

::: npm-to

```sh
npm install superagent
```

:::

## 使用

### 基础示例

GET 请求

```ts
import superagent from 'superagent'

// 链式写法
superagent
  .get('https://api.example.com/data')
  .query({ page: 2, limit: 10 }) // 生成URL: ?page=2&limit=10
  .set('User-Agent', 'MyApp/1.0')
  .then(res => console.log(res.body))
  .catch(err => console.error(err))
```

POST 请求

```ts
superagent
  .post('https://api.example.com/users')
  .send({ name: 'Alice', age: 30 }) // 自动序列化为JSON
  .set('Content-Type', 'application/json')
  .end((err, res) => {
    if (err)
      throw err
    console.log(res.status, res.body)
  })
```

### 表单提交

```ts
superagent
  .post('/login')
  .type('form') // 设置Content-Type为application/x-www-form-urlencoded
  .send({ user: 'admin', password: 'secret' }) // 编码为: user=admin&password=secret
  .then(res => console.log(res.text))
```

### 文件上传

```ts
import fs from 'node:fs'

superagent
  .post('/upload')
  .attach('file', fs.readFileSync('./image.png'), 'image.png')
  .then(res => console.log(res.body))
```

### 流式处理

```ts
const request = superagent.post('/api')
fs.createReadStream('largefile.zip').pipe(request)
```

### 错误处理和超时

```ts
superagent
  .get('/api')
  .timeout(5000) // 5秒超时
  .then((res) => { /* ... */ })
  .catch((err) => {
    if (err.timeout)
      console.error('请求超时')
    else console.error('服务器错误')
  })
```

## 使用场景

- 爬虫开发：

  - 模拟浏览器请求头（如User-Agent、Referer）绕过反爬机制，爬取动态网页内容。
  - 链式查询参数拼接与响应解析（HTML/JSON）简化数据提取

- 前后端API交互
- 微服务通信：服务间轻量级HTTP调用，支持文件流传输降低内存占用
