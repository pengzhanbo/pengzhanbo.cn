---
url: /type-challenges/medium/replace-keys/index.md
---
## 题目

Github: [ReplaceKeys](https://github.com/type-challenges/type-challenges/blob/main/questions/01130-medium-replacekeys/README.md)

实现一个类型 `ReplaceKeys`，用于替换联合类型中的键，如果某个类型没有该键，则跳过替换。该类型接受三个参数。

```ts
interface NodeA {
  type: 'A'
  name: string
  flag: number
}

interface NodeB {
  type: 'B'
  id: number
  flag: number
}

interface NodeC {
  type: 'C'
  name: string
  flag: number
}

type Nodes = NodeA | NodeB | NodeC

// 将 name 从 string 替换为 number，将 flag 从 number 替换为 string。
type ReplacedNodes = ReplaceKeys<
  Nodes,
  'name' | 'flag',
  { name: number, flag: string }
>
// {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string}

// 将 name 替换为 never
type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', { aa: number }>
// {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number}
```

## 解题思路

对于这个挑战，很明显需要使用 映射类型和 条件类型 来解决。

首先需要说明的是，在 Typescript 中，映射类型 也是 **分布式** 的。
这表示我们可以直接编写映 射类型来遍历接口的键，同时对联合类型具有分布性。

我们从最简单的开始。
从联合类型U中取出所有元素 (分布性)，对每个元素遍历其键 并返回一个副本。

```ts
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: U[K]
}
```

首先，我们需要检查 `K` 是否在需要更新的键列表 `T` 中，
与此同时，我们也不能确定 `Y` 中是否存在相同的键，因此也需要进行检查：

```ts
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]:
  K extends T // 是否在键列表中
    ? K extends keyof Y // 是否在 `Y` 中存在相同的键
      ? Y[K] // 返回新的类型
      : never
    : U[K] // 无需修改
}
```

## 答案

```ts
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: K extends T ? K extends keyof Y ? Y[K] : never : U[K]
}
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: K extends T ? K extends keyof Y ? Y[K] : never : U[K]
}
// ---cut---
interface NodeA {
  type: 'A'
  name: string
  flag: number
}

interface NodeB {
  type: 'B'
  id: number
  flag: number
}

interface NodeC {
  type: 'C'
  name: string
  flag: number
}

interface ReplacedNodeA {
  type: 'A'
  name: number
  flag: string
}

interface ReplacedNodeB {
  type: 'B'
  id: number
  flag: string
}

interface ReplacedNodeC {
  type: 'C'
  name: number
  flag: string
}

interface NoNameNodeA {
  type: 'A'
  flag: number
  name: never
}

interface NoNameNodeC {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type cases = [
  Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number, flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]
```

## 参考

* [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
