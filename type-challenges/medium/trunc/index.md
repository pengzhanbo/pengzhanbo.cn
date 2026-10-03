---
url: /type-challenges/medium/trunc/index.md
---
## 题目

Github: [Trunc](https://github.com/type-challenges/type-challenges/blob/main/questions/05140-medium-trunc/)

实现 `Math.trunc` 的类型版本，该版本接受字符串或数字，并通过移除任何小数部分返回数字的整数部分。

```ts
type A = Trunc<12.34> // 12
```

## 解题思路

这个挑战很容易想到用 模板字面量类型 和 条件类型 `infer` 判断字符串是否包含小数部分，然后进行处理。

需要注意的是，数字字符串中可能包含 `-`，也可能省略整数部分的 `0` 。

## 答案

```ts
type Trunc<T extends number | string> = `${T}` extends `${infer D}.${string}`
  ? D extends '' | '-' ? `${D}0` : D
  : `${T}`
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type Trunc<T extends number | string> = `${T}` extends `${infer D}.${string}`
  ? D extends '' | '-' ? `${D}0` : D
  : `${T}`

// ---cut---
type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-.3'>, '-0'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [模板字面量类型 Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
