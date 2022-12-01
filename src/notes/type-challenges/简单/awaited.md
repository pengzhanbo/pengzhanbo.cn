---
title: ✔️ Awaited
createTime: 2022/12/01 04:16:56
author: pengzhanbo
permalink: /note/type-challenges/d070alu8/
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

知识点：
- 内置类型 `PromiseLike`
- 泛型约束
- 条件类型推断 `infer` 关键词
- 类型递归

`PromiseLike` 是一个拥有 `then()` 方法的对象类型(Promise/A+规范)；

类型参数需要约束为 `PromiseLike`，通过条件类型推断，获取`PromiseLike<T>`的参数类型;

通过类型自调用进行递归推断，从而获取最终的`Promise` 的返回类型。


::: details answer
```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<any> ? MyAwaited<R> : R
  : never
```
:::
