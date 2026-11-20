---
url: /type-challenges/medium/merge/index.md
---
## 题目

Github: [Merge](https://github.com/type-challenges/type-challenges/blob/main/questions/00599-medium-merge/)

将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。

```ts
interface foo {
  name: string
  age: string
}

interface coo {
  age: number
  sex: string
}

type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
```

## 解题思路

首先使用 `keyof` 和联合类型获取两个类型的所有 `key`

```ts
type Merge<F, S> = {
  [K in keyof F | keyof S]: any
}
```

接下来，判断 `K` 是否在 `S` 中，如果在，返回 `S[K]`：

```ts
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S ? S[K] : any
}
```

最后，判断 `K` 是否在 `F` 中，如果在，返回 `F[K]`

```ts
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never
}
```

## 答案

```ts
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
      ? F[K]
      : never
}
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
      ? F[K]
      : never
}

// ---cut---
interface Foo {
  a: number
  b: string
}
interface Bar {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]
```

## 参考

* [联合类型 Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
* [查找类型 Lookup Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
* [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
