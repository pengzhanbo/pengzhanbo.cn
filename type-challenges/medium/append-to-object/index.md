---
url: /type-challenges/medium/append-to-object/index.md
---
## 题目

Github: [AppendToObject](https://github.com/type-challenges/type-challenges/blob/main/questions/00527-medium-appendtoobject/)

实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型。

```ts
interface Test { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
```

## 解题思路

一开始可能会想到使用交叉类型来解决此挑战：

```ts
type AppendToObject<T, U extends PropertyKey, V> = T & { [K in U]: V }
```

然而我们需要留意到此挑战，需要 **返回带有新字段的接口类型**，这需要的是一个新的普通类型，而不是一个交叉类型。

首先我们可以先将 `T` 映射为一个普通类型：

```ts
type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof T]: T[K]
}
```

接下来，我们可以就可以在 `keyof T` 的联合类型中，添加 泛型 `U`，

```ts
type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof T | U]: T[K]
}
```

但是 `K` 如果为类型 `U` 时，很明显 `T[K]` 不满足要求，它的值类型应为 `V`：

```ts
type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V
}
```

## 答案

```ts
type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V
}
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V
}
// ---cut---
interface test1 {
  key: 'cat'
  value: 'green'
}

interface testExpect1 {
  key: 'cat'
  value: 'green'
  home: boolean
}

interface test2 {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

interface testExpect2 {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

interface test3 {
  key: 'cow'
  value: 'yellow'
  sun: false
}

interface testExpect3 {
  key: 'cow'
  value: 'yellow'
  sun: false
  moon: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'moon', false | undefined>, testExpect3>>,
]
```

## 参考

* [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [联合类型 Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
