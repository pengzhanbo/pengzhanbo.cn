---
title: If
icon: ph:check-bold
createTime: 2022/12/01 04:17:15
author: pengzhanbo
permalink: /type-challenges/easy/if/
---

::: info 题目
Github: [If](https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/)

实现一个 `IF` 类型，它接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 `true` 或者 `false`， `T` 和 `F` 可以是任意类型。

```ts
type A = If<true, 'a', 'b'> // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
```

:::

### 解题思路

通过泛型类型约束 `C` 为 `boolean` , 条件类型推断 `C` 计算结果是否为 `true` 。

### 答案

```ts
type If<C extends boolean, T, F> = C extends true ? T : F
```

### 参考

> - [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
