---
title: ✔️ Unshift
createTime: 2022/12/01 04:18:16
author: pengzhanbo
permalink: /note/type-challenges/9fb2xcys/
---

::: info 题目
Github: [Unshift](https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/)

实现类型版本的 `Array.unshift`。

```ts
type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
```
:::

### 解题思路

知识点：
- 数组展开

::: details Answer
```ts
type Unshift<T extends any[], U> = [U, ...T]
```
:::
