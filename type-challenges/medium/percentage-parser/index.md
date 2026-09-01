---
url: /type-challenges/medium/percentage-parser/index.md
---
## 题目

Github: [Percentage Parser](https://github.com/type-challenges/type-challenges/blob/main/questions/01978-medium-percentage-parser/)

实现类型 `PercentageParser`。根据规则 `/^(\+|\-)?(\d*)?(\%)?$/` 匹配类型 `T` 。

匹配的结果由三部分组成，分别是：\[正负号, 数字, 单位]，如果没有匹配，则默认是空字符串。

```ts
type R1 = PercentageParser<''> // expected ['', '', '']
type R2 = PercentageParser<'+85%'> // expected ["+", "85", "%"]
type R3 = PercentageParser<'-85%'> // expected ["-", "85", "%"]
type R4 = PercentageParser<'85%'> // expected ["", "85", "%"]
type R5 = PercentageParser<'85'> // expected ["", "85", ""]
```

## 解题思路

一开始，我想到的最粗暴的解题方式如下：

```ts
type PercentageParser<
  A extends string,
  R extends readonly [string, string, string] = ['', '', '']
> = A extends ''
  ? R
  : A extends `${infer F}${infer O}`
    ? F extends '-' | '+'
      ? PercentageParser<O, [F, '', '']>
      : F extends `${number}`
        ? PercentageParser<O, [R[0], `${R[1]}${F}`, '']>
        : F extends '%'
          ? PercentageParser<O, [R[0], R[1], F]>
          : PercentageParser<O, [R[0], R[1], '']>
    : R
```

但这样做需要迭代每一个字符，处理起来并不简洁高效。

我们回归的挑战本身，对于 百分比字符串，它的首位字符 可能是 `+`、 `-`，以及不带符号为 `''` 的情况；
它的末尾则可能是 `%` ；剩下的字符则没有特殊的情况。

这告诉我们，可以将挑战分开为两个问题来解决：

1. 首个字符是否是 `+`, `-`;
2. 剩下字符是否以 `%` 结尾。

问题已经变得非常简单，我们可以使用 模板字面量类型 和 条件类型 解决：

字符是否是 `+`, `-`：

```ts
type CheckPrefix<T> = T extends '+' | '-' ? T : never
```

字符是否以 `%` 结尾：

```ts
type CheckSuffix<T> = T extends `${infer P}%` ? [P, '%'] : [T, '']
```

接下来，从原字符串中提取首个字符和剩下的字符，分别交给对应的类型处理即可，这里同样使用
模板字面量类型 和 条件类型 解决：

```ts
type PercentageParser<A extends string> = A extends `${CheckPrefix<infer L>}${infer R}`
  ? [L, ...CheckSuffix<R>] // 首字符是 + -
  : ['', ...CheckSuffix<A>]
```

## 答案

```ts
type CheckPrefix<T> = T extends '+' | '-' ? T : never
type CheckSuffix<T> = T extends `${infer P}%` ? [P, '%'] : [T, '']
type PercentageParser<A extends string> = A extends `${CheckPrefix<infer L>}${infer R}`
  ? [L, ...CheckSuffix<R>]
  : ['', ...CheckSuffix<A>]
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type CheckPrefix<T> = T extends '+' | '-' ? T : never
type CheckSuffix<T> = T extends `${infer P}%` ? [P, '%'] : [T, '']
type PercentageParser<A extends string> = A extends `${CheckPrefix<infer L>}${infer R}` ? [L, ...CheckSuffix<R>] : ['', ...CheckSuffix<A>]

// ---cut---
type cases = [
  Expect<Equal<PercentageParser<''>, ['', '', '']>>,
  Expect<Equal<PercentageParser<'+'>, ['+', '', '']>>,
  Expect<Equal<PercentageParser<'+1'>, ['+', '1', '']>>,
  Expect<Equal<PercentageParser<'+100'>, ['+', '100', '']>>,
  Expect<Equal<PercentageParser<'+100%'>, ['+', '100', '%']>>,
  Expect<Equal<PercentageParser<'100%'>, ['', '100', '%']>>,
  Expect<Equal<PercentageParser<'-100%'>, ['-', '100', '%']>>,
  Expect<Equal<PercentageParser<'-100'>, ['-', '100', '']>>,
  Expect<Equal<PercentageParser<'-1'>, ['-', '1', '']>>,
  Expect<Equal<PercentageParser<'%'>, ['', '', '%']>>,
  Expect<Equal<PercentageParser<'1'>, ['', '1', '']>>,
  Expect<Equal<PercentageParser<'100'>, ['', '100', '']>>,
]
```

## 参考

* [模板字面量类型 Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [递归条件类型 Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
* [可变元组类型 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
