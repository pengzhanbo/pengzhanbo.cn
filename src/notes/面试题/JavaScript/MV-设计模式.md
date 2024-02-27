---
title: MVC/MVP/MVVM
createTime: 2022/04/20 02:32:11
author: pengzhanbo
permalink: /interview-question/ud3m8zxg/
---

::: tip 提问
1. MVC
2. MVP
3. MVVM
4. 区别
:::

::: info 说明
以上架构设计模式，仅限于在前端领域内进行说明
:::

## Model&View

- `Model` 是用于封装应用程序的业务逻辑的相关数据以及对数据的处理方法。

- `View` 作为视图层，主要负责数据的展示。

## MVC

`C` 是指 `Controller`。负责监听 `View` 的用户事件，得到数据后后 `Controller` 做一些处理，然后渲染 `View`。

`MVC` 通过分离 `Model`、`View` 和 `Controller` 的方式来组织代码结构。
`View` 和 `Model` 应用了观察者模式，当 `Model` 层发生改变的时候它会通知有关 View 层更新页面。
`Controller` 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，
`Controller` 中的事件触发器就开始工作了，通过调用 `Model` 层，来完成对 `Model` 的修改，然后 `Model` 层再去通知 View 层更新。

## MVP

`P` 是指 `Presenter`。`Presenter`会调用View层提供的接口去渲染Model。

`MVP` 模式中，View 层的接口暴露给了 `Presenter`， 
因此可以在 `Presenter` 中将 `Model` 的变化和 `View` 的变化绑定在一起，以此来实现 `View` 和 Model 的同步更新。
这样就实现了对 `View` 和 `Model` 的解耦，`Presenter` 还包含了其他的响应逻辑。

## MVVM

`VM` 是指 `ViewModel`。

`MVVM` 在`VM`中构建一组状态数据（state data），作为`View`状态的抽象。
然后通过 __双向数据绑定（data binding）__ 使`VM`中的 __状态数据（state data）__ 与`View`中的 __显示状态（screen state）__ 保持一致。
这样，`VM`中的展示逻辑只需要修改对应的状态数据，就可以控制`View`的状态，从而避免在`View`上开发大量的接口。
