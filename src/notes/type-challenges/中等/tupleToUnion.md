---
title: ✔️ TupleToUnion
createTime: 2022/12/01 04:28:11
author: pengzhanbo
permalink: /type-challenges/medium/tuple-to-union/
---

::: info 题目
Github: [Tuple to union](https://github.com/type-challenges/type-challenges/blob/main/questions/00010-medium-tuple-to-union/)

实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

```ts
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```
:::


### 解题思路

知识点

- 元组
- 联合类型
- 通过索引访问元组成员

在访问元组的成员时，可以通过 `[number]` 索引，访问一个 由元组所有成员构成的联合类型。

::: details Answer
```ts
type TupleToUnion<T extends any[]> = T[number]
```
:::
