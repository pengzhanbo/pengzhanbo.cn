---
title: ✔️ Exclude
createTime: 2022/12/01 04:16:32
author: pengzhanbo
permalink: /note/type-challenges/easy/exclude/
---

::: info 题目
Github: [Exclude](https://github.com/type-challenges/type-challenges/blob/main/questions/)

实现内置的`Exclude <T, U>`类型，但不能直接使用它本身。

> 从联合类型T中排除U的类型成员，来构造一个新的类型。

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```
:::

### 解题思路

在 typescript 中， 条件类型是 可分配的。 在 `T extends U` 且 `T` 是联合类型时，实际上发生的是 typescript 遍历联合类型 `T` 中的每一个元素，并将条件判断应用到每一个元素上。

所以可以通过这一特性，检查 `T` 的元素是否满足 `U` 的约束，如果是，则跳过 


```ts
type MyExclude<T, U> = T extends U ? never : T
```

### 答案

### 参考

> [分配条件类型 Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
