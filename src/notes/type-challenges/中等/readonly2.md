---
title: ✔️ Readonly2
createTime: 2022/12/01 04:27:12
author: pengzhanbo
permalink: /note/type-challenges/medium/readonly-2/
---

::: info 题目
Github: [Readonly 2](https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/)

实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

K指定应设置为`Readonly`的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
```
:::

### 解题思路

知识点

- 泛型参数默认值
- 类型合并
- `readonly` 关键词
- `Exclude` 内置类型
- `in` 操作符

泛型参数`K` 需要约束为 `T` 的属性集，同时默认值为 `T`的属性集；

创建一个只含有 只读属性的对象类型，通过 `in` 操作符，遍历`T` 的所有成员，映射给泛型属性 `P`；

创建一个只含有可读属性的对象类型， 通过 `Exclude` 排除 `T`属性集中的与 `K` 相同成员，通过 `in` 操作符，映射给泛型属性 `P`；

合并两个对象类型即可实现 `MyReadonly<T, K>`


::: details Answer
```ts
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}
```
:::
