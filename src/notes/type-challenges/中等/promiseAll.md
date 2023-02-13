---
title: ➖ Promise.all
createTime: 2022/12/01 04:29:56
author: pengzhanbo
permalink: /note/type-challenges/medium/promise-all/
---

::: info 题目
Github: [Promise.all](https://github.com/type-challenges/type-challenges/blob/main/questions/00020-medium-promise-all/)

传入函数`PromiseAll`，它接受PromiseLike对象数组，返回值应为`Promise<T>`，其中`T`是解析的结果数组。

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)
```
:::

::: details Answer
```ts
declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
  [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K]
}>
```
:::
