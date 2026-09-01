---
url: /type-challenges/easy/tuple-to-object/index.md
---
## 题目

Github: [Tuple to Object](https://github.com/type-challenges/type-challenges/blob/main/questions/)

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple>
// expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

## 解题思路

解题的关键在于获取元组中的所有值，并将其作为新对象中的键和值。

可以使用 **索引类型** `T[number]` 从数组中获取所有值，通过 **映射类型**，遍历 `T[number]` 中的值，并返回新的类型，
其中 键 和 值 是 `T[number]` 的类型。

## 答案

```ts
type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P
}
```

## 验证

```ts twoslash
// @errors: 2540
import type { Equal, Expect } from '~/tc-utils'
type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P
}
// ---cut---
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type test = Expect<Equal<
  TupleToObject<typeof tuple>,
  { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y' }
>>
```

## 参考

> * [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
> * [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
