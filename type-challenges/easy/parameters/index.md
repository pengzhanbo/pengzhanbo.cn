---
url: /type-challenges/easy/parameters/index.md
---
## 题目

Github: [Parameters](https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/)

实现内置的 `Parameters<T>` 类型，而不是直接使用它，可参考[TypeScript官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。

```ts
function foo(arg1: string, arg2: number): void {}

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
```

## 解题思路

通过 条件类型推断，获取函数的参数类型

## 答案

```ts
type MyParameters<T> = T extends (...args: infer R) => any ? R : never
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type MyParameters<T> = T extends (...args: infer R) => any ? R : never

// ---cut---
function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]
```

## 参考

> * [泛型 Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
> * [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
> * [条件类型内推断 Inferring Within Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
