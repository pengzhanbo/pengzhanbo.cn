---
url: /type-challenges/medium/tuple-to-nested-object/index.md
---
## 题目

Github: [TupleToNestedObject](https://github.com/type-challenges/type-challenges/blob/main/questions/03188-medium-tuple-to-nested-object/README.md)

给定一个仅包含字符串类型的元组类型 `T` ，以及一个类型 `U` ，递归地构建一个对象。

```ts
type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
```

## 解题思路

略。

## 答案

```ts
type TupleToNestedObject<T, U> = T extends [infer L extends PropertyKey, ...infer O]
  ? { [P in L]: TupleToNestedObject<O, U> }
  : U
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type TupleToNestedObject<T, U> = T extends [infer L extends PropertyKey, ...infer O]
  ? { [P in L]: TupleToNestedObject<O, U> }
  : U

// ---cut---
type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [在条件类型中进行推断 Inferring within conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [递归条件类型 Recursive conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
