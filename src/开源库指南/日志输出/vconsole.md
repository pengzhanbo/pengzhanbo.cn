---
title: vconsole
createTime: 2024/05/05 11:59:39
permalink: /fe-oss/vconsole/
---

<Badge text="Browser" /> <Badge text="微信小程序" />

<RepoCard repo="Tencent/vConsole" />

## 概述

一个轻量、可拓展、针对手机网页的前端开发者调试面板。

vConsole 是框架无关的，可以在 Vue、React 或其他任何框架中使用。

现在 vConsole 是微信小程序的官方调试工具。

## 场景

在移动端设备中调试网页是一件比较麻烦的事情，因为缺少了浏览器的调试面板，我们很难直观的看到代码执行发生了
什么错误。

vConsole 旨在解决这个问题，它在页面中注入了一个面板，模拟了浏览器的调试面板，让你可以直观的看到网页的执行情况。
比如 元素、网络请求、日志输出等等。

## 安装

::: npm-to

```sh
npm install vconsole
```

:::

## 使用

```ts
import VConsole from 'vconsole'

const vConsole = new VConsole()
// 或者使用配置参数来初始化，详情见文档
const vConsole = new VConsole({ theme: 'dark' })

// 接下来即可照常使用 `console` 等方法
console.log('Hello world')

// 结束调试后，可移除掉
vConsole.destroy()
```

## 从 CDN 加载

```html
<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
<script>
  // VConsole 默认会挂载到 `window.VConsole` 上
  var vConsole = new window.VConsole();
</script>
```

可用的 CDN：

- <https://unpkg.com/vconsole@latest/dist/vconsole.min.js>
- <https://cdn.jsdelivr.net/npm/vconsole@latest/dist/vconsole.min.js>

## 手机预览

:::center
<http://wechatfe.github.io/vconsole/demo.html>

![qrcode](https://github.com/Tencent/vConsole/raw/dev/doc/screenshot/qrcode.png)
:::

## 效果图

日志输出：

![vconsole 1](https://github.com/Tencent/vConsole/raw/dev/doc/screenshot/overview_light.jpg)

![vconsole 2](https://github.com/Tencent/vConsole/raw/dev/doc/screenshot/plugin_log_types.jpg)

网络请求：

![vconsole 3](https://github.com/Tencent/vConsole/raw/dev/doc/screenshot/plugin_network.jpg)

元素：

![vconsole 4](https://github.com/Tencent/vConsole/raw/dev/doc/screenshot/plugin_element.jpg)
