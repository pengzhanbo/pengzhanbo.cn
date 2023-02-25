---
title: ✔️ Readonly
createTime: 2022/11/30 03:06:24
author: pengzhanbo
permalink: /note/type-challenges/easy/readonly/
---

::: info 题目
Github: [ReadOnly](https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/)

不使用内置的 `Readonly<T>`，实现其相同的功能。

该 `Readonly` 会接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会被 `readonly` 所修饰。

也就是不可以再对该对象的属性赋值。
```ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```
:::

### 解题思路

使一个对象的所有属性都是只读属性，需要遍历对象的每一个键，并使用 `readonly` 修饰符。

在这里，直接使用 **映射类型** ，对该类型的每个属性，获取它的键并为其添加 `readonly` 修饰符

### 答案

```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```
### 参考

> - [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
