---
url: /type-challenges/medium/diff/index.md
---
## 题目

Github: [Diff](https://github.com/type-challenges/type-challenges/blob/main/questions/00645-medium-diff/)

获取两个接口类型中的差值属性。

```ts
interface Foo {
  a: string
  b: number
}
interface Bar {
  a: string
  c: boolean
}

type Result1 = Diff<Foo, Bar> // { b: number, c: boolean }
type Result2 = Diff<Bar, Foo> // { b: number, c: boolean }
```

## 解题思路

::: tip 此解题思路来自 [type-challenges#3014](https://github.com/type-challenges/type-challenges/issues/3014)
:::

在对象中使用 `|` 与 `&` ，与在非对象中使用存在语义上的差异。

在集合对象中使用联合类型 `|` ，
官网 [working-with-union-types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#working-with-union-types) 有如下说明:

> Notice that given two sets with corresponding facts about each set, only the intersection of those facts applies to the union of the sets themselves.

```ts
interface Foo {
  name: string
  age: string
}
interface Bar {
  name: string
  age: string
  gender: number
}

type result = keyof (Foo | Bar) // "name" | "age"
```

在集合对象中使用交集类型 `&` ，可以见 [intersection-types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types) 给出的 demo:

```ts
interface Colorful {
  color: string
}
interface Circle {
  radius: number
}

type ColorfulCircle = keyof (Colorful & Circle) // "color" | "radius"
```

结合 `&` 与 `|` 的使用，我们能立马写出比如类型 `diff`

## 答案

```ts
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>

// ---cut---
interface Foo {
  name: string
  age: string
}
interface Bar {
  name: string
  age: string
  gender: number
}
interface Coo {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]
```

## 参考

* [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
* [映射类型中的键重映射 Key Remapping In Mapped Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)
* [联合类型 Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
* [交叉类型 Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
* [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [keyof 和查找类型 Keyof And Lookup Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
