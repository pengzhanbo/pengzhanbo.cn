---
url: /interview-question/6x9ta62c/index.md
---
[![vue@2](https://img.shields.io/badge/vue-%403-brightgreen)](https://cn.vuejs.org/)

[![vue-router@3](https://img.shields.io/badge/vue--router-%404-brightgreen)](https://v3.router.vuejs.org/zh/)

::: tip 提问

1. `vue-route@4` 和 `vue-router@3`有什么区别？

:::

## 区别

以下是主要变化：

* 使用 `createRouter()` 代替 `new Router()`

*

* 使用 `history` 配置 代替 `mode` 配置

  使用 `createHashHistory()` 代替 `hash` ，使用 `createWebHistory()` 代替 `history`;
  新增了 `createMemoryHistory()` 用于非浏览器环境（如SSR时）。

* 新增 组合式API

  * `useRouter()` 获取路由实例
  * `useRoute()` 获取当前路由地址
  * `onBeforeRouteUpdate()` 导航守卫，在当前位置即将更新时触发
  * `onBeforeRouteLeave()` 导航守卫，在即将离开当前位置时触发
