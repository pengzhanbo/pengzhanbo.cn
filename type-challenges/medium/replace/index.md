---
url: /type-challenges/medium/replace/index.md
---
## 题目

Github: [Replace](https://github.com/type-challenges/type-challenges/blob/main/questions/00116-medium-replace/)

实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

```ts
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
```

## 解题思路

我们可以使用 **模板字面量类型** 来实现这个挑战。对于字符串 `S` ，我们将其拆分为三个部分，并对每个部分
进行推断。

推断从字符串的左侧开始，直到找到 `Form` 位置，此时 `S` 为拆分为 `F` 、 `From` 、 `R` 三个部分。

```ts
type Replace<S extends string, From extends string, To extends string> =
  S extends `${infer F}${From}${infer R}` ? S : S
```

在找到 `From` 位置后，我们对 `From` 位置的字符串进行替换，将其替换为 `To`，拼接为新的字符串。

```ts
type Replace<S extends string, From extends string, To extends string> =
  S extends `${infer F}${From}${infer R}` ? `${F}${To}${R}` : S
```

我们也需要考虑 `From` 为空字符串的情况，此时我们直接返回 `S`。

## 答案

```ts
type Replace<S extends string, From extends string, To extends string> =
  From extends ''
    ? S
    : S extends `${infer F}${From}${infer R}`
      ? `${F}${To}${R}`
      : S
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type Replace<S extends string, From extends string, To extends string> =
  From extends ''
    ? S
    : S extends `${infer F}${From}${infer R}`
      ? `${F}${To}${R}`
      : S

// ---cut---
type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [模板字面量类型 Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
