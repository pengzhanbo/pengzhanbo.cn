---
url: /type-challenges/medium/readonly-2/index.md
---
## 题目

Github: [Readonly 2](https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/)

实现一个泛型 `MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

K指定应设置为`Readonly`的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
}

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property
todo.completed = true // OK
```

## 解题思路

泛型参数`K` 需要约束为 `T` 的属性集，同时默认值为 `T`的属性集；

创建一个只含有 只读属性的对象类型，通过 `in` 操作符，遍历`T` 的所有成员，映射给泛型属性 `P`；

创建一个只含有可读属性的对象类型， 通过 `as` 语法，重新映射给泛型属性 `P`；

合并两个对象类型即可实现 `MyReadonly<T, K>`

## 答案

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}
```

## 验证

```ts twoslash
import type { Alike, Expect } from '~/tc-utils'
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}

// ---cut---
type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description'>, Expected>>,
]

// @ts-expect-error ignore
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}
```

## 参考

* [交叉类型 Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
* [映射类型 Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
* [索引访问类型 Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
* [在泛型约束中使用类型参数 Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints)
* [映射类型中的键重映射 Key Remapping in Mapped Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)
