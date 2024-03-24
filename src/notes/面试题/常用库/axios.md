---
title: axios
createTime: 2022/04/17 11:38:09
author: pengzhanbo
permalink: /interview-question/7fmfc0hi/
---

[axios](https://github.com/axios/axios)

::: tip 提问

1. 简单介绍一下 axios
2. axios拦截器是如何实现的？
:::

## axios

axios 是一个基于 promise 的 HTTP库，可以在浏览器和nodejs中使用。

### 特性

- 从浏览器中创建 XMLHttpRequests
- 从 nodejs 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防御 XSRF

## 拦截器实现

axios的拦截器分为 请求体拦截器 和 响应体拦截器，

- 请求体拦截器： 在请求发送前，进行拦截，在拦截的回调中可以对请求体数据进行 同步或异步处理，
  并返回一个处理后的 请求体数据 或者 由 promise 包装的 请求体数据。

- 响应体拦截器： 在请求成功收到响应后，进入响应回调前，进行拦截，在拦截的回调中可以响应体数据进行同步或异步处理，
  并返回一个处理后的响应体数据或者 由 promise 包装的响应期数据

两个拦截器的实现思路是相同的。本质上是定义了一个拦截器队列 `handlers`，当使用 `use()` 方法时，

`use()` 方法接受两个参数： `fulfilled` 和 `rejected` 函数，
参数以 `{ fulfilled, rejected }` 的形式推送到 `handlers` 的尾部。

``` js
class Interceptor {
  constructor() {
    this.handlers = []
  }
  use(fulfilled, rejected) {
    this.handlers.push({ fulfilled, rejected })
    return this.handlers.length - 1
  }
}
```

在发起请求前，初始化一个 promise, 并直接返回 请求体数据`requestConfig`,
同时以 请求对象实例，初始化一个 promise 队列 `[dispatchRequest, undefined]`

``` js
let promise = Promise.resolve(requestConfig)
// dispatchRequest，即一个 实例化后封装的 XMLHttpRequests，返回一个 promise.resolve(response)
const chain = [dispatchRequest, undefined]
```

然后将 请求拦截器 的 `handlers` 按顺序，以 `fulfilled, rejected` 添加到 `chain` 的头部，
将 响应拦截器 的 `handlers` 按顺序，以 `fulfilled, rejected` 添加到 `chain` 的尾部。

最后将得到 chain 数组，作为参数，循环传入 promise.then 的链式调用中,

``` js
while (chain.length) {
  promise = promise.then(chain.shift(), chain.shift())
}
```

即， 拦截器的本质上是在 请求实例的 promise 上，在其前后添加 promise实例，然后依次，将上一个promise的结果
作为参数，传入到下一个promise中。 这也是 拦截器 为什么支持 同步函数和异步函数的原因。
