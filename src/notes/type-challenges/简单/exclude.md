---
title: ✔️ Exclude
createTime: 2022/12/01 04:16:32
author: pengzhanbo
permalink: /note/type-challenges/easy/exclude/
---

::: info 题目
Github: [Exclude](https://github.com/type-challenges/type-challenges/blob/main/questions/)

实现内置的`Exclude <T, U>`类型，但不能直接使用它本身。

> 从联合类型T中排除U的类型成员，来构造一个新的类型。

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```
:::

### 解题思路

知识点：
- 联合类型
- `extends` 类型继承 （这里用于判断联合类型`T`中的成员是否继承自泛型`U`）


**遍历判断联合类型`T`中的成员是否继承自泛型U，如果是，则返回never，否则返回`T`**

:::details answer
```ts
type MyExclude<T, U> = T extends U ? never : T
```
:::
