---
title: ✔️ Awaited
createTime: 2022/12/01 04:16:56
author: pengzhanbo
permalink: /type-challenges/easy/awaited/
---

::: info 提问
Github: [Awaited](https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/)

假如我们有一个 `Promise` 对象，这个 Promise 对象会返回一个类型。在 `TS` 中，我们用 `Promise` 中的 `T` 来描述这个 `Promise` 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

``` ts
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```
:::


### 解题思路

这个挑战中，需要对类型 `Promise<ExampleType>` 进行展开，**展开** 指的是，从一个类型中提取其内部的类型。
在 typescript 中，可以通过 **条件类型的类型推断**，将推断结果赋值给 类型参数，这里需要借助 关键词 `infer`。
需要注意的是，条件类型的类型推断，只能在条件分支为 `true` 中可以使用 类型参数。

在题目的示例中，`Promise<string>` 展开类型为 `string` ，但我们需要处理 `T` 的任意情况，包括 `<Promise<Promise<string>>`。这时候还需要运用到 typescript 的 **类型递归**，直到不能展开为止，这个过程是调用
`MyAwaited`自身实现的。


### 答案

```ts
type MyAwaited<T> = T extends PromiseLike<infer R>
  ? MyAwaited<R>
  : T
```

### 参考

> - [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
> - [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
