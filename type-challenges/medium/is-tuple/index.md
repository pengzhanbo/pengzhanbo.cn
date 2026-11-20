---
url: /type-challenges/medium/is-tuple/index.md
---
## 题目

Github: [IsTuple](https://github.com/type-challenges/type-challenges/blob/main/questions/04484-medium-istuple/README.md)

实现一个类型 `IsTuple`，它接受一个输入类型 `T` 并返回 `T` 是否为元组类型。

```ts
type case1 = IsTuple<[number]> // true
type case2 = IsTuple<readonly [number]> // true
type case3 = IsTuple<number[]> // false
```

## 解题思路

在 typescript 类型系统中，普通数组类型和元组类型的核心区别在于其 `length` 属性的类型。
数组的 `length` 是泛用的 `number` 类型，而 元组类型的 `length` 是具体的数组字面量类型（如 `2`）。
根据这个差异，我们可以通过条件类型来判断一个类型是否为元组类型。

**检查是否为数组类型：**

首先确定 `T` 是否继承自 `readonly any[]`（兼容普通数组和元组，包括只读元组）。

**判断 length 类型：**

若 `T` 是数组类型，进一步检查其 `length` 属性的类型是否为 `number`。若 `number extends T['length']` 成立，
说明 `T` 是普通数组（`length` 是 `number`），否则是元组（length 是具体数字）。

**别忘了处理传入的类型参数为 `never` 类型时的情况**

## 答案

```ts
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
    ? number extends T['length']
      ? false
      : true
    : false
```

## 验证

```ts twoslash
import type { Equal, Expect, NotEqual } from '~/tc-utils'

type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
    ? number extends T['length']
      ? false
      : true
    : false

// ---cut---
type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [递归条件类型 Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
* [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
