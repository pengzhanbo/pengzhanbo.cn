---
url: /type-challenges/medium/chunk/index.md
---
## 题目

Github: [Chunk](https://github.com/type-challenges/type-challenges/blob/main/questions/04499-medium-chunk/README.md)

你知道 `lodash` 吗？其中的 `Chunk` 是一个非常实用的函数，现在让我们来实现它。
`Chunk<T, N>` 接受两个必需的类型参数，`T` 必须是一个元组，而 `N` 必须是一个大于等于 `1` 的整数。

```ts
type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
```

## 解题思路

首先我们从类型声明开始，类型 `Chunk` 接受三个参数 `T`，`N`，`R`，`T` 是一个元组，`N` 是一个大于等于 `1` 的整数，
`R` 是一个可选的参数，用于保存单个分块的结果。

```ts
type Chunk<
  T extends unknown[],
  N extends number,
  R extends unknown[] = []
> = any
```

对于单个分块 `R`，当其长度为 `N` 时，即满足 `R['length'] extends N`，则表示分块已经填满，需要继续填充下一个分块：

```ts
type Chunk<T extends unknown[], N extends number, R extends unknown[] = []> =
  R['length'] extends N ? [...R, Chunk<T, N>] : any
```

当分块未填满且数组 `T` 中还有元素时 `T extends [infer F, ...infer U]`，需要继续分块：

```ts
type Chunk<T extends unknown[], N extends number, R extends unknown[] = []> =
  R['length'] extends N
    ? [...R, Chunk<T, N>]
    : T extends [infer F, ...infer U]
      ? Chunk<U, N, [...R, F]>
      : any
```

也要考虑，当数组 `T` 已清空时，如果 `R` 中还有元素，需要将 `[R]` 返回，否则返回 `[]` 。

## 答案

```ts
type Chunk<
  T extends unknown[],
  N extends number,
  R extends unknown[] = []
> = R['length'] extends N
  ? [R, ...Chunk<T, N>]
  : T extends [infer F, ...infer U]
    ? Chunk<U, N, [...R, F]>
    : R extends [] ? [] : [R]
```

## 验证

```ts twoslash
import type { Equal, Expect, NotEqual } from '~/tc-utils'

type Chunk<T extends unknown[], N extends number, R extends unknown[] = []> = R['length'] extends N
  ? [R, ...Chunk<T, N>]
  : T extends [infer F, ...infer U]
    ? Chunk<U, N, [...R, F]>
    : R extends [] ? [] : [R]

// ---cut---
type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]
```

## 参考

* [泛型 Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
* [泛型约束 Generics constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [可变元组类型 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
* [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
