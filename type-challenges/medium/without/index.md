---
url: /type-challenges/medium/without/index.md
---
## 题目

Github: [Without](https://github.com/type-challenges/type-challenges/blob/main/questions/05117-medium-without/)

实现一个像 `Lodash.without` 函数一样的泛型 `Without<T, U>`，它接收数组类型的 `T` 和数字或数组类型的 `U` 为参数，
会返回一个去除 `U` 中元素的数组 `T`。

```ts
type Res = Without<[1, 2], 1> // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]> // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]> // expected to be []
```

## 解题思路

此挑战很容易想到使用 `infer` 和递归 来实现，从 数组 `T` 中取出一个个元素，判断是否为 `U` 的元素。

但还需要注意一点，即 `U` 可能传入的是 数组，也可能是 非数组。因此，需要将 `U` 转换为 联合类型。

## 答案

```ts
type ToUnion<U> = U extends readonly any[] ? U[number] : U
type Without<T extends any[], U> = T extends [infer F, ...infer O]
  ? F extends ToUnion<U>
    ? Without<O, U>
    : [F, ...Without<O, U>]
  : T
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type ToUnion<U> = U extends readonly any[] ? U[number] : U
type Without<T extends any[], U> = T extends [infer F, ...infer O]
  ? F extends ToUnion<U>
    ? Without<O, U>
    : [F, ...Without<O, U>]
  : T

// ---cut---
type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]
```

## 参考

* [联合类型 Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [递归条件类型 Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
