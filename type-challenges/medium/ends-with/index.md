---
url: /type-challenges/medium/ends-with/index.md
---
## 题目

实现 `EndsWith<T, U>` ,接收两个 `string` 类型参数,然后判断 `T` 是否以 `U` 结尾,根据结果返回 `true` 或 `false`

```ts
type a = EndsWith<'abc', 'bc'> // expected to be true
type b = EndsWith<'abc', 'abc'> // expected to be true
type c = EndsWith<'abc', 'd'> // expected to be false
```

## 解题思路

略。

## 答案

```ts
type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false

// ---cut---
type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>,
  Expect<Equal<EndsWith<'abc', 'ac'>, false>>,
  Expect<Equal<EndsWith<'abc', ''>, true>>,
  Expect<Equal<EndsWith<'abc', ' '>, false>>,
]
```

## 参考

* [泛型 Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
* [泛型约束 Generics constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [模板字面量类型 Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
