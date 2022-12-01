---
title: ✔️ If
createTime: 2022/12/01 04:17:15
author: pengzhanbo
permalink: /note/type-challenges/z7455c7o/
---

::: info 题目
Github: [If](https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/)

实现一个 `IF` 类型，它接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 `true` 或者 `false`， `T` 和 `F` 可以是任意类型。

```ts
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
```
:::

### 解题思路

知识点：
- 泛型类型约束
- 条件类型推断

**通过泛型类型约束为 `boolean` , 条件类型推断 `T` 是否继承 `true` 。**

::: details answer
```ts
type If<C extends boolean, T, F> = C extends true ? T : F
```
:::
