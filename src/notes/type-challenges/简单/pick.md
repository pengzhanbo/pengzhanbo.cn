---
title: ✔️ Pick
createTime: 2022/11/30 12:49:20
author: pengzhanbo
permalink: /note/type-challenges/easy/pick/
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

本题需要使用到 **查找类型** 和 **映射类型** 。

- **查找类型** 允许通过名称从另一个类型中提取一个新的类型。
- **映射类型** 允许将一个类型中的每个属性转换为一个新的类型。

在这个挑战中，需要从 `联合(union) K` 中取得所有内容，遍历并返回一个仅包含这些键的新的类型。
同时 `联合(union) K` 仅能包含 `T` 的键值。

### 答案

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

最终结果为，从 `K` 中获取所有内容，命名为 `P` 并将其作为新对象的一个新键，其值的类型取自输入类型。

### 参考

> - [查找类型 Lookup Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
> - [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
> - [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
