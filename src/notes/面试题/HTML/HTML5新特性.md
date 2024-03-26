---
title: HTML5新特性
createTime: 2022/04/14 11:01:59
author: pengzhanbo
permalink: /interview-question/8dyy8lg6/
---

::: tip 提问

1. HTML5有哪些新特性？
2. 如何处理HTML5新标签的浏览器兼容?
   :::

## 新特性

- 媒介 video和 audio 元素
- 绘画 canvas
- 本地离线存储 localStorage、sessionStorage
- 语义化标签：article,footer,header,nav,section,aside,表单控件等
- Web Worker
- Web Socket

等

## HTML5 新标签的浏览器兼容方案

在 IE 6/7/8 中，支持通过 `document.createElement` 方法产生标签，可以利用这个特性
让这些浏览器支持 hTML5标签，同时还需要为标签添加默认样式。
