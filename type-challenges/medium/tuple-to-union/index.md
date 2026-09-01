---
url: /type-challenges/medium/tuple-to-union/index.md
---
## 题目

Github: [Tuple to union](https://github.com/type-challenges/type-challenges/blob/main/questions/00010-medium-tuple-to-union/)

实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

```ts
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

## 解题思路

在访问元组的成员时，可以通过 `[number]` 索引，访问一个 由元组所有成员构成的联合类型。

同时，需要对 `T` 添加约束，以告知编译器 `T` 是一个可以被索引的数组。

## 答案

```ts
type TupleToUnion<T extends unknown[]> = T[number]
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type TupleToUnion<T extends unknown[]> = T[number]

// ---cut---
type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]
```

## 参考

* [查找类型 Lookup Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
