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

知识点：
- 泛型参数 类型约束
- 条件类型推断 `infer` 关键字

::: details Answer
```ts
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer R) => any
  ? R : never
```
:::
