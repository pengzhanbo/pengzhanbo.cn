---
title: ✔️ Pick
createTime: 2022/11/30 12:49:20
author: pengzhanbo
permalink: /note/type-challenges/te2rh136/
---

::: info 题目
Github: [Pick](https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/)

实现 TS 内置的 `Pick<T, K>`，但不可以使用它。

**从类型 T 中选择出属性 K，构造成一个新的类型。**

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```
:::

### 解题思路

本题是 `typescript` 对 `Pick` 类型的自定义实现，需要掌握的 `TS` 基础知识点包括：

- 对象类型的 `索引签名`
- 字符串字面量类型
- 联合类型
- 泛型

::: details answer
```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```
:::
