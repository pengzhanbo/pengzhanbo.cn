---
title: v-if和v-show的区别
createTime: 2022/04/23 01:46:42
author: pengzhanbo
permalink: /interview-question/nx0xqyp5/
---

::: tip 提问
1. `v-if` 和 `v-show` 有什么共同点？
2. 有什么区别？
3. 该如何选择使用哪个？
:::

## 共同点

- 都是 Vue的内置指令
- 都能控制元素的 显示和隐藏

## 区别

- `v-show` 是通过控制 元素 的 `display`， 通过设置为 `none` 来实现元素的隐藏，
  初始值无论是true或false，都会进行编译，且只会编译一次，后续状态变更仅改变 `display`的值。
  频繁切换开销比较小。

- `v-if` 是 动态的向 DOM树中插入和删除DOM元素，若初始值为 false，则跳过编译。
  后续状态变更，每次都会重新向 DOM树中插入或删除DOM元素。
  频繁切换开销比较大。

## 选择

- 对于不需要频繁切换状态的，选择使用 `v-if`
- 对于频繁切换状态的，选择使用 `v-show`。

