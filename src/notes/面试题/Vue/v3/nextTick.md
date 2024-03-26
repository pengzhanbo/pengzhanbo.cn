---
title: nextTick
author: 鹏展博
createTime: 2022/04/25 19:28:09
permalink: /interview-question/e3adhfty/
---

::: tip 提问

1. nextTick 是什么？
2. nextTick 的实现原理？
3. nextTick 的作用？

:::

## 分析

此题考查 对 `vue` 异步更新队列的理解。

## 回答

> **官方定义：**
>
> 当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。
>
> nextTick() 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。

1. nextTick是Vue提供的一个全局API，由于vue的异步更新策略导致我们对数据的修改不会立刻体现在dom变化上，此时如果想要立即获取更新后的dom状态，就需要使用这个方法。

2. 当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，
   直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。
   本质上， nextTick 会被添加到 队列的最后再执行，而如果队列为空，则 nextTick 就是一个 普通的 promise 。

3. 当需要在数据发生变更后，立即获取更新后的dom状态、修改dom时，可以使用 nextTick() 方法。
