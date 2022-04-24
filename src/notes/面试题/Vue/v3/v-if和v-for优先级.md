---
title: v-if和v-for优先级
createTime: 2022/04/24 01:33:45
author: pengzhanbo
permalink: /note/interview-question/45rxs5yv/
---

::: tip 提问
1. vue3 中 `v-if` 和 `v-for` 哪个优先级高？
2. 两个同时使用时，该如何优化？
:::

## 优先级

当 `v-if` 和 `v-for` 同时使用时， `v-if` 的优先级总是 高于 `v-for`。

这是 vue3 和 vue2 的其中一个重要的区别点。

## 优化

同时使用时，由于优先级的原因，总是先执行判断，确认条件为 true是，才进行渲染和执行循环。

如果需要对 列表中的每一项做条件判断：

- 在 `v-if` 所在的列表项外部包裹 一个 `<template>`， 在 `template` 上定义 `v-for` 和 `key`
- 提前使用 computed 属性 过滤掉不需要的列表项，避免在模板渲染中不必要的判断和渲染
