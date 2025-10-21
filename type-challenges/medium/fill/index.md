---
url: /type-challenges/medium/fill/index.md
---
## 题目

Github: [Fill](https://github.com/type-challenges/type-challenges/blob/main/questions/04518-medium-fill/README.md)

Fill，一个常见的JavaScript函数，现在让我们用类型来实现它。
`Fill<T, N, Start?, End?>`，如你所见，`Fill` 接受四种类型的参数，其中 `T` 和 `N` 是必需参数，
而 `Start` 和 `End` 是可选参数。
这些参数的要求是：`T` 必须是元组，`N` 可以是任何类型的值，`Start` 和 `End` 必须是大于或等于 `0` 的整数。

```ts
type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
```

## 解题思路

首先，我们从类型声明开始，类型 `Fill` 接受五个参数 `T`，`N`，`Start`，`End`，`Count`，`Flag`，
`T` 是一个元组，`N` 可以是任何类型的值, `Start` 和 `End` 必须是大于或等于 `0` 的整数。

**通过 `Count` 数组隐式追踪索引：**

* 在 `Count` 等于 `End` 的时候需要结束替换，也就是结束条件
* 当 `Count` 等于 `Start` 的时候是开始替换的条件，递归处理数组替换即可，注意需要把 `T` 换成新的

**使用 `Flag` 标记当前是否需要替换：**

* 通过 `Flag` 的默认值 `Count['length'] extends Start ? true : false` 智能触发状态切换。
* 仅在未显式传递 `Flag` 时 重新计算状态，实现状态锁存：
  * 当第一次进入填充区间时，`Flag` 被设置为 `true`
  * 后续递归中显式传递 `Flag` 参数，保持状态不变

**`Count['length'] extends End` 作为终止条件**

剩余元素直接保留原样，确保处理效率

## 答案

```ts
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Count extends any[] = [],
  Flag extends boolean = Count['length'] extends Start ? true : false
> =
  Count['length'] extends End
    ? T
    : T extends [infer R, ...infer U]
      ? Flag extends false
        ? [R, ...Fill<U, N, Start, End, [...Count, 0]>]
        : [N, ...Fill<U, N, Start, End, [...Count, 0], Flag>]
      : T
```

## 验证

```ts twoslash
import type { Equal, Expect, NotEqual } from '~/tc-utils'

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Count extends any[] = [],
  Flag extends boolean = Count['length'] extends Start ? true : false
> =
  Count['length'] extends End
    ? T
    : T extends [infer R, ...infer U]
      ? Flag extends false
        ? [R, ...Fill<U, N, Start, End, [...Count, 0]>]
        : [N, ...Fill<U, N, Start, End, [...Count, 0], Flag>]
      : T

// ---cut---
type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [条件类型中的类型推断 Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
* [可变元组类型 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
* [索引访问类型 Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
