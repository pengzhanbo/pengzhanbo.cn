---
url: /type-challenges/medium/bem-style-string/index.md
---
## 题目

Github: [BemStyleString](https://github.com/type-challenges/type-challenges/blob/main/questions/03326-medium-bem-style-string/)

块、元素、修饰符方法（BEM）是CSS中一种流行的类命名规范。

例如，块组件可以表示为`btn`，依赖于该块的元素可以表示为`btn__price`，改变块样式的修饰符可以表示为`btn--big`或`btn__price--warning`。

实现`BEM<B, E, M>`，从这三个参数生成字符串联合类型。其中`B`是字符串字面量，`E`和`M`是字符串数组（可以为空）。

## 解题思路

略。

## 答案

```ts
type BEM<B extends string, E extends string[], M extends string[]> =
  `${B}${E extends [] ? '' : `__${E[number]}`}${M extends [] ? '' : `--${M[number]}`}`
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'
type BEM<B extends string, E extends string[], M extends string[]> =
  `${B}${E extends [] ? '' : `__${E[number]}`}${M extends [] ? '' : `--${M[number]}`}`

// ---cut---
type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success'>>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large'>>,
]
```

## 参考

* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [模板字面量类型 Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
