---
title: TypeScript5.4 值得关注的新特性
createTime: 2024/02/23 21:13:11
tags:
  - typescript
permalink: /article/0aqe7kd8/
---

2024年2月22日，[TypeScript 发布了 5.4 版本的候选版本](https://devblogs.microsoft.com/typescript/announcing-typescript-5-4-rc/)。其中，有两个新特性，非常值得我们关注，它们有效的提高了开发体验。

<!-- more -->

## 保留上次赋值后的类型收缩

在我们编写 typescript 代码时，通常需要检查变量，找出更具体的类型:

```ts
function foo(x: string | number) {
  if (typeof x === 'string') {
    // typescript 可以推断出当前 `x` 的类型为 `string`
    return x.toUpperCase()
  }
}
```

但是，在这里通常会遇到的一个痛点是，`x` 缩窄后的类型并不总是保留函数的闭包中：

```ts
function getUrls(url: string | URL, names: string[]) {
  if (typeof url === 'string') {
    url = new URL(url)
  }
  return names.map((name) => {
    url.searchParams.set('name', name)
    //      ^^^^^^^^^^^^
    // error:
    //   Property 'searchParams' does not exist on type 'string | URL'.
    //   Property 'searchParams' does not exist on type 'string'.
    return url.toString()
  })
}
```

我们读这段代码时，可以明确知道 `url` 在进入 `names.map()` 回调函数中时是 `URL` 类型。
但是，在 `typescript@5.4` 之前，typescript 会假设 `url` 在进入 回调函数中后，其类型 `URL` 是不安全的，认为它可能
会在其他的地方发生变化。

而在这个例子中，回调函数始终在 `url` 完成赋值后创建，并且它也是最后一次赋值，所以 `url` 的类型总是 `URL`。
`typescript@5.4` 利用这一点，使类型收缩变得更加智能。
在 **非提升函数（non-hoisted functions）** 中使用 **参数** 和 **通过 `let` 声明的变量** 时，`typescript` 检查器会
查找最后一个赋值点，如果能够找到，`typescript` 就可以安全的对该变量做类型收缩。

因此，在 `typescript@5.4` 中，上面的例子将不再报错。

但是请注意，如果变量在嵌套函数中的任何位置赋值，则不会进行缩窄分析。这是因为没有办法确定以后是否会调用该函数。

```ts
function printValueLater(value: string | undefined) {
  if (value === undefined) {
    value = 'missing!'
  }

  setTimeout(() => {
    // 修改 `value`，即使是以不影响其类型的方式，也会使闭包中的类型收缩无效。
    value = 'changed!'
  }, 500)

  setTimeout(() => {
    console.log(value.toUpperCase())
    //                ^^^^^
    // error: 'value' is possibly 'undefined'.
  }, 1000)
}
```

## Utility Type: `NoInfer`

在 进行 泛型函数 调用时，typescript 可以根据传入的内容推断 参数类型：

```ts
function foo<T>(x: T) {}

// 我们可以告诉typescript `x` 的类型是 `number`
foo<number>(1)

// typescript 也可以推断 `x` 的类型是 `string`
foo('bar')
```

然而，typescript 并不总是很清楚要推断的 “最佳” 类型是什么。这可能导致 `typescript` 拒绝有效的调用、
接受有问题的调用，或者只是在捕获错误时报告更糟糕的错误消息。

例如，我们实现一个 `createStreetLight` 函数，它传入 颜色名称列表以及可选的默认颜色。

```ts
function createStreetLight<C extends string>(colors: C[], defaultColor?: C) {
  // ...
}

createStreetLight(['red', 'yellow', 'green'], 'red')
```

当我们传入的 `defaultColor` 不在 `colors` 列表中时，会发生什么？

```ts twoslash
function createStreetLight<C extends string>(colors: C[], defaultColor?: C) {
  // ...
}
// 这不符合预期，但还是通过了检查
createStreetLight(['red', 'yellow', 'green'], 'blue')
// ^?
//
//
//
```

在这个调用中，类型推断会认为 `"blue"` 与 `"red"`、`"yellow"` 和 `"green"` 都是 有效的，
因此，不会拒绝调用，而是推断类型 `C` 为 `"red" | "yellow" | "green" | "blue"`。
但这显然不符合我们的预期！

目前我们通常是添加一个新的类型参数，该参数由现有的类型参数进行约束。

```ts
function createStreetLight<C extends string, D extends C>(colors: C[], defaultColor?: D) {}

createStreetLight(['red', 'yellow', 'green'], 'blue')
//                                            ^^^^^^
// error:
//   Argument of type '"blue"' is not assignable to parameter of
//   type '"red" | "yellow" | "green" | undefined'.
```

这是可行的，但是有点尴尬。因为 签名 `createStreetLight` 可能不会在其他地方使用泛型参数 `D`。
虽然看起来还不错，但是在签名中只使用一次类型参数通常是一种 代码气味。

这就是 在 `TypeScript@5.4` 中引入 `NoInfer<T>` 的原因。
将类型用 `NoInfer<...>` 包围起来，会向 `typescript` 发送信号，
使其不要深入挖掘并匹配内部类型以寻找类型推断的候选对象。

```ts
function createStreetLight<C extends string>(colors: C[], defaultColor?: NoInfer<C>) {
  // ...
}

createStreetLight(['red', 'yellow', 'green'], 'blue')
//                                            ~~~~~~
// error:
//   Argument of type '"blue"' is not assignable to parameter
//   of type '"red" | "yellow" | "green" | undefined'.
```

排除 `defaultColor` 类型进行推理意味着 `"blue"` 永远不会作为推理候选，并且类型检查器可以拒绝它。
