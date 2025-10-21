---
url: /interview-question/9zwkibho/index.md
---
[![vue@2](https://img.shields.io/badge/vue-%402-brightgreen)](https://cn.vuejs.org/)

[![vue-router@3](https://img.shields.io/badge/vue--router-%403-brightgreen)](https://v3.router.vuejs.org/zh/)

::: tip

1. 路由的历史模式有哪些？有什么不同？
2. 路由的导航守卫
3. 导航守卫的解析流程（执行顺序）

:::

## 历史模式

1. Hash 模式

   使用 URL 的 `hash` 来模拟一个完整的 URL， 当 `hash` 改变时，页面不会重新加载

2. History 模式

   使用 `history.pushState` API 来完成 URL 而无需页面重新加载。

   History 模式需要后端服务器进行配置以提供支持。通过特定的规则，将路径重定向到 一个特定的页面路径。

## 导航守卫

路由的导航守卫 主要是用来 通过跳转和取消的方式守卫导航。

导航守卫 包括：

* `beforeEach`

  全局前置守卫。 在导航被确认之前调用。

* `beforeResolve`

  全局解析守卫。 在导航被确认之前，同时所有组件内守卫和异步路由组件被解析之后 调用。

* `afterEach`

  全局后置钩子. 在导航被确认之后调用。

* 路由独享守卫

  在路由配置上定义 `beforeEnter`。 在进入当前路由之前被调用。

* 组件内守卫

  * `beforeRouteEnter` 渲染该组件的对应路由被 confirm 前调用
  * `beforeRouteUpdate` 当前路由改变，但是该组件被复用时调用
  * `beforeRouteLeave` 导航离开该组件的对应路由时调用

## 导航守卫的解析流程

1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
