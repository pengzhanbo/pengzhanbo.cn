---
url: /type-challenges/medium/stars-with/index.md
---
## 题目

Github: [StartsWith](https://github.com/type-challenges/type-challenges/blob/main/questions/02688-medium-startswith/)

实现 `StartsWith<T, U>` ,接收两个 `string` 类型参数,然后判断 `T` 是否以 `U` 开头,根据结果返回 `true` 或 `false`

```ts
type a = StartsWith<'abc', 'ac'> // expected to be false
type b = StartsWith<'abc', 'ab'> // expected to be true
type c = StartsWith<'abc', 'abcd'> // expected to be false
```

## 解题思路

略。

## 答案

```ts
type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false

// ---cut---
type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,
]
```

## 参考

* [泛型 Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
* [泛型约束 Generics constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [模板字面量类型 Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
