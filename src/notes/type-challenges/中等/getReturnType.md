---
title: ➖ GetReturnType
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
