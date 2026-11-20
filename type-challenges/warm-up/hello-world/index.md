---
url: /type-challenges/warm-up/hello-world/index.md
---
## 题目

Github: [Hello World](https://github.com/type-challenges/type-challenges/tree/main/questions/00013-warm-hello-world)

这个简单的提问希望让你可以快速上手 Type Challenges。在这里，我们使用了一些神奇的技巧让 TypeScript 通过自身的类型系统来实现自动判题。

在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。

```ts
// 期望是一个 string 类型
type HelloWorld = any
```

你需要使得如下这行不会抛出异常

```ts
type test = Expect<Equal<HelloWorld, string>>
```

## 解题思路

这道题目仅作为热身，用于熟悉 `type-challenges`， 了解如何接受挑战。
在这里，只需要将 `any` 改为 `string` 即可。

## 答案

```ts
type HelloWorld = string
```

## 验证

```ts twoslash
import { Equal, Expect } from '~/tc-utils'
type HelloWorld = string
// ---cut---
type test = Expect<Equal<HelloWorld, string>>
```
