---
title: ➖ Pop
createTime: 2022/12/01 04:29:33
author: pengzhanbo
permalink: /note/type-challenges/medium/pop/
---

::: info 题目
Github: [Pop](https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/)

实现一个通用`Pop<T>`，它接受一个数组`T`，并返回一个由数组T的前`length-1`项以相同的顺序组成的数组。

```ts
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
```
:::


::: detailer Answer
```ts
type Pop<T extends any[]> = T extends [...infer R, any] ? R : T
```
:::
