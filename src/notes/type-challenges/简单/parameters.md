---
title: ✔️ Parameters
createTime: 2022/12/01 04:18:33
author: pengzhanbo
permalink: /note/type-challenges/easy/parameters/
---

::: info 题目
Github: [Parameters](https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/)

实现内置的 Parameters 类型，而不是直接使用它

```ts
const foo = (arg1: string, arg2: number): void => {}

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
```
:::

### 解题思路

通过 条件类型推断，获取函数的参数类型

### 答案

```ts
type MyParameters<T> = T extends (...args: infer R) => any
  ? R : never
```

### 参考

> - [泛型 Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
> - [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
> - [条件类型内推断 Inferring Within Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
