---
title: 为什么你应该停止使用 enum
createTime: 2026/01/06 15:33:00
permalink: /article/wu41neza/
tags:
  - typescript
---

## 什么是 enum ？{#what-is-enum}

在 TypeScript 中，`enum` 是一种用于定义一组命名常量的数据类型。它看起来很像其他语言中的枚举，例如 C# 或 Java：

```ts
// 定义一个枚举
enum Status {
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
}

// 使用枚举
let current: Status = Status.Pending
console.log(current) // 输出: PENDING
```

枚举被设计为既能作为 ==类型== 使用，也能作为 ==值== 使用，这让它们看起来很方便。
然而，在 TypeScript 项目中，尤其是现代前端开发中，枚举并不是最佳实践。
接下来，我们将深入探讨为什么你应该考虑丢弃 **枚举** ，转向更现代、更轻量级的替代方案。

## 为什么应该停止使用 enum ？{#why-stop-using-enum}

### 运行时开销 {#runtime-overhead}

枚举会生成额外的 JavaScript 代码。
当编译器将 TypeScript 转换为 JavaScript 时，枚举不仅会留下类型声明，还会生成运行时的对象字面量。

```ts
// TypeScript 代码
enum Color {
  Red,
  Green,
  Blue
}
```

```js
// 编译后的 JavaScript
let Color;
(function (Color) {
  Color[Color.Red = 0] = 'Red'
  Color[Color.Green = 1] = 'Green'
  Color[Color.Blue = 2] = 'Blue'
})(Color || (Color = {}))
```

这段代码在运行时占用了内存。对于追求极致性能的移动前端应用来说，这可能是不可忽视的开销。

### 打包体积膨胀 {#bundle-size-increase}

正如上述编译后的代码：

```js
// 编译后的 JavaScript
let Color;
(function (Color) {
  Color[Color.Red = 0] = 'Red'
  Color[Color.Green = 1] = 'Green'
  Color[Color.Blue = 2] = 'Blue'
})(Color || (Color = {}))
```

即使你没有在代码中使用枚举的值，它依然会被打包到最终的 bundle 中。这段代码会增加了几 KB 的体积。

::: warning 在大型框架中，多个枚举会累积成显著的体积负担。
:::

### 与 tree-shaking 不兼容 {#incompatible-with-tree-shaking}

现代打包工具（如 `Webpack`、`Rollup` 或 `Vite`）都支持 ==Tree-shaking== ，即在打包时移除未使用的代码。
然而，TypeScript 枚举却与这一机制存在兼容性问题。

由于枚举既定义了类型又生成了值，即使在代码中只引用了类型，运行时对象也可能被保留，导致 Tree-shaking 失效。

::: tip 解决方案
使用 `const enum` 可以在某些情况下解决问题，但它要求开启 `preserveConstEnums` 选项，并且会牺牲一些开发体验。
:::

一个在 [Stack Overflow 上的热门问题](https://stackoverflow.com/questions/68720866/why-does-webpack-5-include-my-unused-typescript-enum-exports-even-when-tree-sha)
指出：即使使用了 `const enum`，`Webpack 5` 仍然可能包含未使用的枚举导出。

### 不是纯粹的类型 {#not-pure-type}

枚举是一种“双重身份”的结构：它既是一个 ==类型== ，又是一个 ==值== 。
这种模糊的界限在跨模块使用时会导致问题。

```ts
// module-a.ts
enum Status {
  Active = 'active',
  Inactive = 'inactive'
}

// module-b.ts
import { Status } from './module-a'

// 这里 Status 既是类型，也是值
const userStatus: Status = Status.Active
```

这种设计在类型系统中引入了不必要的运行时依赖。
相比之下，联合类型（Union Types）是纯粹的类型，完全不会生成运行时代码。

### 不兼容 ES6+ {#not-compatible-with-es6-plus}

TypeScript `enum` 不是 ECMAScript 标准的一部分。

这意味着它无法被浏览器或 Node.js 原生识别。
当你使用 ES 模块进行开发时，枚举总是需要编译转换，增加了构建步骤的复杂性。

而像 `as const` 这样的现代 TypeScript 特性，生成的代码更贴近原生 JavaScript，更易于与现代工具链集成。

## enum 替代方案 {#enum-alternatives}

### 联合类型 + 字符串字面量 {#union-types-and-string-literals}

```ts twoslash
// 代替枚举
type Status = 'PENDING' | 'FULFILLED' | 'REJECTED'

let current: Status = 'PENDING' // 纯类型，无运行时开销
```

**联合类型**：

- 零运行时代码生成
- 完美支持 **Tree-shaking**
- 类型安全和自动补全
- 更简洁的语法

### `as const` 对象 {#as-const-object}

```ts twoslash
// 代替枚举
const Status = {
  Pending: 'PENDING',
  Fulfilled: 'FULFILLED',
  Rejected: 'REJECTED',
} as const

type Status = typeof Status[keyof typeof Status]
//    ^?
//

// 使用
const current = Status.Pending // 类型安全，且生成简单对象
```

这种方法结合了运行时值和类型推断的优势，同时保持低开销。

### Symbol （特定场景） {#symbol}

对于需要唯一标识的场景，可以使用 `Symbol`，但需注意兼容性和内存开销。

## 枚举的适用场景（如果有的话） {#use-cases}

虽然强烈建议避免使用枚举，但在极少数情况下，它们可能仍有合理性：

- **与遗留代码的深度集成**：如果团队已有大量基于枚举的代码，全面重构的成本可能过高。
- **需要运行时反射**：如果你确实需要将枚举作为值进行遍历或序列化，枚举可能比联合类型更方便。

即便如此，也建议对这些场景进行严格评估，并考虑逐步迁移到更轻量的方案。

## 迁移步骤 {#migration-steps}

:::steps

- **评估现有枚举**

  列出项目中所有的枚举定义，评估它们的使用频率和影响范围。

- **替换为联合类型**

  对于大多数场景，直接将枚举值提取为字符串字面量的联合类型。

- **使用 as const 对象**

  局搜索并替换所有旧枚举的使用点。

- **验证打包结果**
  使用 source-map-explorer 或类似工具确认 bundle 体积是否减小。

:::

## 总结 {#summary}

TypeScript 枚举虽然初期使用便捷，但它们带来了 **运行时开销**、**树摇不兼容** 以及 **非标准语法** 等问题。
在现代前端开发中，使用 **联合类型** 和 **`as const` 对象** 是更轻量、更类型安全且更符合 JavaScript 标准的做法。

在考虑使用枚举时，问问自己：“我真的需要运行时值吗？” 如果答案是否定的，果断拥抱联合类型吧！
你的代码体积、构建速度和团队维护性都会因此受益。

## 参考

- [为什么你应该避免在 TypeScript 中使用枚举](https://medium.com/@hanyikoh/why-you-should-avoid-using-enum-in-typescript-487cc79dceb6)
- [TypeScript 枚举：用例和替代方案](https://2ality.com/2025/01/typescript-enum-patterns.html)
- [为什么 TypeScript 枚举会增加 Angular 包体积](https://dev.to/rohtashsethi/why-typescript-enums-increase-angular-bundle-size-and-how-to-fix-it-1908)
- [Webpack 5 为何包含未使用的 TypeScript 枚举](https://stackoverflow.com/questions/68720866/why-does-webpack-5-include-my-unused-typescript-enum-exports-even-when-tree-sha)
