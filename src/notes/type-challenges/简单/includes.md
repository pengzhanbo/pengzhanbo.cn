---
title: ✔️ Includes
createTime: 2022/12/01 04:17:48
author: pengzhanbo
permalink: /note/type-challenges/easy/includes/
---

::: info 题目
Github: [Includes](https://github.com/type-challenges/type-challenges/blob/main/questions/00898-easy-includes/)

在类型系统里实现 JavaScript 的 Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。

```ts
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```
:::

### 解题思路

知识点：
- 类型约束
- 数组展开
- 条件类型判断 `infer` 关键词
- 类型递归

本题解题的关键难点在于， 如何判断类型`U` 全等于 数组类型 `T` 中的某个成员。比如 `1` 虽然是 `number` 类型，但是
类型 `1`是继承 `number` 类型，而不是全等关系，因此 `1` 不能被认为是 `[number]` 数组的成员。

在 `TS` 类型系统中，实现 **全等判断**，需要通过 `extends` 关键词，以及 函数的返回值类型，才能正确的判断两个类型是否完全一致。

假设需要对比泛型参数 `<X, Y>`  是否全等，需要通过构造函数类型 `<T>() => T extends X ? 1 : 2`， 以及函数类型
`<T>() => T extends Y ? 1 : 2`，再通过 `extends` 关键词，判断两个函数类型是否具有继承关系，即可间接推断
出类型 `X`  是否全等于类型`Y`。

```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? true : false
```

有了 `Equal<X, Y>` 类型工具，继续进一步的通过类型递归的方式，遍历数组类型`T`中的每一个成员，是否全等于类型`U`，
即可实现 `includes`。

通过构造 `T extends [infer F, ...infer O]` 条件类型推断，在条件为真时，使用 `infer F`取出数组的第一个元素
于 类型`U` 进行 `Equal`。如果对比为 `false` ，则继续将 `infer O` 获取的数组`T`剩余成员，继续传入 `Includes` 类型中递归对比。



::: details Answer
```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true : false
type Includes<T extends readonly any[], U> = T extends [infer F, ...infer O]
  ? Equal<F, U> extends true
    ? true
    : Includes<O, U>
  : false
```
:::
