---
url: /type-challenges/medium/kebab-case/index.md
---
## 题目

Github: [KebabCase](https://github.com/type-challenges/type-challenges/blob/main/questions/00612-medium-kebabcase/)

将 `camelCase` 或 `PascalCase` 字符串替换为 `kebab-case` 。

`FooBarBaz` -> `foo-bar-baz`

```ts
type FooBarBaz = KebabCase<'FooBarBaz'>
const foobarbaz: FooBarBaz = 'foo-bar-baz'

type DoNothing = KebabCase<'do-nothing'>
const doNothing: DoNothing = 'do-nothing'
```

## 解题思路

使用模板字面量类型，以及条件类型推断，获取字符串中的首个字符和剩下的字符串：

```ts
type KebabCase<S extends string, > = S extends `${infer L}${infer O}` ? never : never
```

对于首个字符，因为它总是小写的，所以直接使用 `Uncapitalize` 将首个字符转为小写。

```ts
type KebabCase<S extends string, > = S extends `${infer L}${infer O}`
  ? `${Uncapitalize<L>}${O}`
  : never
```

但是对于剩下的字符串，我们需要考虑其首个字母是否是大写，如果是大写，则需要拼接 `-` 并转为小写，
如果是小写，则不需要进行处理。

同样的，借助内置类型 `Uncapitalize`，先将 `O` 转为小写，然后再使用 `T extends Uncapitalize<O>` 来判断首字母是否小写

```ts
type KebabCase<S extends string, > = S extends `${infer L}${infer O}`
  ? T extends Uncapitalize<T>
    ? `${Uncapitalize<L>}${O}`
    : `${Uncapitalize<L>}-${O}`
  : never
```

很显然，我们还需要对 类型 `O` 进行递归处理，直到没有剩余的字符串为止。

```ts
type KebabCase<S extends string, > = S extends `${infer L}${infer O}`
  ? O extends Uncapitalize<O>
    ? `${Uncapitalize<L>}${KebabCase<O>}`
    : `${Uncapitalize<L>}-${KebabCase<O>}`
  : never
```

别忘了，在不满足 `S extends ${infer L}${infer O}` 的情况下，需要返回原字符串 `S` 。

## 答案

```ts
type KebabCase<S extends string, > = S extends `${infer L}${infer O}`
  ? O extends Uncapitalize<O>
    ? `${Uncapitalize<L>}${KebabCase<O>}`
    : `${Uncapitalize<L>}-${KebabCase<O>}`
  : S
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type KebabCase<S extends string, > = S extends `${infer L}${infer O}`
  ? O extends Uncapitalize<O>
    ? `${Uncapitalize<L>}${KebabCase<O>}`
    : `${Uncapitalize<L>}-${KebabCase<O>}`
  : S

// ---cut---
type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]
```

## 参考

* [模板字面量类型 Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [递归条件类型 Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
