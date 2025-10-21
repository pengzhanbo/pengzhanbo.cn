---
url: /interview-question/lkriz1wa/index.md
---
[![vue@3](https://img.shields.io/badge/vue-%403-brightgreen)](https://staging-cn.vuejs.org/)

::: tip 提问

1. 简单介绍一下Vue的响应式原理
2. vue2 和 vue3 的响应式对象有什么区别？

:::

## Vue 响应式原理

在 javascript 中，有两种劫持属性访问的方式： `getter/setter` 和 `Proxies`。
在`Vue3` 中，使用了 `Proxy` 来创建响应式对象。

* 在 Vue中，跟数据关联的其他操作行为，被称为`副作用 effect`，Vue内部会维护一个使用 `WeakMap` 定义的副作用队列，
  将副作用订阅都存储在其中。

  ```ts
  WeakMap<target, Map<key, Set<effect>>>
  ```

* 在 数据的 `getter` 方法中，使用 `track` 函数检查是否有正在运行的副作用，然后将这个副作用添加到该数据的订阅者 `Set` 中。

* 在数据的 `setter` 方法中，当数据发生改变，则找到该数据的所有订阅的副作用，然后一一执行这些副作用。

* 对于组件实例，将DOM渲染也认为是副作用的一种，数据更新时，同样会去执行这个副作用。

## Vue3 和 Vue2 实现响应式原理的区别

* 相比于 Vue2， Vue3的由于采用了 `Proxy`的方式来实现响应式对象，
  响应式数据能够检测到响应式对象的属性的添加和删除

* 使用`WeakMap`数据结构来保存响应式对象的副作用，在响应式对象没有再被引用时，能够及时的被垃圾回收，减少内存开销。
