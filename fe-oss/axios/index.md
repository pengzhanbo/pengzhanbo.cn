---
url: /fe-oss/axios/index.md
---
&#x20;

## 概述

\==Axios== 是一个基于 Promise 的异步 HTTP 客户端库，专为浏览器和 Node.js 设计。

::: tip Axios 以简洁的 API 设计、健壮的错误处理和多环境支持，成为现代 Web 开发中异步通信的标杆。
:::

### 特性

* 从浏览器创建 XMLHttpRequests
* 从 node.js 创建 http 请求
* 支持 Promise API
* 拦截请求和响应
* 转换请求和响应数据
* 取消请求
* 超时处理
* 查询参数序列化支持嵌套项处理
* 自动将请求体序列化为：
  * JSON (`application/json`)
  * Multipart / FormData (`multipart/form-data`)
  * URL encoded form (`application/x-www-form-urlencoded`)
* 将 HTML Form 转换成 JSON 进行请求
* 自动转换 JSON 数据
* 获取浏览器和 node.js 的请求进度，并提供额外的信息（速度、剩余时间）
  为 node.js 设置带宽限制
* 兼容符合规范的 `FormData` 和 `Blob`（包括 node.js）
* 客户端支持防御 `XSRF`

## 安装

::: npm-to

```sh
npm install axios
```

:::

从 CDN 加载:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 使用

### 基础示例

GET 请求

```ts
axios.get('/user', {
  params: { id: 123 } // 参数自动转为 ?id=123
}).then(({ data }) => {
  console.log(data)
})
```

POST 请求

```ts
axios.post('/login', {
  username: 'admin',
  password: 'securePassword' // 自动序列化为 JSON
})
```

### 拦截器

```ts
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
```

### 取消请求

```ts
const controller = new AbortController()

axios.get('/foo/bar', {
  signal: controller.signal
}).then((response) => {
  // ...
})
// 取消请求
controller.abort()
```

## 使用场景

* 各种类型的前端应用均适用
* Node.js 服务端通信
