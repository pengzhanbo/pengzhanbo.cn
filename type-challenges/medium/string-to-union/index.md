---
url: /type-challenges/medium/string-to-union/index.md
---
## 题目

Github: [StringToUnion](https://github.com/type-challenges/type-challenges/blob/main/questions/00531-medium-string-to-union/)

实现一个将接收到的 `String` 参数转换为一个字母 `Union` 的类型。

```ts
type Test = '123'
type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"
```

## 解题思路

通过模板字面量类型 和 条件类型推断，从字符串中取出一个个字符，并使用 尾递归的方式，将字符串转为联合类型。

## 答案

```ts
type StringToUnion<S extends string>
  = S extends `${infer L}${infer R}` ? `${L | StringToUnion<R>}` : never
```

## 验证

```ts twoslash
import { Equal, Expect } from '~/tc-utils'
type StringToUnion<S extends string>
  = S extends `${infer L}${infer R}` ? `${L | StringToUnion<R>}` : never

// ---cut---
type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]
```

## 参考

* [模板字面量类型 Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [递归条件类型 Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
* [联合类型 Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
