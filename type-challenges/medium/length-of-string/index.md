---
url: /type-challenges/medium/length-of-string/index.md
---
## 题目

[Github](https://github.com/type-challenges/type-challenges/blob/main/questions/00298-medium-length-of-string/)

计算字符串的长度，类似于 `String#length` 。

```ts
type length = LengthOfString<'Hello World'> // 11
```

## 解题思路

Typescript 类型系统不支持 `String['length']` 获取字符串的长度，同时，类型系统也没有提供可供累加计算的支持。

但幸运的是，我们可以很容易想到元组类型支持 `Tuple['length']` 获取元组的长度，因此我们可以把字符串转换为元组，
每个字符对应元组中的每个成员，通过元组的长度间接获取字符串的长度。

通过模板字面量类型，以及条件类型来实现字符串转换为元组。

## 答案

```ts
type LengthOfString<S extends string, U extends string[] = []>
  = S extends `${infer F}${infer T}`
    ? LengthOfString<T, [F, ...U]>
    : U['length']
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type LengthOfString<S extends string, U extends string[] = []>
  = S extends `${infer F}${infer T}`
    ? LengthOfString<T, [F, ...U]>
    : U['length']

// ---cut---
type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [递归条件类型 Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
* [模板字面量类型 Template Literal Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)
* [可变元组类型 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
* [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
