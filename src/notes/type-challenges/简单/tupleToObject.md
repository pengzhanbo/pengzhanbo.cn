---
title: ✔️ Tuple to Object
createTime: 2022/12/01 12:59:56
author: pengzhanbo
permalink: /note/type-challenges/o8xxk0qs/
---

::: info 题目
Github: [Tuple to Object](https://github.com/type-challenges/type-challenges/blob/main/questions/)

传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple>
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```
:::

### 解题思路

基础知识点：
- `in` 操作符
- `number` 索引获取元组所有元素的 联合类型
- 泛型类型约束

**元组转为联合类型，并将这个联合类型作为对象的属性约束，同时作为其值；对于泛型入参，需要将其约束为元组，同时保证元组的元素类型可以作为对象的属性。**

- 元组转联合类型
  ```ts
  const tuple = ['small', 'medium', 'large'] as const

  type ToUnion<T extends readonly unknown[]> = T[number]

  type TupleUnion = ToUnion<typeof tuple> //  'small' | 'medium' | 'large'
  ```

::: details answer
```ts
type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P
}
```
:::

