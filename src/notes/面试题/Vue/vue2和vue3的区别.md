---
title: vue2和vue3的区别
createTime: 2022/04/24 02:44:44
author: pengzhanbo
permalink: /note/interview-question/2o905emj/
---

::: tip 提问
vue2和vue3的区别
:::

## 区别

- 响应式原理

  vue2 通过 `Object.defineProperties()` 实现数据劫持，结合 发布/订阅模式，将数据变更通知给Watcher，实现响应式。
  vue3 通过 `Proxy` 做数据劫持，实现响应式对象，同时也保留了 `getter/setter` 实现 `ref()`。

- 使用 工厂函数 `createApp()` 代替 构造函数 `new Vue()` 创建应用实例
- 使用 `app.config.globalProperties` 代替 `Vue.prototype` 用于添加全局属性
- 移除了 `Vue.extend`
- `v-model` 使用 `modelValue/emit` 代替了 `value/input` 的实现
- `key` 现在不需要添加在 `v-if` `v-else` `v-else-if` 上，Vue会自己生成，且可以添加在 `<template>` 上。
- `v-if` 的优先级总是高于`v-for` （vue2是反过来的）
- 移除了 `filter` 过滤器
- 自定义指令使用了全新的生命周期
- 移除了 `$children`
- 将 `$listener` 合并到了 `$attrs` 中, `$attrs` 也包含了 `class` 和 `style`
- 使用 `beforeUnmount` 和 `unmounted` 代替 `beforeDestroy` 和 `destroyed`
- 新增了 `setup()` 以及 组合式API
- 新增内置组件 `<Teleport>` 和 `<Suspense>`
