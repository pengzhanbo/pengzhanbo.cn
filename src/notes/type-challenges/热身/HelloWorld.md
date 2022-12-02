---
title: ✔️ Hello World
createTime: 2022/11/30 02:14:31
author: pengzhanbo
permalink: /note/type-challenges/warm-up/hello-world/
---

::: info 题目
Github: [Hello World](https://github.com/type-challenges/type-challenges/tree/main/questions/00013-warm-hello-world)

这个简单的提问希望让你可以快速上手 Type Challenges。在这里，我们使用了一些神奇的技巧让 TypeScript 通过自身的类型系统来实现自动判题。

在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。

``` ts
// 期望是一个 string 类型
type HelloWorld = any
```
```ts
// 你需要使得如下这行不会抛出异常
type test = Expect<Equal<HelloWorld, string>>
```
:::

### 解题思路

这道题目仅作为热身，只要稍微有学习过 `typescript`，有个入门的基础，都能很容易做出来。

::: details answer
```ts
type HelloWorld = string
```
:::
