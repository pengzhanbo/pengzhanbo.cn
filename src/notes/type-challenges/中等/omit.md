---
title: ✔️ Omit
createTime: 2022/12/01 04:26:50
author: pengzhanbo
permalink: /note/type-challenges/medium/omit/
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

知识点：

- 对象类型索引签名
- 映射类型
- `in` 操作符
- 内置类型 `Exclude`
- `keyof` 操作符

通过 `keyof`操作符，获取泛型 T 的属性名组成的联合类型；

通过 `Exclude<T, K>` 排除 `T` 中 与`K` 相同的成员，创建新的联合类型；

使用 `in` 操作符 遍历该联合类型，创建一个映射类型的 泛型属性 `P` 实现属性名推导。


::: details Answer
```ts
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}
```
:::
