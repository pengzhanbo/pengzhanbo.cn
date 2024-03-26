---
title: DOM节点操作
createTime: 2022/04/16 10:51:17
author: pengzhanbo
permalink: /interview-question/y5w6l1js/
---

::: tip 提问
如何添加、移除、移动、复制、创建、查找节点？
:::

## 创建节点

- `document.createDocumentFragment(node)` 创建一个虚拟节点对象
- `document.createElement(node)` 创建一个新的元素
- `document.createTextNode(text)` 创建一个文本节点

## 添加、移除、替换、插入

- `appendChild(node)` 在元素的末尾插入一个子元素
- `removeChild(node)` 删除元素中的指定的元素
- `replaceChild(newNode, oldNode)` 使用 newNode 替换 oldNode
- `insertBefore(newNode, node)` 在 node元素之前插入一个 newNode

## 查找

- `getElementById(id)`
- `getElementsByName(name)`
- `getElementsByTagName(tagName)`
- `getElementsByClassName(className)`
- `querySelector(selector)`
- `querySelectorAll(selector)`

## 属性操作

- `getAttribute(key)`
- `setAttribute(key, value)`
- `hasAttribute(key)`
- `removeAttribute(key)`
