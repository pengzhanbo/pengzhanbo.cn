---
url: /type-challenges/easy/length-of-tuple/index.md
---
## 题目

Github: [length of tuple](https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/)

创建一个 `Length` 泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

## 解题思路

在 javascript 中， 通过 `length` 属性获取数组的长度，在类型上，也同样可以通过 `length` 获取数组的长度。
同时，需要约束 `T` 的类型为 只读数组。

## 答案

```ts
type Length<T extends readonly any[]> = T['length']
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type Length<T extends readonly any[]> = T['length']
// ---cut---
type tesla = Length<['tesla', 'model 3', 'model X', 'model Y']>
type spaceX = Length<['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']>

type cases = [
  Expect<Equal<tesla, 4>>,
  Expect<Equal<spaceX, 5>>,
]
```

## 参考

> * [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
