---
url: /fe-oss/zod/index.md
---
&#x20;&#x20;

::: important 相比于 `ajv` / `joi` ，更推荐使用 `zod`
:::

## 概述

[**Zod** 官方文档](https://zod.dev){.read-more}

Zod 是一个以 **TypeScript 优先** 的运行时数据验证库，专为 Node.js 和浏览器环境设计。
它通过声明式模式（Schema）实现数据校验，并自动推断静态 TypeScript 类型，解决了类型声明与运行时验证的重复问题。

## 特性

* **TypeScript 优先**

  Zod 的核心优势在于将 **模式定义与类型推断无缝结合**。
  开发者只需定义一次验证规则，即可自动生成对应的 TypeScript 类型，无需手动维护类型声明。

  ```ts
  const UserSchema = z.object({
    username: z.string(),
    age: z.number().min(0)
  })
  type User = z.infer<typeof UserSchema> // 自动推断为 { username: string; age: number }
  ```

* **轻量与零依赖**

  * 核心库体积仅 **8 KB**（gzip 后约 2 KB），无第三方依赖。
  * 支持 Node.js、浏览器（含 IE11）及 Deno 环境

* **不可变性与链式 API**

  Zod 的 API 设计遵循 **函数式编程** 原则，所有方法（如 **.optional()**、**.array()**）均返回新实例，支持链式调用：

  ```ts
  const PasswordSchema = z.string().min(8).max(32).nonempty()
  ```

## 安装

::: npm-to

```sh
npm install zod
```

:::

## 使用

### 基本用法

```ts
import * as z from 'zod/v4'

const User = z.object({
  name: z.string(),
})

// some untrusted data...
const input = { /* stuff */ }

// the parsed result is validated and type safe!
const data = User.parse(input)

// so you can use it with confidence :)
console.log(data.name)
```

### 处理错误

```ts
try {
  Player.parse({ username: 42, xp: '100' })
}
catch (error) {
  if (error instanceof z.ZodError) {
    error.issues
    /* [
      {
        expected: 'string',
        code: 'invalid_type',
        path: [ 'username' ],
        message: 'Invalid input: expected string'
      },
      {
        expected: 'number',
        code: 'invalid_type',
        path: [ 'xp' ],
        message: 'Invalid input: expected number'
      }
    ] */
  }
}
```

```ts
const result = Player.safeParse({ username: 42, xp: '100' })
if (!result.success) {
  result.error // ZodError instance
}
else {
  result.data // { username: string; xp: number }
}
```

### 类型推断

```ts
const Player = z.object({
  username: z.string(),
  xp: z.number()
})

// extract the inferred type
type Player = z.infer<typeof Player>

// use it in your code
const player: Player = { username: 'billie', xp: 100 }
```

```ts
const mySchema = z.string().transform(val => val.length)

type MySchemaIn = z.input<typeof mySchema>
// => string

type MySchemaOut = z.output<typeof mySchema> // equivalent to z.infer<typeof mySchema>
// number
```

## 使用场景

* API 请求验证
* 表单集成
* 配置文件校验
