---
url: /interview-question/ffvuo8ul/index.md
---
[![vue@3](https://img.shields.io/badge/vue-%403-brightgreen)](https://staging-cn.vuejs.org/)

::: tip 提问
简述一下 vue3 的组件生命周期
:::

## 生命周期

### 选项式

1. `beforeCreate` 在组件实例初始化完成之后立即调用。
2. `created` 在组件实例处理完所有与状态相关的选项后调用。
3. `beforeMount` 在组件被挂载之前调用。
4. `mounted` 在组件被挂载之后调用。
5. `beforeUpdate` 在组件即将因为一个响应式状态变更而更新其 DOM 树之前调用。
6. `updated` 在组件即将因为一个响应式状态变更而更新其 DOM 树之后调用。
7. `beforeUnmount` 在一个组件实例被卸载之前调用。
8. `unmounted` 在一个组件实例被卸载之后调用。
9. `errorCaptured` 在捕获了后代组件传递的错误时调用。

### 组合式

1. `onMounted()` 注册一个在组件挂载完成后执行的回调函数。
2. `onUpdated()` 注册一个回调函数，在组件由于响应性状态改变而更新了 DOM 树后调用。
3. `onUnmounted()` 注册一个要在组件卸载后调用的回调。
4. `onBeforeMount()` 注册一个钩子在组件被挂载之前被调用。
5. `onBeforeUpdate()` 注册一个钩子，在组件因为响应式状态改变而要更新 DOM 树之前调用
6. `onBeforeUnmount()` 注册一个钩子，在组件实例被卸载之前调用。
7. `onErrorCaptured()` 注册一个钩子，当从下级组件抛上来的错误被捕获时被调用。
