---
title: ✔️ DeepReadonly
createTime: 2022/12/01 04:27:54
author: pengzhanbo
permalink: /note/type-challenges/medium/deep-readonly/
---

::: info 题目
Github: [Deep Readonly](https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/)

实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

```ts
type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```
:::

### 解题思路

知识点：

- `readonly` 关键词
- `keyof` 操作符
- 条件类型
- 类型递归

通过 `readonly` 修饰属性为 只读属性， 由于 `keyof` 操作符仅用于获取对象类型的 属性集，可以通过条件类型
推断是否能够获取属性集即可判断当前属性值是否是一个对象，如果是，则继续递归调用。最终实现 `DeepReadonly`。


::: details Answer
```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P]: DeepReadonly<T[P]>
}
```
:::
