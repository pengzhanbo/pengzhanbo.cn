---
url: /article/wzcjdidr/index.md
---
:::center
![jsr logo](/images/jsr-logo.svg){style="width:100%;max-width:128px;margin-bottom:16px;"}
:::

## 介绍

最近，**Deno** 发布了一个 [Javascript Registry (JSR)](https://jsr.io/)，一个新的 JavaScript 包注册表。
它类似于 npm ，但不是一个包管理工具，而是提供 包注册、包发布的包存储服务。

它可以搭配 `npm`, `yarn` 和 `pnpm` 等一起使用，支持 `Node.js` 、`Deno`、`Bun` 和 `browser` 等运行时。

JSR 的目标不是为了取代 NPM，而是作为 NPM 的超集，更符合 现代 JavaScript 开发者的需求，提高 开发者的体验，
并在 可靠性、安全性、性能等各方面得到更好的支持。

## 使用 JSR

你可以在任何支持 ES 模块的运行时中使用 JSR 包，例如 Deno、Node.js、Bun、Cloudflare Workers 等。
你还可以将 JSR 包与支持 ES 模块的构建工具一起使用，例如 Vite、esbuild、Webpack 和 Rollup 。

你可以使用以下任意命令，将 JSR 包导入到你的项目中：

```sh
# deno
deno add @luca/cases

# npm (以下选项之一，取决于你的包管理器)
npx jsr add @luca/cases
yarn dlx jsr add @luca/cases
pnpm dlx jsr add @luca/cases
bunx jsr add @luca/cases
```

如果是使用 Deno, `deno add` 命令将在 `deno.json` 文件中生成指定的 JSR 模块添加导入映射条目：
::: code-tabs
@tab deno.json

```json
{
  "imports": {
    "@luca/cases": "jsr:@luca/cases@^1.0.1"
  }
}
```

:::

对于 npm 和 npm 兼容的包管理器， jsr 命令会将依赖项添加到您的 `package.json` 文件，
并将 `.npmrc` 文件添加到您的项目根目录，其中包含将 JSR 与 npm 结合使用所需的配置。

::: code-tabs
@tab package.json

```json
{
  "dependencies": {
    "@luca/cases": "npm:@jsr/luca__cases@^1.0.1"
  }
}
```

:::

此 npm 依赖项配置使用了一个名为 @jsr 的特殊自定义范围，
在 `.npmrc` 中自动添加以下配置：

::: code-tabs
@tab .npmrc

```sh
@jsr:registry=https://npm.jsr.io
```

:::

::: note
你应该将 `.npmrc` 添加到你的源代码管理中，以便后续安装或更新 JSR 包时使用它。
:::

## 为什么选择 JSR ？

Node.js 取得巨大的成功，很大程度上得益于 NPM 的成功。NPM 拥有 200万+ 个（未来可能达到 300万个） 包，
可能是历史上最成功的包管理器和注册表。这是 JavaScript 社区足以自豪的成就。

那么，既然已经有 NPM 了，为什么还要构建 JSR ？
因为在当今的世界，与当初引入 NPM 时，已发生了翻天覆地的变化：

* **ECMAScript 模块已经成为了标准。**
  Web 平台现已采用 ESM 作为首选模块格式，取代 CommonJS 。
* **除了 Node.js 和 Browser 以外，还有更多的 JavaScript 运行时。**
  随着 Deno、Bun、workerd 和其他新的 JavaScript 环境出现，已 `Node.js` 为中心的 包注册表已不再能满足需求。
* Typescript 已成为事实上的标准。
  TypeScript 作为 JavaScript 的超集和 ECMAScript 最新功能的测试平台，已成为众多重要的 JavaScript 库的选择。
  现代注册表的设计应考虑到 TypeScript 。

以下是你考虑使用 JSR 的理由：

### 原生 Typescript 支持

JSR 的设计考虑到了 TypeScript 的支持。TypeScript 源文件可以直接发布到 JSR。
原生支持 TypeScript 的平台（如 Deno）可以直接使用这些文件。

对于缺乏 TypeScript 原生支持的其它环境（如 Node.js），JSR 会将源代码转换为 JavaScript，并生成 `d.ts` 类型声明文件，
以支持 Node.js 项目的 TypeScript 工具。模块作者不需要额外的配置或构建步骤。

JSR 还将从 TypeScript 源代码为包生成参考文档，提供丰富的在线文档，你可以将其与代码一起维护。

### 仅限 ESM 模块

JavaScript 模块的web标准是 [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 。
一个现代的包注册中心应该围绕这个标准团结起来，并将社区转向这个方向。因此，JSR 仅为 ESM 设计。

### 跨运行时支持

JSR 的目标是能够在 JavaScript 工作的任何地方工作，并为 JavaScript 和 TypeScript 代码提供与运行时无关的注册表。
如今，JSR 可以与 Deno 和其他 包括 `node_modules` 的 NPM 环境一起使用。这意味着 Node.js、Bun、Cloudflare Workers 以及其他使用 `package.json` 管理依赖项的项目也可以与 JSR 进行互操作。

### JSR 是 NPM 的超集

JSR 是 npm 的超集，就像 TypeScript 是 JavaScript 的超集一样。

JSR 旨在与基于 npm 的项目和包进行互操作。你可以在任何使用 `node_modules` 文件夹的运行时环境中使用 JSR 包。
JSR 模块可以从 npm 导入依赖项。

### 出色的开发体验

JSR 具有许多旨在帮助模块发布者提高工作效率的功能，包括但不限于：

* 使用单个命令即可轻松发布 - CLI 将引导你完成其余部分
* 从源代码自动生成 API 文档
* 从 GitHub Actions 进行零配置发布
* 自动包含 Node.js/npm 分发的 `.d.ts` 文件
* TypeScript 最佳实践的自动指导将使你的代码加载尽可能快
* 更多...

### 快速，安全，可靠

JSR 旨在安全、快速、灵活，并且在资源受限的环境中也能很好地工作。

* JSR 使用全局 CDN 来提供包，并使用本地缓存和高并行性来加速下载。
* JSR 包上传是不可变的，因此你可以相信包在下载后永远不会改变或消失在你的底层。
* JSR 包下载非常高效，仅下载你正在导入的确切文件。
* JSR 使用基于 OIDC 的身份验证从 CI 发布包，并使用无令牌交互式身份验证流程从本地计算机发布。

## JSR 包规则

上传到 JSR 的所有包都会在发布过程中自动处理和验证，以确保 JSR 上托管的所有代码都遵守一组一致的规则。
这些规则旨在实现跨环境的可移植性。代码必须遵循这些规则才能发布到 JSR。

### 仅支持 ESM 模块

JSR 包只支持 ESM 模块，这意味着你只能发布使用 `import` 和 `export` 关键字的模块。
无法发布 CommonJS 模块

### 支持 NPM 包

可以通过在 `package.json` 的 `dependencies` 中指定它们来依赖 npm 包，
或者使用 `npm:` 说明符在代码中引用它们，例如作为 `import { cloneDeep } from "npm:lodash@4";` 。

### 支持 JSR 包

通过在 `package.json` 的 `dependencies` 中指定它们来依赖 JSR 包，
或者使用 `jsr:` 说明符在代码中引用它们，例如 `import { encodeBase64 } from "jsr:@std/encoding@1/base64";` 。

支持 node: 内置函数

使用 `node:` 方案导入 Node.js 内置函数。
例如，可以使用 `import { readFile } from "node:fs";` 导入 fs 模块。如果包有 `package.json` ，
您还可以使用裸说明符（不带 `node:` 前缀）导入 Node.js 内置程序。

### 简单文件名

文件名必须与 Windows 和 Unix 兼容。这意味着文件名不能包含 `*` 、 `:` 或 `?` 等字符。
应避免存在多个同名但大小写不同的文件。

### 最好不要使用 TypeScript“slow types”

为了加快类型检查，支持文档生成和 Node.js 的兼容性，
JSR 包不应在导出的函数、类或变量中使用某些 TypeScript 类型。这是默认强制执行的，但可以选择忽略。

### 有效的跨文件导入

包中模块之间的所有相对导入必须在发布时解析。支持的说明符的格式取决于是否使用 `package.json`。

## 发布包到 JSR

您可以将使用 ESM 模块编写的大多数 JavaScript 和 TypeScript 代码发布为 JSR 包。
JSR 包发布到 **jsr.io** ，并且可以从 Deno、Node.js 和其他工具导入。

为使用 `package.json` 的运行时编写的代码，和为 Deno 编写的代码，都可以作为包发布到 JSR。
JSR 支持并鼓励发布 TypeScript 源代码，而不是成对的 `.js + .d.ts` 文件。
这使得 JSR 能够提供更有用的自动生成文档，并有助于在编辑器中提供改进的自动完成功能。

### 包配置文件

你必须在你的包中添加一个 包配置文件，该文件名为 `jsr.json`。文件中包含包括 包的元数据，如 包名、
版本号、入口点。Deno 用户还可以在其 `deno.json` 中包含所需的属性，以避免创建另一个文件。

::: code-tabs
@tab jsr.json / deno.json

```json
{
  "name": "@luca/greet",
  "version": "1.0.0",
  "exports": "./mod.ts"
}
```

:::

### 创建 scope 和 package

发包到 JSR，首先必须创建 一个 scope，然后在这个 scope 下创建 package。scope 与 NPM scope 类似，
scope 以 `@` 符号开头，后面紧跟名称，如 `@luca` 就是一个

可以在 [jsr.io/new](https://jsr.io/new) 创建 scope。 scope 的名称长度范围必须在 2 到 32 个字符之间，
只能使用 小写字符、连字符 和 数字。仅当名称未被使用，禁止使用与现有 scope 非常相似的名称。

创建 scope 后，就可以在这个 scope 中创建 package。包名称的长度必须在 2 到 20 个字符之间，
并且只能包含小写字母、数字和连字符。仅当名称未被使用，禁止使用与现有 package 非常相似的名称。

::: center
![jsr new](/images/jsr-new.png){style="width:100%;max-width: 450px;"}
:::

### 验证 package

要发布包（包括执行试运行以确认包满足所有 JSR 规则），
需要使用 `jsr publish` 或 `deno publish` 。
这两个命令的语法大致相同。根据不同的工具，可以按如下方式调用发布命令。

```sh
# deno
deno publish
# npm
npx jsr publish
# yarn
yarn dlx jsr publish
# pnpm
pnpm dlx jsr publish
```

可以使用 `--dry-run` 标志运行 `jsr publish` 来执行实际发布期间发生的所有发布验证。
这将打印出将要发布的文件列表，但不会实际发布到注册表。

```sh
# deno
$ deno publish --dry-run
# npm
$ npx jsr publish --dry-run
# yarn
yarn dlx jsr publish --dry-run
# pnpm
pnpm dlx jsr publish --dry-run
```

### 从本机发布包

使用 `jsr publish` 或 `deno publish` 命令可以从本地计算机发布包。

身份验证是通过浏览器进行，因此无需向 JSR cli 提供任何身份验证信息。

进入 包的根目录（包含 `jsr.json` / `deno.json` 文件），然后运行 ​​ `jsr publish` 。

```sh
# deno
$ deno publish
# npm
$ npx jsr publish
# yarn
yarn dlx jsr publish
# pnpm
pnpm dlx jsr publish
```

在发布期间，JSR CLI 和 JSR 服务器都会对 包 运行许多检查以确保其有效。
如果其中任何检查失败，CLI 将输出 错误消息。必须先修复这些错误，然后才能尝试再次发布。

### 从 GitHub Actions 发布包

要从 Github Actions 发布包，首先必须在 JSR 的 package 页 的 `Setting` 选项卡中，将包 链接到 Github Repo。

::: center
![jsr link](/images/jsr-github-link.png){style="width:100%;max-width: 650px;"}
:::

然后，在 Github Repo 中，添加一个 工作流的配置文件，例如 `.github/workflows/publish.yml` 。

::: code-tabs
@tab .github/workflows/publish.yml

```yml
name: Publish

on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write # The OIDC ID token is used for authentication with JSR.
    steps:
      - uses: actions/checkout@v4
      - run: npx jsr publish
```

:::

每次推送到存储库的 main 分支时，此工作流程都会运行。
它将把您的包发布到 JSR，并根据 `jsr.json` 文件中的版本自动使用正确的版本号。
如果 `jsr.json` 文件中指定的版本已发布到 JSR， `jsr publish` 将不会尝试发布。

### 过滤文件

`jsr publish` 将忽略包根目录中 `.gitignore` 文件中列出的文件。
此外，可以在 `jsr.json` / `deno.json` 文件中指定 `include` 和 `exclude` 字段以包含、
忽略或取消 gitignore 特定的操作文件。

例如，要仅选择性地包含某些文件，可以使用 `include` 选项指定与所有文件匹配的 glob：

::: code-tabs
@tab jsr.json

```json
{
  "name": "@luca/greet",
  "version": "1.0.0",
  "exports": "./src/mod.ts",
  // note: this will be collapsed down to just include in the future
  "publish": {
    "include": ["LICENSE", "README.md", "src/**/*.ts"]
  }
}
```

:::

还可以通过 exclude 选项排除某些文件：

::: code-tabs
@tab jsr.json

```json
{
  "name": "@luca/greet",
  "version": "1.0.0",
  "exports": "./src/mod.ts",
  "publish": {
    "include": ["LICENSE", "README.md", "src/**/*.ts"],
    "exclude": ["src/tests"]
  }
}
```

:::

#### 不使用“include”时取消忽略文件

你可能有一个包含 `.gitignore` 文件的包，其中包含以下内容：

::: code-tabs
@tab .gitignore

```txt
.env
dist/
```

:::

在这种情况下，发布时将忽略 `dist/` 目录中的所有文件以及名为 `.env` 的任何文件。

然而，如果想要发布 `dist/` 目录，这可能会很不方便，因为有 "exports" 指向它（或其子目录）。
在这种情况下，可以通过在 `jsr.json` / `deno.json` 文件中的 `exclude` 字段中使用否定来取消忽略 `dist/` 目录。

::: code-tabs
@tab jsr.json

```json
{
  "name": "@luca/greet",
  "version": "1.0.0",
  "exports": "./dist/mod.ts",
  "publish": {
    "exclude": ["!dist"]
  }
}
```

:::

在这种情况下，发布时将包含 `dist/` 目录，即使它列在 `.gitignore` 文件中。

## `jsr.json` 文件

JSR 包需要包含一个配置文件，用于指定包的名称、版本和导出。该文件应命名为 `jsr.json` 或 `jsr.jsonc` 。
使用 Deno 时， `jsr.json` 配置文件的所有属性都可以放置在 `deno.json` 中。

::: code-tabs
@tab jsr.json / deno.json

```json
{
  "name": "@luca/greet",
  "version": "1.0.0",
  "exports": "./mod.ts"
}
```

:::

### name

name 字段是包的名称，以 JSR scope 为前缀。

### version

version 字段是包的版本，它必须是有效的 [SemVer](https://semver.org/) 版本。每次发布新版本时，都必须增加包的版本。

### exports

`exports` 字段告诉 JSR 包的用户应该导入哪些模块。
`exports` 字段可以指定为单个字符串，也可以指定为将入口点名称映射到包中的路径的对象。

```json
{
  "name": "@luca/greet",
  "version": "1.0.0",
  "exports": {
    ".": "./mod.ts",
    "./greet": "./greet.ts"
  }
}
```

在上面的示例中， `exports` 字段是一个对象。 `.` 入口点是包的默认入口点。 `./greet` 入口点是一个命名入口点。
通过此入口点，可以使用 `import { greet } from "@luca/greet/greet";` 导入 `greet.ts` 模块，
使用 `import { greet } from "@luca/greet";` 导入 `mod.ts` 模块。

还可以将 `exports` 字段指定为单个字符串。
如果包中只有一个入口点，这非常有用。它在语义上等同于以对象形式指定默认入口点。

```json
{
  "name": "@luca/greet",
  "version": "1.0.0",
  "exports": { // [!code --]
    ".": "./mod.ts" // [!code --]
  }, // [!code --]
  "exports": "./mod.ts" // [!code ++]
}
```

### include 和 exclude

还可以使用 `include` 和 `exclude` 选项在发布过程中包含和排除文件。
使用 `deno.json` 时，可以使用 `publish.include` 和 `publish.exclude` 来包含和排除仅用于发布的文件，
而不是用于所有 Deno 子命令。查看 [过滤文件](#过滤文件) 了解更多。

## 编写文档

编写文档对于包的成功至关重要。 JSR 使包作者很容易获得优秀的文档，因为它根据包源代码中的 JSDoc 注释生成文档。

生成的文档显示在包页面上。该文档还将以补全和悬停描述的形式在编辑器中向用户显示。

文档有两个重要部分：

* **symbol documentation**：这是包导出的每个单独函数、接口、常量或类的文档。
* **module documentation**：这是包中每个导出模块的文档 - 它充当模块中所有符号的概述或摘要。

### symbol documentation

为每个导出的 函数、接口、常量或类 添加 JSDoc 注释。

```ts
/**
 *  // [!code ++]
 * This function takes two numbers as input, and then adds these numbers using // [!code ++]
 * floating point math.  // [!code ++]
 */ // [!code ++]
export function add(a: number, b: number): number {
  return a + b
}
```

对于函数，可以将文档添加到特定参数或返回类型：

```ts
/**
 * Search the database with the given query.
 *
 * @param query This is the query to search with. It should be less than 50 chars to ensure good performance.  // [!code ++]
 * @param limit The number of items to return. If unspecified, defaults to 20. // [!code ++]
 * @returns The array of matched items. // [!code ++]
 */
export function search(query: string, limit: number = 20): string[]
```

对于更复杂的，通常最好包含一个演示如何使用该函数的示例：

````ts
/**
 * Search the database with the given query.
 *
 * ```ts // [!code ++]
 * search("Alan") // ["Alan Turing", "Alan Kay", ...] // [!code ++]
 * ``` // [!code ++]
 */
export function search(query: string, limit: number = 20): string[]
````

interfaces 也可以使用 JSDoc 进行注释。它们的属性和方法也可以被注释：

```ts
/** The options bag to pass to the {@link search} method. */
export interface SearchOptions {
  /**
   * The maximum number of items to return from the search. Defaults to 50 if
   * unspecified.
   */
  limit?: number
  /**
   * Skip the given number of items. This is helpful to implement pagination.
   * Defaults to 0 (do not skip) if not specified.
   */
  skip?: number

  /**
   * The function to call if the {@link search} function needs to show warnings
   * to the user. If not specified, warnings will be silently swallowed.
   */
  reportWarning?: (message: string) => void
}
```

类可以类似地注释为接口和函数：

```ts
/**
 * A class to represent a person.
 */
export class Person {
  /** The name of the person. */
  name: string
  /** The age of the person. */
  age: number

  /**
   * Create a new person with the given name and age.
   * @param name The name of the person.
   * @param age The age of the person. Must be non-negative.
   */
  constructor(name: string, age: number) {
    if (age < 0) {
      throw new Error('Age cannot be negative')
    }
    this.name = name
    this.age = age
  }

  /** Print a greeting to the console. */
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
  }
}
```

### module documentation

为 模块 添加 JSDoc 注释，对于提供模块及其导出符号的概述很有用。

要记录模块，请在模块文件的顶部添加 JSDoc 注释，并在注释中的任意位置包含 `@module` 标记：

```ts{1-4}
/**
 * This module contains functions to search the database.
 * @module
 */

/** The options bag to pass to the {@link search} method. */
export interface SearchOptions {}

/** Search the database with the given query. */
export function search(query: string, options?: SearchOptions): string[];
```

您还可以在模块文档中包含示例：

````ts{6-10}
/**
 * @module
 *
 * This module contains functions to search the database.
 *
 * ```ts
 * import { search } from "@luca/search";
 *
 * search("Alan") // ["Alan Turing", "Alan Kay", ...]
 * ```
 */
````

## Slow Types

JSR 的许多功能都分析源代码，特别是源代码中的 TypeScript 类型。
这样做是为了生成文档、为 npm 兼容层生成类型声明，以及使用 JSR 中的包加速 Deno 项目的类型检查。

为了使这些功能发挥作用，TypeScript 源不得导出任何本身或引用“Slow Types”的函数、类、接口或变量或类型别名。
“Slow Types”是未明确编写的类型，或者过于复杂以至于需要大量推理才能理解的类型。

对于这些功能，JSR 执行这种推断的成本太高，因此公共 API 不支持这些类型。

::: warning
如果 JSR 在包中发现“Slow Types”，某些功能将无法工作或质量下降。包括：

* 对包的使用者进行类型检查会更慢。对于大多数软件包来说，速度至少会降低 1.5-2 倍。它可能会高得多。
* 该包将无法为 npm 兼容层生成类型声明，或者在生成的类型声明中“Slow Types”将被省略或替换为 any 。
* 该包将无法生成该包的文档，或者生成的文档中将省略“Slow Types”或丢失详细信息。

:::

### 什么是 "Slow Types"?

当函数、变量或接口从包中导出，并且其类型未显式写入，或者过于复杂以至于无法简单推断时，就会出现“Slow Types”。

例子：

```ts
// 这个函数有问题，因为没有显式地编写返回类型，因此必须从函数体中推断。
export function foo() {
  return Math.random().toString()
}
```

```ts
const foo = 'foo'
const bar = 'bar'
export class MyClass {
  // 这个属性是有问题的，因为没有显式地编写类型，因此必须从初始化项推断出它。
  prop = `${foo} ${bar}`
}
```

包内部的Slow Types（即未导出）对于 JSR 和包的使用者来说不会有问题。

### TypeScript 限制

本节列出了“no slow types”策略对 TypeScript 代码施加的所有限制：

1. 所有导出的函数、类、变量和类型都必须具有显式类型。例如，函数应具有显式返回类型，类应具有显式属性类型。
2. 不得使用模块增强和全局增强。
   这意味着包不能使用 `declare global` 、 `declare module` 或 `export as namespace` 来扩大全局范围或其他模块。
3. 不得使用 CommonJS 功能。这意味着包不能使用 `export =` 或 `import foo = require("foo")` 。
4. 导出函数、类、变量和类型中的所有类型都必须是简单推断或显式的。
   如果表达式太复杂而无法推断，则应将其类型显式分配给中间类型。
5. 不支持导出中的解构。单独导出每个符号，而不是解构。
6. 类型不得引用类的私有字段。

#### 显式类型

从包导出的所有符号都必须显式指定类型。例如，函数应该有一个显式的返回类型：

```ts
export function add(a: number, b: number) { // [!code --]
export function add(a: number, b: number): number {  // [!code ++]
  return a + b;
}
```

类的属性应该有明确的类型：

```ts
export class Person {
  name // [!code --]
  age // [!code --]
  name: string // [!code ++]
  age: number // [!code ++]
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}
```

#### 全局增强

不得使用模块增强和全局增强。
这意味着包不能使用 `declare global` 引入新的全局变量，或 `declare module` 来扩充其他模块。

以下是一些不受支持的代码示例：

```ts
declare global {
  const globalVariable: string
}
```

```ts
declare module 'some-module' {
  const someModuleVariable: string
}
```

#### CommonJS 特性

不得使用 CommonJS 功能。这意味着包不能使用 `export =` 或 `import foo = require("foo")` 。

使用 ESM 语法代替：

```ts
export = 5 // [!code --]
export default 5 // [!code ++]
```

```ts
import foo = require('foo') // [!code --]
import foo from 'foo' // [!code ++]
```

#### 类型必须是简单推断或显式的

导出函数、类、变量和类型中的所有类型都必须是简单推断或显式的。
如果表达式太复杂而无法推断，则应将其类型显式分配给中间类型。

例如，在以下情况下，默认导出的类型太复杂而无法推断，因此必须使用中间类型显式声明它：

```ts
class Class {}

export default {
  // [!code --]
  test: new Class(), // [!code --]
} // [!code --]
const obj: { test: Class } = {
  // [!code ++]
  test: new Class(), // [!code ++]
} // [!code ++]
// [!code ++]
export default obj // [!code ++]
```

或者使用 as 断言：

```ts
class Class {}

  export default {
    test: new Class(),
};  // [!code --]
} as { test: Class }; // [!code ++]
```

对于超类表达式，计算表达式并将其分配给中间类型：

```ts
interface ISuperClass {}

function getSuperClass() {
  return class SuperClass implements ISuperClass {}
}

export class MyClass extends getSuperClass() {} // [!code --]
const SuperClass: ISuperClass = getSuperClass() // [!code ++]
export class MyClass extends SuperClass {} // [!code ++]
```

#### 导出没有解构

不支持导出中的解构。不要使用解构，而是单独导出每个符号：

```ts
export const { foo, bar } = { foo: 5, bar: 'world' } // [!code --]
const obj = { foo: 5, bar: 'world' } // [!code ++]
export const foo: number = obj.foo // [!code ++]
export const bar: string = obj.bar // [!code ++]
```

#### 类型不得引用类的私有字段

在推断过程中，类型不得引用类的私有字段。

在此示例中，公共字段引用私有字段，这是不允许的。

```ts
export class MyClass {
  prop!: typeof MyClass.prototype.myPrivateMember // [!code --]
  private myPrivateMember!: string // [!code --]
  prop!: MyPrivateMember // [!code ++]
  private myPrivateMember!: MyPrivateMember // [!code ++]
}

type MyPrivateMember = string // [!code ++]
```

## package 分数

JSR 分数是 JSR 根据指示包质量的某些因素自动分配给每个包的度量标准。
该分数用于对搜索结果中的软件包进行排名，帮助用户一目了然地了解软件包的质量。

JSR 分数是 0 到 100 之间的百分比，根据 4 个高级类别的因素计算得出：

* **文档**：存在自述文件、模块文档以及公共函数和类型的文档。
* **最佳实践**：包不应使用 SLow Types ，并且应随包来源一起发布。
* **可发现性**：包应该有一个描述，以帮助用户通过搜索找到包。
* **兼容性**：包应该至少有一个在包页面的“运行时兼容性”部分标记为“兼容”的运行时。
  此外，软件包因具有多个兼容运行时而受到奖励。

每个类别都有不同的影响分数的具体因素。每个因素的权重都不同。
