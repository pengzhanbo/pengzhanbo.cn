---
url: /fe-oss/eruda/index.md
---
## 概述

[**eruda** 官方文档](https://eruda.liriliri.io/zh/docs/){.read-more}

与 [vconsole](./vconsole.md) 类似，在页面中注入控制面板，适合在移动设备调试网页时使用。

![eruda](https://camo.githubusercontent.com/d0f6d8eb7aa3c04da21dde1b137049ad3439a7ca17bac6628aa4166a42551dba/68747470733a2f2f65727564612e6c6972696c6972692e696f2f73637265656e73686f742e6a7067)

## 场景

在移动端设备中调试网页是一件比较麻烦的事情，因为缺少了浏览器的调试面板，我们很难直观的看到代码执行发生了
什么错误。

eruda 旨在解决这个问题，它在页面中注入了一个面板，模拟了浏览器的调试面板，让你可以直观的看到网页的执行情况。
比如 元素、网络请求、日志输出等等。

## 安装

::: npm-to

```bash
npm install eruda
```

:::

## 使用

```html
<script src="node_modules/eruda/eruda.js"></script>
<script>eruda.init();</script>
```

或者使用动态引入：

```ts
if (import.meta.env.MODE === 'development') {
  import('eruda').then(eruda => eruda.default.init())
}
```

## 预览

::: center

<https://eruda.liriliri.io/>

![preview](https://eruda.liriliri.io/qrcode.png)
:::

## 对比

与 [vconsole](./vconsole.md) 相同，都是在页面中注入控制面板，支持在移动设备调试网页。

eruda 还可以通过插件添加更多的功能，比如添加 `vue` 调试面板，当有个性的需求时，eruda 是个更好的选择。
