---
url: /interview-question/rumwg3ew/index.md
---
[![vue@2](https://img.shields.io/badge/vue-%402-brightgreen)](https://cn.vuejs.org/)

::: tip 提问
在vue2的组件中，data为什么必须是一个函数
:::

## data

因为一个组件可能会产生多个组件实例，而每个组件实例都应该拥有私有的数据空间，
也就是说每个组件实例的data应该是相互独立的。

将 `data` 使用函数的形式返回一个对象，这样每个组件实例都会获取一个新的 数据对象。
