---
title: computed和watch
createTime: 2022/04/23 05:36:27
author: pengzhanbo
permalink: /interview-question/y6r9lfa3/
---

::: tip 提问
`computed` 和 `watch` 的区别
:::

## 区别

- `computed` 是 计算一个新的属性，并将该属性挂载到 组件实例上。
- `watch` 是 监听已经存在且挂载在 组件实例上的数据， watch通过可以监听 计算属性。
- `computed` 是一个惰性求值的观察者，具有缓存性，只有第一次访问 computed属性,或者当依赖发生变化，，才会计算新的值。
- `watch` 是当监听的数据发生变化后，就会执行监听函数
