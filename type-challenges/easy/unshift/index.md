---
url: /type-challenges/easy/unshift/index.md
---
## 题目

Github: [Unshift](https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/)

实现类型版本的 `Array.unshift`。

```ts
type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
```

## 解题思路

通过 泛型约束`T` 为数组类型，对 `T` 进行展开到新数组中，并将 `U` 合并到新数组的首位。

## 答案

```ts
type Unshift<T extends any[], U> = [U, ...T]
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type Unshift<T extends any[], U> = [U, ...T]

// ---cut---
type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]
```

## 参考

> * [可变元组 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
> * [泛型 Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
> * [泛型约束 Generics Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
