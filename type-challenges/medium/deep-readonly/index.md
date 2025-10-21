---
url: /type-challenges/medium/deep-readonly/index.md
---
## 题目

Github: [Deep Readonly](https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/)

实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

```ts
interface X {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

interface Expected {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

## 解题思路

通过 `readonly` 修饰属性为 只读属性。

通过 `T extends Record<any, any>` 判断是否为对象，如果是，使用 `readonly` 修饰属性为 只读属性，
并对 `T[P]` 递归调用 `DeepReadonly` 。

由于 `Function` 继承自 `Object`，所以需要单独处理 `Function` 类型。

## 答案

```ts
type DeepReadonly<T> = T extends Function
  ? T
  : T extends Record<any, any>
    ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
    : T
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type DeepReadonly<T> = T extends Function
  ? T
  : T extends Record<any, any>
    ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
    : T

// ---cut---
type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

interface X1 {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

interface Expected1 {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }
```

## 参考

* [索引类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
* [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [递归条件类型 Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
