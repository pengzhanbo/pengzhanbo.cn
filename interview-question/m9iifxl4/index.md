---
url: /interview-question/m9iifxl4/index.md
---
[![vue@2](https://img.shields.io/badge/vue-%402-brightgreen)](https://cn.vuejs.org/)

::: tip 提问

1. 简述下vue组件的生命周期

:::

## 生命周期

1. `beforeCreate` 在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用。

2. `created` 在实例创建完成后被立即同步调用。

   实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。

3. `beforeMount` 在挂载开始之前被调用：相关的 render 函数首次被调用。

4. `mounted` 实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。

   `mounted` 不会保证所有的子组件也都被挂载完成。

5. `beforeUpdate` 在数据发生改变后，DOM 被更新之前被调用。

6. `updated` 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。

7. `activated` 被 keep-alive 缓存的组件激活时调用。

8. `deactivated` 被 keep-alive 缓存的组件失活时调用。

9. `beforeDestroy` 实例销毁之前调用。在这一步，实例仍然完全可用。

10. `destroyed` 实例销毁后调用。

11. `errorCaptured` 在捕获一个来自后代组件的错误时被调用。
