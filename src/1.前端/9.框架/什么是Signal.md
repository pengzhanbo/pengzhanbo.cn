---
title: 什么是 Signals ？
author: pengzhanbo
createTime: 2024/03/25 20:05:46
tags:
  - javascript
  - ESNext
permalink: /article/otymkumz/
---

2024年了，Signals 在前端框架中越来越成为主流的底层技术依赖。
大概是从哪个框架开始兴起的，我有些忘记了，我映像中最早推动并流行的是 `SolidJS`，
后来在 `Vue3` 中也引入了该技术，随后，如 `MobX`，`Preact`，`Qwik`，`Svelte`，`Angular` 等
也纷纷引入了该技术。

<!-- more -->

事实上，`Signals` 的提出比 `SolidJS`  还要早的多，早在 [2010年](https://blog.stevensanderson.com/2010/07/05/introducing-knockout-a-ui-library-for-javascript/)，
[Knockout](https://knockoutjs.com/) 便有了类似的实现。

因此，`Signals` 并不是 “新兴的、前沿的” 前端技术方案。相反，关于它的论证、实践和应用，都已经相当的成熟，
这也是 `Signals` 如今越来越受各种框架青睐的原因。

::: tip 说明
[TC39](https://tc39.es/) 新增了一个 Stage-0 的 [提案](https://github.com/proposal-signals/proposal-signals)，
计划将 `Signals` 整合到 JavaScript 标准中。
并邀请了 [Angular](https://angular.io/), [Bubble](https://bubble.io/), [Ember](https://emberjs.com/),
[FAST](https://www.fast.design/), [MobX](https://mobx.js.org/), [Preact](https://preactjs.com/),
[Qwik](https://qwik.dev/), [RxJS](https://rxjs.dev/), [Solid](https://www.solidjs.com/),
[Starbeam](https://www.starbeamjs.com/), [Svelte](https://svelte.dev/),
[Vue](https://vuejs.org/), [Wiz](https://blog.angular.io/angular-and-wiz-are-better-together-91e633d8cd5a)
等多个框架的作者或贡献者 参与讨论，共同推动该提案的实现。

听到这个消息我是挺兴奋的，这意味着当 `Signals` 正式成为 `ECMA` 的标准时，将会给我们的前端开发带来很大的便利。
特别是对于各大框架而言，使用 原生 `Signals` 可能会带来更大的性能提升，甚至有机会在不同的框架之间共享同一个 `Signals`，
带来更多的可能性。
:::

## 为什么是 Signals ?

在一个常见的场景中，我们需要实现一个计数器，并希望将当前计数器的值是奇数还是偶数 渲染到 页面上，
每当 计数器的值 发生改变，我们就会重新渲染页面。

当我们使用 原生 JavaScript 实现时：

```js
let counter = 0
const setCounter = (value) => {
  counter = value
  render()
}

const isEven = () => (counter & 1) == 0
const parity = () => isEven() ? 'even' : 'odd'
const render = () => element.innerText = parity()
// 模拟对计数器的外部更新...
setInterval(() => setCounter(counter + 1), 1000)
```

这看起来实现了需求，然而，这里面有存在很多问题：

- `counter` 状态与 渲染系统 紧密耦合；
- 如果 `counter` 发生了变化，但是 `parity` 没有变化（比如 `counter` 从 2 变化为 4），
  那么就会对 奇偶校验进行不必要的计算和不必要的渲染；
- 如果 UI 的另一个部分只想在 `counter` 变化时重新渲染该如何处理？
- 如果 UI 的另一个部分只依赖 `isEven` 或 `parity`，那么该如何处理？

即使在这种相对简单的情况下，很快就会出现许多问题。
我们可以尝试通过引入 **发布/订阅** 来解决这些问题。
这将允许 `counter` 的其他使用者可以订阅添加他们自己对状态更改的反应。

但是，我们仍然可能遇到更多的问题：

- 渲染函数 `render` 只依赖于 `parity`，然而实际上它需要订阅 `counter`。
- 如果不直接与 `counter` 交互，则无法仅基于 `isEven` 和 `parity` 更新 UI。
- 引入了 **发布/订阅** ，问题不再仅仅是调用函数和读取变量，而是 订阅 和在哪里进行更新，
  如何管理退订的问题也变得复杂。

我们通过添加 `发布/订阅` 来解决包括 `counter`、`isEven` 和 `parity` 在内的几个问题。
我们必须将 `isEven` 订阅到 `counter`, 将 `parity` 订阅到 `isEven`，将 `render` 订阅到 `parity`。
然后，这个示例代码的体积越来越大，我们深陷在大量的 订阅 中，如果我们没有正确的方式清理内容，这
可能将导致发生内存灾难。我们虽然解决了一些问题，却编写了大量的代码，引入了更多的问题。

### 引入 Signals

::: info
为便于理解，以下示例 使用 [solid-js](https://www.solidjs.com/docs/latest/api) API，其中：

- `[getter, setter] = createSignal(initial)`: 创建信号，返回一个包含 getter 和 setter 的数组。
- `createMemo(getter)`: 创建一个与给定函数的返回值相等的只读响应值。
- `createEffect(effect)`: 创建一个在其依赖关系发生变化时执行的副作用。
:::

为了理解 `Signals` ，让我们首先对上面的例子进行一些改造：

```ts
const [counter, setCounter] = createSignal(0)
const isEven = createMemo(() => counter() & 1 == 0)
const parity = createMemo(() => isEven() ? 'even' : 'odd')

createEffect(() => element.innerText = parity())

setInterval(() => setCounter(counter() + 1), 1000)
```

我们可以立即看到：

- 我们消除了 `counter` 不必要的耦合
- 使用统一的 API 来 处理值，计算 和 副作用
- `counter` 和 `render` 之间没有循环引用的问题
- 没有手动订阅，不需要记录依赖关系
- 可以控制副作用的调用时机

同时，Signals 带给我们的，不仅仅是表面看到的：

- **自动依赖跟踪**：计算出来的 Signal 会自动发现它所依赖的其它任何 Signal ，无论这些 Signal 是 简单值 还是其他 计算值。
- **延迟评估**：计算在声明时不会立即评估，也不会在依赖更新时立即重新评估。仅当显式请求该值时，才会评估他们。
- **记忆**：计算信号缓存其最后一个值，以便无论访问多少次，都不需要重新评估其依赖项中没有更改的计算。

## 什么是 Signals ?

`Signals`，即 信号，信号表示可能随时间变化的数据单元。
信号可以是“State”（只是一个手动设置的值）或“Computed”（基于其他信号的公式）。
它 通常被称为 `Signals`，也可以被称为  Observables，Atoms，Subjects 和 Refs 。

`Signals` 通常由 `getter`，`setter`，`value` 组成：

::: code-tabs
@tab solid-js

```ts
const [count, setCount] = createSignal(0)

// 读取 value
console.log(count()) // 0

// 设置 value
setCount(5);
console.log(count()) //5
```

:::

这看起来好像没有什么特别的地方，只是一个可以存储任意类型值的包装器。
但它的重点在于 `getter` 和 `setter` 可以运行在任意代码中，这对于更新的发布与订阅有很大的帮助。

也许你已经知道，在 Vue 中，它是使用 Object getter 或 Proxies 来实现：

::: code-tabs
@tab vue

```ts
const count = ref(0)

// 读取 value
console.log(count.value) // 0

// 设置 value
count.value = 5;
console.log(count.value) // 5
```

:::

或者，像 Svelte 那样，隐藏在编译器后面：

::: code-tabs
@tab svelte

```ts
let count = 0
// 读取 value
console.log(count) // 0

// 设置 value
count = 5
```

:::

**从本质上讲，信号是事件发射器。但主要区别在于订阅的管理方式。**

### Reactive

如果缺少其它与之相关的 Reactive, 单看 `Signals` 好像并没有什么特别。
`Reactive`，也可以被称为 `Effects` 、`Autoruns`、 `Watches` 或 `Computed` 。
`Reactive` 通过观察 `Signals`，在其发生更新时重新运行。

```ts
console.log('1. Create Signal')
const [count, setCount] = createSignal(0)

console.log('2. Create Reaction')
createEffect(() => console.log('The count is', count()))

console.log('3. Set count to 5')
setCount(5)

console.log('4. Set count to 10')
setCount(10)
```

**输出：**

```txt
1. Create Signal

2. Create Reaction
The count is 0

3. Set count to 5
The count is 5

4. Set count to 10
The count is 10
```

这看起来有点神奇，在 `setCount()` 后 立即执行了 `createEffect` 的回调函数。
这看起来并没有直接关联的地方，实际上，在 `createEffect` 回调函数中， 执行 `count()` 时自动
订阅了 `createEffect` 回调函数，每当 `count` 发生变化时，都会重新运行 `createEffect` 回调函数。

## 如何实现 Signals ?

TODO...

<!-- https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf -->
