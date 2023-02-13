---
title: ✔️ Length of Tuple
createTime: 2022/12/01 02:21:05
author: pengzhanbo
permalink: /note/type-challenges/easy/length-of-tuple/
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

知识点：
- 泛型约束
- `readonlyArray` 类型
- `length` 索引访问


**泛型入参类型约束为 `readonly array`, 通过 `T['length']` 获取数组长度**


::: details answer
``` ts
type Length<T extends readonly any[]> = T['length']
```
:::
