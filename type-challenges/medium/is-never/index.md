---
url: /type-challenges/medium/is-never/index.md
---
## 题目

Github: [IsNever](https://github.com/type-challenges/type-challenges/blob/main/questions/01042-medium-isnever/)

实现一个类型 `IsNever`，它接受输入类型 `T`。如果 `T` 解析为 `never`，则返回 `true`，否则返回 `false`。

```ts
type A = IsNever<never> // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false
```

## 解题思路

在 typescript 中，我们不能通过 `T extends never ？ true : false` 判断一个类型是否为 `never`，
因为 在 `T extends never` 中 `never` 本质上是一个没有成员的联合类型，
这导致了 `never extends never ? true : false` 整体被跳过了，得到的结果为 `never` , 而不是 `true/false`。

要避免这种情况，可以在`extends` 两边的类型用方括号包裹，这可以避免 触发条件类型分支。

## 答案

```ts
type IsNever<T> = [T] extends [never] ? true : false
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type IsNever<T> = [T] extends [never] ? true : false

// ---cut---
type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]
```

## 参考

* [Never Types](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [泛型 Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
