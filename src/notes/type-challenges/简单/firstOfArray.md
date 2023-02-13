---
title: ✔️ First of Array
createTime: 2022/12/01 02:19:27
author: pengzhanbo
permalink: /note/type-challenges/easy/first-of-array/
---

::: info 题目
Github: [First of array](https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/)

实现一个通用`First<T>`，它接受一个数组T并返回它的第一个元素的类型。

``` ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```
:::

### 解题思路

知识点：
- 条件类型推断 `infer` 关键词

**通过条件类型，判断入参的数组，是否拥有至少一个元素，有则通过`infer` 关键字推导首个元素并返回**

::: details answer
```ts
type First<T extends any[]> = T extends [infer R, ...any[]] ? R : never
```
:::


