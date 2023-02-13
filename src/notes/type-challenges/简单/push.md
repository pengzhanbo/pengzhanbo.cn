---
title: ✔️ Push
createTime: 2022/12/01 04:18:04
author: pengzhanbo
permalink: /note/type-challenges/easy/push/
---

::: info 题目
Github: [Push](https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/)

在类型系统里实现通用的 `Array.push` 。

```ts
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```
:::

### 解题思路

知识点：

- 类型约束
- 数组展开


::: details Answer
```ts
type Push<T extends any[], U> = [...T, U]
```
:::
