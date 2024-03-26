---
title: ➖ TypeLookup
createTime: 2022/12/01 04:36:25
author: pengzhanbo
permalink: /type-challenges/medium/type-lookup/
---

::: info 题目
Github: [Type lookup](https://github.com/type-challenges/type-challenges/blob/main/questions/00062-medium-type-lookup/)

有时，您可能希望根据某个属性在联合类型中查找类型。

在此挑战中，我们想通过在联合类型`Cat | Dog`中搜索公共type字段来获取相应的类型。换句话说，在以下示例中，我们期望`LookUp<Dog | Cat, 'dog'>`获得`Dog`，`LookUp<Dog | Cat, 'cat'>`获得`Cat`。

```ts
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
```

:::

::: details Answer

```ts
type LookUp<U, T> = U extends { type: T } ? U : never
```

:::
