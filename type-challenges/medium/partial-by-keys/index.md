---
url: /type-challenges/medium/partial-by-keys/index.md
---
## 题目

Github: [PartialByKeys](https://github.com/type-challenges/type-challenges/blob/main/questions/02757-medium-partialbykeys/)

实现一个通用的 `PartialByKeys<T, K>` ，它接收两个类型参数 `T` 和 `K` 。

`K` 指定应设置为可选的T的属性集。当没有提供 `K` 时，它就和普通的 `Partial<T>` 一样使所有属性都是可选的。

```ts
interface User {
  name: string
  age: number
  address: string
}

type UserPartialName = PartialByKeys<User, 'name'>
// { name?:string; age:number; address:string }
```

## 解题思路

略。

## 答案

```ts
type PartialByKeys<T, K extends keyof T = keyof T> = Omit<{
  [P in keyof T as P extends K ? P : never]?: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}, never>
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type PartialByKeys<T, K extends keyof T = keyof T> = Omit<{
  [P in keyof T as P extends K ? P : never]?: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}, never>

// ---cut---
interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]
```

## 参考

* [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
* [通过 `as` 进行按键重映射 Key remapping via `as`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [`keyof` 和查找类型 `keyof` and lookup types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
* [交叉类型 Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
