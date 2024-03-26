---
title: ✔️ Omit
createTime: 2022/12/01 04:26:50
author: pengzhanbo
permalink: /type-challenges/medium/omit/
---

::: info 题目
Github: [Omit](https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/)

不使用 `Omit` 实现 `TypeScript` 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
```

:::

### 解题思路

首先需要通过 `K extends keyof T` 约束`K` 只包含 类型 `T` 的键。
然后使用内置类型 `Exclude` 帮助我们从 `keyof T` 中排除 `K` 的键。
最后新对象的值为 原类型的相对应键的值类型

### 答案

```ts
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}
```

### 参考

> - [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
> - [索引类型 indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
