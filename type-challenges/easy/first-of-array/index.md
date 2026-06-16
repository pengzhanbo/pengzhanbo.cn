---
url: /type-challenges/easy/first-of-array/index.md
---
## 题目

Github: [First of array](https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/)

实现一个 `First<T>` 泛型，它接受一个数组T并返回它的第一个元素的类型。

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // 应推导出 'a'
type head2 = First<arr2> // 应推导出 3
```

## 解题思路

获取数组的第一个元素类型，首先想到通过 **索引类型**，通过 `T[0]` 获取类型，
但是这里会有一个临界情况，如果传入的是一个空数组，会导致 `T[0]` 不能正常工作，因为它没有元素。

所以在获取数组的第一个元素类型前，需要检查数组是否为空。
可以通过 **条件类型** 推断数组是否为空，如果为空，则什么都不返回。

## 答案

```ts
type First<T extends any[]> = T extends [] ? never : T[0]
```

## 验证

```ts twoslash
// @errors: 2540
import type { Equal, Expect } from '~/tc-utils'
type First<T extends any[]> = T extends [] ? never : T[0]
// ---cut---
type cases = [
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<['a', 'b', 'c']>, 'a'>>,
  Expect<Equal<First<[3, 2, 1]>, 3>>
]
```

## 参考

> * [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
> * [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
