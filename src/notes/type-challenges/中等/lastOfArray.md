---
title: ➖ LastOfArray
createTime: 2022/12/01 04:29:16
author: pengzhanbo
permalink: /type-challenges/medium/last-of-array/
---

::: info 题目
Github: [Last of array](https://github.com/type-challenges/type-challenges/blob/main/questions/00015-medium-last/)

实现一个通用`Last<T>`，它接受一个数组T并返回其最后一个元素的类型。

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
```
:::

::: details Answer
```ts
type Last<T extends any[]> = T extends [...any[], infer R] ? R : never
```
:::
