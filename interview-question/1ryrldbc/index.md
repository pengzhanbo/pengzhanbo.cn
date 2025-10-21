---
url: /interview-question/1ryrldbc/index.md
---
[![vue@2](https://img.shields.io/badge/vue-%402-brightgreen)](https://cn.vuejs.org/)

::: tip 提问
vue2 有多少种组件通信方式？
:::

## 组件通信方式

在 vue中，组件通信的类型，大致可以分为以下几种：

* 父子组件间通信
* 兄弟组件间通信
* 隔代组件间通信

### 1. props/$emit

父组件通过 `props` 将数据传给子组件， 子组件通过 `$emit` 将数据更新通知给父组件。

适用场景：

* 父子组件间通信

### 2. Event Bus

通过 事件总线，通过事件派发将数据更新通知给添加了对应的事件监听的组件。

如，使用一个 空的 Vue实例，通过 `vm.$on` 注册事件监听，通过 `vm.$emit` 触发事件;
或者 自定义实现一个 `EventEmitter`

适用场景：

* 父子组件间通信
* 兄弟组件间通信
* 隔代组件间通信

### 3. provide/inject

通过 在一个祖先组件上 使用 `provide` 为其所有后代组件注入依赖， 在其所有后代组件中，都可以使用 `inject` 来获取到对应的数据。

但 `provide/inject` 的绑定并不是可响应的，可以通过 `Vue.observer` 来优化并提供响应对象

`provide/inject` 需要配合使用。

适用场景：

* 父子组件间通信
* 隔代组件间通信

### 4. $attr / $listener

`$attr` 包含了父作用域中所有不被 props 识别的特性绑定，这些特性可以通过 `v-bind="$attr"` 传入内部组件，
通常配合组件的 `inheritAttrs` 选项一起使用

`$listener` 包含了父作用域中的 `v-on`的事件侦听器（不包含 `.native` 修饰的）。
它可以通过 `v-on="$listener"` 传入内部组件

适用场景：

* 父子组件间通信
* 隔代组件间通信 （多级嵌套的场景）

### 5. $parent / $children / ref

* `ref`: 如果是普通DOM元素上使用，引用指向DOM元素，如果是用在子组件，则引用指向子组件实例
* `parent/$children` 访问父/子 实例

这种方式可以直接拿到 父/子 实例，即可以对 `父/子` 进行任意操作。

（虽然可以用于通信，除非父子组件明确是强耦合的，否则不建议使用)

适用场景：

* 父子组件间通信

### 6. Vuex

Vuex 实现了单向数据流，通过在 全局维护一个 根状态来存放数据。
组件可以通过 `getters` 获取状态数据， 通过 `dispatch` 调用 `action` 触发 `mutation` 更新状态数据。
可以将状态根据某种维度划分为各个模块

适用场景：

* 父子组件间通信
* 兄弟组件间间通信
* 隔代组件间通信
