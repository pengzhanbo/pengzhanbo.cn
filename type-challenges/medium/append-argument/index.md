---
url: /type-challenges/medium/append-argument/index.md
---
## 题目

Github: [Append Argument](https://github.com/type-challenges/type-challenges/blob/main/questions/00191-medium-append-argument/)

实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。
`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

```ts
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean>
// 期望是 (a: number, b: string, x: boolean) => number
```

## 解题思路

首先我们可以使用 `infer` 关键字来推断出函数的参数类型和返回值类型。通过条件类型的类型推断来实现这一点。

```ts
type AppendArgument<Fn, A> = Fn extends (args: infer P) => infer R
  ? (args: P) => R
  : never
```

但需要注意的是，这里的 `(args:infer P)` 只能获取首个参数的类型，因此我们需要使用 `...` 展开语法来获取所有参数的类型。

```ts
type AppendArgument<Fn, A> = Fn extends (...args: infer P) => infer R
  ? (...args: P) => R
  : never
```

此时获取的类型参数 `P` 为一个可变元组类型，可以使用 `...` 展开语法来获取参数的类型，并添加 `A` 类型的参数。
构造新的函数参数签名。

## 答案

```ts
type AppendArgument<Fn extends (...args: any[]) => any, A> =
  Fn extends (...args: infer P) => infer R ? (...args: [...P, A]) => R : never
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type AppendArgument<Fn extends (...args: any[]) => any, A> =
  Fn extends (...args: infer P) => infer R ? (...args: [...P, A]) => R : never
// ---cut---
type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [可变元组类型 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
* [可变参数和参数 Rest Parameters and Arguments](https://www.typescriptlang.org/docs/handbook/2/functions.html#rest-parameters-and-arguments)
