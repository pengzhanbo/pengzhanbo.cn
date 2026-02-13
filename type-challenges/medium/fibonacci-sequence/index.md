---
url: /type-challenges/medium/fibonacci-sequence/index.md
---
## 题目

Github: [FibonacciSequence](https://github.com/type-challenges/type-challenges/blob/main/questions/04182-medium-fibonacci-sequence/README.zh-CN.md)

实现一个通用的斐波那契函数 `Fibonacci<T>`，它接受一个数字 `T` 并返回其对应的 [斐波那契数](https://en.wikipedia.org/wiki/Fibonacci_number)。

序列开始为：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

```ts
type Result1 = Fibonacci<3> // 2
type Result2 = Fibonacci<8> // 21
```

## 解题思路

斐波那契数列通常从0和1开始，后续的每一项都是前两项的和。数列的前几项如下：

$$
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, \dots
$$

用数学公式表示为：

$$
F(0) = 0, \quad F(1) = 1
$$
$$
F(n) = F(n-1) + F(n-2) \quad (n \geq 2)
$$

在 Typescript 中不支持直接的加减乘除运算，但是对于 加法，我们可以通过 两个元组的合并，
取新合并的元组的长度来间接实现 加法 （对数字有范围限制，这通常由 Typescript 递归深度限制）。

已知 类型 `T` 表示 `n`，求 $F(n)$ 。因此我们需要知道 $F(n-1)$ 和 $F(n-2)$ ，
对 $F(n-1)$ 需要知道 $F(n-2)$ 和 $F(n-3)$ ， 以此类推，最终回到 $F(1)$ 和 $F(0)$ ，这也是我们已知的值。
换句话来说，我们需要知道 `n` 之前的所有 斐波那契数。

因此，不妨从 `n = 2` 开始，即求 $F(0)$ 和 $F(1)$ 的和，通过递归知道 `n = T` 时得到结果：

* 使用元组类型 `CurrentIndex` 的长度表示 `n` ，其默认长度为 `1` ，即 $n=1$ 。
* 使用元组类型 `Prev` 的长度表示 `n - 2` 的值，当 `n = 2` 时，即为 $F(0) = 0$ 。
* 使用元组类型 `Current` 的长度表示 `n - 1` 的值，当 `n = 2` 时，即为 $F(1) = 1$ 。

由于 `CurrentIndex` 默认长度为 `1`，此时 `Current` 即为 `n = 1` 时的 斐波那契数。

通过条件类型 `CurrentIndex['length'] extends T` 当为真时， `Current` 的长度即为 `n = T` 时的斐波那契数。

```ts
type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [1],
  Prev extends any[] = [],
  Current extends any[] = [1]
> = CurrentIndex['length'] extends T
  ? Current['length']
  : any
```

当为假时，我们继续迭代, 将 `Current` 传给 `Prev`, 并使用 `Current` 和 `Prev` 合并的新元组
作为 `Current` 的新值。同时别忘了需要对 `CurrentIndex` 新增一个成员：

```ts
type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [1],
  Prev extends any[] = [],
  Current extends any[] = [1]
> = CurrentIndex['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]> // [!code ++]
```

## 答案

```ts
type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [1],
  Prev extends any[] = [],
  Current extends any[] = [1]
> = CurrentIndex['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>
```

## 验证

```ts twoslash
import type { Equal, Expect, NotEqual } from '~/tc-utils'

type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [1],
  Prev extends any[] = [],
  Current extends any[] = [1]
> = CurrentIndex['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>

// ---cut---
type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [递归条件类型 Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
* [可变元组类型 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
