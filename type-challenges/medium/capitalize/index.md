---
url: /type-challenges/medium/capitalize/index.md
---
## 题目

Github: [Capitalize](https://github.com/type-challenges/type-challenges/blob/main/questions/00110-medium-capitalize/)

实现 `Capitalize<T>` 它将字符串的第一个字母转换为大写，其余字母保持原样。

```ts
type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
```

## 解题思路

此挑战可以拆分为两个问题：

1. 提取字符串的第一个字母；
2. 将这个字母转换为大写。

我们可以使用 **模板字面量类型** 提取字符串的第一个字母，然后使用 内置 `Uppercase` 将其转换为大写字母。

## 答案

```ts
type MyCapitalize<S extends string>
  = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S
```

::: details `${infer F}${infer R}` 是如何工作的？

在 模板字面量类型中，如果字符串仅使用 `infer` 进行推导，而不掺杂其他信息，
那么前面的 `infer` 每一次只会推导一个字符。最后的 `infer` 会推导剩下的所有字符。

比如 `abcd`， 推导出 `F = a`， `R = bcd`。

而如果在其中加入某些推导条件，如 `${infer F}-${infer R}`，那么则会按照推导条件进行分割：

比如 `ab-cc-dd` ， 推导出 `F = ab`， `R = cc-dd`

:::

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type MyCapitalize<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S

// ---cut---
type cases = [
  Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize<''>, ''>>,
  Expect<Equal<MyCapitalize<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize<'z'>, 'Z'>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [模板字面量类型 Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
* [模板字面量类型中的大写字符串类型](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)
