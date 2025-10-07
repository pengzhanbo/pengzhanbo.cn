---
title: unknown 类型应用场景
createTime: 2022/04/02 10:53:19
tags:
  - typescript
permalink: /article/lasuemgv/
---

`unknown` 类型 表示 不可预先定义的类型，在很多场景下，它可以代替 `any` 类型的功能
的同时，保留静态检查的能力。

<!-- more -->

## 类型转换

```ts twoslash
const num: number = 10
;(num as unknown as string).split('')
//                           ^?

// @log: 这里可以和 any 一样通过静态检查
```

这个例子可以看出， `unknown` 类型的作用和 `any` 类型的作用非常相似，你可以把它转换为任何类型。
区别在于，**`any` 在静态编译时可以调用任何方法，但 `unknown` 类型在静态编译时是不可以调用任何方法的** 。

```ts twoslash
// @errors: 18046
const foo: unknown = 'string'
foo.substr(1) // 静态检查不通过报错
const bar: any = 10
bar.substr(1)
```

## 替代 `any`

大多数情况下，我们可以选择使用 `unknown` 替代 `any`，从而避免由于使用 `any` 而带来的 静态类型
检查的失效。

如，避免使用 `any` 作为 函数参数类型，使用 `unknown` 替代。

**使用 any，静态检查失效：**

```ts twoslash
function test(input: any): number {
  if (Array.isArray(input)) {
    return input.length
  }
  return input.length
}
```

**使用 unknown，静态检查正确推断：**

```ts twoslash
// @errors: 18046
function test(input: unknown): number {
  if (Array.isArray(input)) {
    // 类型守卫将input识别为array类型
    return input.length
  }
  // input是unknown类型，静态检查报错
  return input.length
}
```
