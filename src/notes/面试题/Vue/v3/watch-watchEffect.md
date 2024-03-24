---
title: watch-watchEffect
author: 鹏展博
createTime: 2022/04/25 22:19:38
permalink: /interview-question/6lud0xnd/
---

::: tip 提问

1. watch 是什么？
2. watchEffect 是什么？
3. watch 和 watchEffect 有什么异同？
:::

## 分析

本题考查对 vue 中 watch 和 watchEffect 的理解，实现原理等。

### 回答策略

1. 两个的定义
2. 使用场景的差异
3. 简述原理

## 回答

1. `watchEffect` 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。
2. `watch` 侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。
3. `watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：
   1. `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
   2. `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。
   3. 从实现上看，`watchEffect(fn, options)` 相当于 `watch(fn, null, options)`
