---
url: /type-challenges/medium/object-entries/index.md
---
## 题目

Github: [ObjectEntries](https://github.com/type-challenges/type-challenges/blob/main/questions/02946-medium-objectentries/)

实现 `Object.entries` 的类型版本

```ts
interface Model {
  name: string
  age: number
  locations: string[] | null
}
type modelEntries = ObjectEntries<Model>
// ['name', string] | ['age', number] | ['locations', string[] | null];
```

## 解题思路

在 Typescript 中，条件类型推断是分布式的，因此我们可以通过条件类型推断，从 对象类型 中，利用 `key` 推断
形成新的元组：

```ts
type ObjectEntries<T extends object, K extends keyof T = keyof T>
  = K extends K ? [K, T[K]] : never
```

也许会觉得到这里这个挑战就完成了，但是实际情况稍微有些麻烦。

我们知道，在 对象类型中，存在 必要属性 和 可选属性：

```ts twoslash
interface Mode {
  name: string // 必要属性
  arg?: number // 可选属性
// ^?
}
```

那么 `Mode` 应用 `ObjectEntries`, 得到的结果为：

```ts twoslash
type ObjectEntries<T extends object, K extends keyof T = keyof T>
  = K extends K ? [K, T[K]] : never

interface Mode {
  name: string // 必要属性
  arg?: number // 可选属性
}
// ---cut---
type a = ObjectEntries<Mode>
//   ^?
//
```

可以看到，在结果中， `arg` 的 `value` 类型被转为了包含 `undefined` 的 联合类型，它应该只是 `number` 类型 。

这里我们可以通过 `Required<T>` 将 对象类型的所有属性全部转为 必要属性，以消除 可选属性中的 `undefined`：

```ts
type ObjectEntries<T extends object, K extends keyof T = keyof T>
  = K extends K ? [K, Required<T>[K]] : never
```

```ts twoslash
type ObjectEntries<T extends object, K extends keyof T = keyof T>
  = K extends K ? [K, Required<T>[K]] : never

interface Mode {
  name: string // 必要属性
  arg?: number // 可选属性
}
// ---cut---
type a = ObjectEntries<Mode>
//   ^?
//
```

但是，如果可选属性的值类型就是 `undefined` 呢？

```ts twoslash
type ObjectEntries<T extends object, K extends keyof T = keyof T>
  = K extends K ? [K, Required<T>[K]] : never
// ---cut---
interface Mode {
  name: string // 必要属性
  arg?: undefined // 可选属性
}

type a = ObjectEntries<Mode>
//   ^?
//
```

可以看到，其结果为 `['arg', never]`，很明显不符合预期，它应该是 `undefined` 类型。
针对此情况，还需要通过条件类型推断对 值类型为 `undefined` 进行处理。

## 答案

```ts
type ObjectEntries<T extends object, K extends keyof T = keyof T>
  = K extends K ? [K, T[K] extends undefined ? undefined : Required<T>[K]] : never
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type ObjectEntries<T extends object, K extends keyof T = keyof T>
  = K extends K ? [K, T[K] extends undefined ? undefined : Required<T>[K]] : never

// ---cut---
interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
* [`keyof` 和查找类型 `keyof` and lookup types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
