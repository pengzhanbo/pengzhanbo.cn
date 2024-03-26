---
title: ➖ ChainableOptions
createTime: 2022/12/01 04:28:55
author: pengzhanbo
permalink: /type-challenges/medium/chainable-options/
---

::: info 题目
Github: [Chainable options](https://github.com/type-challenges/type-challenges/blob/main/questions/00012-medium-chainable-options/)

在 `JavaScript` 中我们经常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 `TypeScript` 中，你能合理的给它赋上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - `Interface`, `Type` 或 `Class` 都行。你需要提供两个函数 `option(key, value)` 和 `get()`。在 `option` 中你需要使用提供的 `key` 和 `value` 扩展当前的对象类型，通过 `get` 获取最终结果。

```ts
declare const config: Chainable

const result = config.option('foo', 123).option('name', 'type-challenges').option('bar', { value: 'Hello World' }).get()

// 期望 result 的类型是：
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
```

你只需要在类型层面实现这个功能 - 不需要实现任何 `TS/JS` 的实际逻辑。

你可以假设 `key` 只接受字符串而 `value` 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 `key` 只会被使用一次。

:::

### 解题思路

知识点：

- 泛型参数类型约束
- 泛型参数默认值
- 串联函数 返回递归类型
- 条件类型推断

::: details Answer

```ts
type Chainable<T extends Record<PropertyKey, unknown> = {}> = {
  option<K extends PropertyKey, V>(
    key: K extends keyof T ? (V extends T[K] ? never : K) : K,
    value: K extends keyof T ? T[K] : V,
  ): Chainable<Omit<T, K> & { [P in K]: V }>
  get(): T
}
```

:::
