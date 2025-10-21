---
url: /type-challenges/medium/promise-all/index.md
---
## 题目

Github: [Promise.all](https://github.com/type-challenges/type-challenges/blob/main/questions/00020-medium-promise-all/)

传入函数`PromiseAll`，它接受PromiseLike对象数组，返回值应为`Promise<T>`，其中`T`是解析的结果数组。

```ts
const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

// 应推导出 `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)
```

## 解题思路

这个挑战要求我们从 `Promise.all` 方法的入参中，提取出 参数类型。
`Promise.all` 接收一个数组参数，数组的每个成员可以是不同的类型，这也包括 `Promise<T>` 类型,
对于 `Promise<T>` 类型，需要递归展开获取 `T` 类型。

这个挑战实际上可以转换为 对 数组的每个成员进行递归展开，即对每个成员进行 `Awaited` 的展开操作。
我们已经在 [简单 > Awaited](../简单/189.awaited.md) 中完成了该挑战：

```ts
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T
```

因此，我们只需要完成 参数的类型约束，再对返回类型进行做 映射类型 的操作即可。

## 答案

```ts
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T

declare function PromiseAll<T extends any[]>(
  values: readonly [...T],
): Promise<{
  [K in keyof T]: Awaited<T[K]>
}>
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T

declare function PromiseAll<T extends any[]>(
  values: readonly [...T],
): Promise<{
  [K in keyof T]: Awaited<T[K]>
}>

// ---cut---
const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
]
```

## 参考

* [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
* [泛型 Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型内推断 Inferring Within Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
