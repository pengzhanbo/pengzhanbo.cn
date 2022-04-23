---
title: promise
createTime: 2022/04/17 05:53:48
author: pengzhanbo
permalink: /note/interview-question/a895fu8f/
---

::: tip 提问
1. 简单介绍一下 promise
2. 说一下 Promise A+ 规范
:::

参阅 [详解promise](/article/q40nq4hv)

## promise

promise 是一个 异步编程解决方案，提供了一种 链式调用的方法，以一种更为扁平的方式处理复杂异步编程场景。
在早期使用 异步回调函数时，经常容易出现 在异步回调中写异步回调的回调嵌套地域，导致代码拥冗难以阅读。

`Promise`是一个构造函数，用于创建一个新的 Promise 对象，该构造函数主要用于包装还没添加 promise支持的函数。

### 状态

promise创建后，必然出于一下三种状态之一：
- `pending` 待定状态
- `fulfilled` 操作成功
- `rejected` 操作失败

当状态从 `pending` 更新到另外一种状态后，就再也不能变更为其他状态。

### 实例方法

- `.then()` 接受两个函数参数 ，状态从 pending 更新到另一个状态时触发
- `.cache()` 接受一个函数参数，状态从 pending 更新到 rejected 时触发
- `.finally()` 只要状态发生变化，所有 then() 和 catch() 执行完成后，最后执行 finally

### 静态方法

- `resolve(value)` 返回一个 状态为给定的value决定的 promise实例
- `reject(reason)` 返回一个状态为失败的 promise 实例
- `all()` 传入一组promise实例并返回一个新的promise实例，当传入的promises状态均更新为成功时触发
  返回实例的状态更新为成功，否则更新为失败
- `allSettled()` 传入一组promise实例并返回一个新的promise实例，当传入的promises状态均更新到最终状态，
  触发返回实例promise的状态更新
- `race()` 传入一组promise实例并返回一个新的promise实例，只要传入的promises有一个状态更新的熬最终状态，
  触发返回实例promise的状态更新

## Promise A+ 规范

Promise A+ 规范 是 一个开放、健全且通用的 Javascript Promise标准。

规范不设计如何创建、解决和拒绝promise，而是专注于提供一个通用的then方法。
