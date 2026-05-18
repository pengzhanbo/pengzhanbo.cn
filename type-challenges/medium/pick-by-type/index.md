---
url: /type-challenges/medium/pick-by-type/index.md
---
## 题目

Github: [PickByType](https://github.com/type-challenges/type-challenges/blob/main/questions/02595-medium-pickbytype/)

从 `T` 中选取一组类型可分配给 `U` 的属性。

```ts
type OnlyBoolean = PickByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { isReadonly: boolean; isEnable: boolean; }
```

## 解题思路

这个挑战比较简单。让我们从 映射类型 开始，从 `T` 中获取所有的 键，以及对应的 值：

```ts
type PickByType<T, U> = {
  [P in keyof T]: T[P]
}
```

接下来，我们通过 `as` 对 键进行重映射，过滤不满足 `U` 的情况：

```ts
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}
```

## 答案

```ts
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}

// ---cut---
interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean, isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]
```

## 参考

* [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
* [通过 `as` 进行按键重映射 Key remapping via `as`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [`keyof` 和查找类型 `keyof` and lookup types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
