---
title: ✔️ GetReturnType
createTime: 2022/12/01 04:26:29
author: pengzhanbo
permalink: /note/type-challenges/medium/get-return-type/
---

::: info 题目
Github: [Get return type](https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/)

不使用 `ReturnType` 实现 `TypeScript` 的 `ReturnType<T>` 泛型。

```ts
const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}

type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
```
:::

### 解题思路

知识点：
- 条件类型推断 `infer` 关键词

通过 条件类型推断，泛型参数 `T` 是否是 函数类型，通过 `infer` 关键词从条件类型推断为真时，获取函数返回类型。

::: details Answer
```ts
type MyReturnType<T> = T extends (...args: any) => infer R ? R : never
```
:::
