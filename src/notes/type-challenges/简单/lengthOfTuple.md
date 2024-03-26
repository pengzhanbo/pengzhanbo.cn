---
title: ✔️ Length of Tuple
createTime: 2022/12/01 02:21:05
author: pengzhanbo
permalink: /type-challenges/easy/length-of-tuple/
---

::: info 题目
Github: [length of tuple](https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/)

创建一个通用的Length，接受一个readonly的数组，返回这个数组的长度。

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

:::

### 解题思路

在 javascript 中， 通过 `length` 属性获取数组的长度，在类型上，也同样可以通过 `length` 获取数组的长度。
同时，需要约束 `T` 的类型为 只读数组。

### 答案

```ts
type Length<T extends readonly any[]> = T['length']
```

### 参考

> - [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
