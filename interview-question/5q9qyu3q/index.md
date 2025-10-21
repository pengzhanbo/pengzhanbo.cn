---
url: /interview-question/5q9qyu3q/index.md
---
[![vue@3](https://img.shields.io/badge/vue-%403-brightgreen)](https://staging-cn.vuejs.org/)

::: tip 提问

1. 什么是指令？
2. 如何自定义指令？

:::

## 指令

指令是用于 封装对于底层DOM元素的操作。

## 自定义指令

使用 `app.directive` 注册全局指令， 或者 组件实例的 `directives` 注册局部指令。

::: warning 提示
自定义指令的钩子， vue3 和 vue2 是完全不同的。
:::

指令提供了七个钩子函数：

* `created` 在绑定元素的 attribute 前
* `beforeMount` 在元素被插入到 DOM 前调用
* `mounted` 在绑定元素的父组件 及他自己的所有子节点都挂载完成后调用
* `beforeUpdate` 绑定元素的父组件更新前调用
* `updated` 在绑定元素的父组件 及他自己的所有子节点都更新后调用
* `beforeUnmount` 绑定元素的父组件卸载前调用
* `unmounted` 绑定元素的父组件卸载后调用
