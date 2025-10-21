---
url: /type-challenges/medium/last-index-of/index.md
---
## 题目

实现类型版本的 `Array.lastIndexOf`, `LastIndexOf<T, U>` 接受数组 `T`, `any` 类型 `U`, 如果 `U` 存在于 `T` 中,
返回 `U` 在数组 `T` 中最后一个位置的索引, 不存在则返回 `-1`

```ts
type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
```

## 解题思路

本挑战的难点在于 如何判断一个类型是否严格等于另一个类型。

对于此难点，请参考 [类型系统的真假美猴王：破解 IsEqual\<X, Y> 之谜](../../../1.前端/12.TypeScript/isEqual.md)

通过 条件类型 `infer`，从数组 `T` 中，通过递归的方式取出一个个元素，判断是否严格等于类型 `U`，
如果是，则直接返回 `R['length']` 的长度，否则继续递归取下一个元素，并为 `R` 添加一个元素。

递归时，类型`R` 的剩余数组长度，恰好为 `T` 的最后一个元素的索引。

## 答案

```ts
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type LastIndexOf<T extends unknown[], U> = T extends [...infer R, infer F]
  ? Equal<F, U> extends true
    ? R['length']
    : LastIndexOf<R, U>
  : -1
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type LastIndexOf<T extends unknown[], U> = T extends [...infer R, infer F]
  ? Equal<F, U> extends true
    ? R['length']
    : LastIndexOf<R, U>
  : -1

// ---cut---
type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [可变元组类型 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
* [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
