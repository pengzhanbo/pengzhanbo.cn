---
url: /type-challenges/medium/flatten/index.md
---
## 题目

Github: [Flatten](https://github.com/type-challenges/type-challenges/blob/main/questions/00459-medium-flatten/)

在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

```ts
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

## 解题思路

首先挑战限制了只能接受数组，因此我们需要使用条件类型限制泛型参数 `T`

```ts
type Flatten<T extends unknown[]> = any
```

由于我们不知道数组的每个成员是数组类型还是其他类型，所以我们需要依次对数组的每个成员进行判断。
这需要使用条件类型类型推断，获取数组的成员。

```ts
type Flatten<T extends unknown[]> = T extends [infer L, ...infer R] ? L : T
```

在获取到第一个成员 `L` 后，我们需要判断它是否是数组类型，以检查它是否需要继续扁平化。
并对剩余成员进行递归处理，直到没有成员需要继续扁平化。

## 答案

```ts
type Flatten<T extends unknown[]> = T extends [infer L, ...infer R]
  ? L extends unknown[]
    ? [...Flatten<L>, ...Flatten<R>]
    : [L, ...Flatten<R>]
  : T
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type Flatten<T extends unknown[]> = T extends [infer L, ...infer R]
  ? L extends unknown[] ? [...Flatten<L>, ...Flatten<R>] : [L, ...Flatten<R>]
  : T
// ---cut---
type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
]

// @ts-expect-error ignore
type error = Flatten<'1'>
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [递归条件类型 Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
* [可变元组类型 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
