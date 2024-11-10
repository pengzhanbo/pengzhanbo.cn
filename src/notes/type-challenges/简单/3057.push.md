---
title: Push
icon: ph:check-bold
createTime: 2022/12/01 04:18:04
author: pengzhanbo
permalink: /type-challenges/easy/push/
---

::: info 题目
Github: [Push](https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/)

在类型系统里实现通用的 `Array.push` 。

```ts
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```

:::

### 解题思路

通过 泛型约束`T` 为数组类型，对 `T` 进行展开到新数组中，并将 `U` 合并到新数组的末尾。

### 答案

```ts
type Push<T extends any[], U> = [...T, U]
```

### 参考

> - [可变元组 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
> - [泛型 Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
> - [泛型约束 Generics Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
