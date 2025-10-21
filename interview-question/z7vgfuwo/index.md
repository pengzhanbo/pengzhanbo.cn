---
url: /interview-question/z7vgfuwo/index.md
---
[![vue@2](https://img.shields.io/badge/vue-%402-brightgreen)](https://cn.vuejs.org/)

::: tip 提问

1. 什么是指令？
2. 如何自定义指令？

:::

## 指令

指令是用于 封装对于底层DOM元素的操作。

## 自定义指令

使用 `Vue.directive()` 注册全局自定义指令，也可以在 组件示例的 directives 注册局部自定义指令。

指令提供了五个钩子函数

* `bind` 指令第一次绑定到元素时调用
* `inserted` 被绑定元素第一次插入到父节点时调用
* `update` 所在组件的 VNode 更新时调用
* `componentUpdated` 指令所在组件的VNode及其子VNode全部更新后调用
* `unbind` 指令与元素解绑时调用，只调用一次。
