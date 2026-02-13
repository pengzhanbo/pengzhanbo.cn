---
url: /type-challenges/medium/map-types/index.md
---
## 题目

实现 `MapTypes<T, R>`，它将对象 `T` 中的类型转换为由类型 `R` 定义的不同类型，`R` 的结构如下：

```ts
interface StringToNumber {
  mapFrom: string // 值为字符串的键的值
  mapTo: number // 将被转换为数字
}
```

示例：

```ts
interface StringToNumber { mapFrom: string, mapTo: number }
MapTypes<{ iWillBeANumberOneDay: string }, StringToNumber>
// gives { iWillBeANumberOneDay: number; }
```

请注意，用户可以提供一个联合类型：

```ts
interface StringToNumber { mapFrom: string, mapTo: number }
interface StringToDate { mapFrom: string, mapTo: Date }

MapTypes<{ iWillBeNumberOrDate: string }, StringToDate | StringToNumber>
// gives { iWillBeNumberOrDate: number | Date; }
```

如果我们在映射中不存在这种类型，就让它保持原样：

```ts
interface StringToNumber { mapFrom: string, mapTo: number }
MapTypes<{ iWillBeANumberOneDay: string, iWillStayTheSame: Function }, StringToNumber>
// // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }
```

## 解题思路

## 答案

```ts
type MapTypes<T, R extends { mapFrom: unknown, mapTo: unknown }> = {
  [P in keyof T]: T[P] extends R['mapFrom']
    ? R extends { mapFrom: T[P] }
      ? R['mapTo']
      : never
    : T[P]
}
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

type MapTypes<T, R extends { mapFrom: unknown, mapTo: unknown }> = {
  [P in keyof T]: T[P] extends R['mapFrom']
    ? R extends { mapFrom: T[P] }
      ? R['mapTo']
      : never
    : T[P]
}
// ---cut---
type cases = [
  Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string, mapTo: [] }>, { stringToArray: [] }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string, mapTo: number }>, { stringToNumber: number }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string, skipParsingMe: boolean }, { mapFrom: string, mapTo: number }>, { stringToNumber: number, skipParsingMe: boolean }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string, mapTo: Date } | { mapFrom: string, mapTo: null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string, mapTo: Date | null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>, mapTo: string[] }>, { fields: string[] }>>,
  Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean, mapTo: never }>, { name: string }>>,
  Expect<Equal<MapTypes<{ name: string, date: Date }, { mapFrom: string, mapTo: boolean } | { mapFrom: Date, mapTo: string }>, { name: boolean, date: string }>>,
]
```

## 参考

* [泛型 Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
* [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
* [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
