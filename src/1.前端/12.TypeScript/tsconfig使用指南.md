---
title: tsconfig.json 完全使用指南
author: 鹏展博
createTime: 2022/04/28 02:50:00
tags: 
  - typescript
permalink: /article/284xp17b/
---

`TSConfig` 文件是用于表明其所在的目录是一个 `typescript` 或 `javascript` 项目的根目录。
`TSConfig` 文件可以是 `tsconfig.json` 或 `jsconfig.json`，它们的配置和行为相同。

<!-- more -->

> [官方文档](https://www.typescriptlang.org/tsconfig)

## 基础

使用 `TSConfig` 是一个很容易的事情，只需要在目录下创建一个 `tsconfig.json` 或 `jsconfig.json` 文件即可：

::: code-tabs
@tab tsconfig.json

```json
{}
```

@tab jsconfig.json

```json
{}
```

:::

`TSConfig` 包含了默认配置。

`TSConfig` 主要包含了以下 `top level` 的配置字段：

```json
{
  "extends": "",
  "compilerOptions": {},
  "files": [],
  "include": [],
  "exclude": [],
  "references": [],
  "watchOptions": {},
  "typeAcquisition": {},
}
```

## `extends`

**Type**： `string`

`extends` 属性用于从另一个 `TSConfig` 文件继承配置。它的值是一个路径， 或者是一个 `Node.js` 风格的路径。
如果是一个相对路径，则相对于配置文件对路径进行解析，如果是一个 `Node.js` 风格的路径，则从 `node_modules`解析获取路径。

`extends` 不会继承 配置文件中的 `files`, `include`, `exclude` 字段，同时，不允许配置文件之间循环引用。

### example

`tsconfig.base.json`

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

`tsconfig.json`

```json
{
  "extends": "./tsconfig.base",
  "files": ["main.ts"]
}
```

`tsconfig.noStrictNullChecks.json`

```json
{
  "extends": "./tsconfig",
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

## `compilerOptions`

指定 `typescript` 的编译配置。

`compilerOptions` 主要包含以下配置内容：

**Type checking:**

[`allowUnreachableCode`](#allowunreachablecode), [`allowUnusedLabels`](#allowunusedlabels),
[`alwaysStrict`](#alwaysstrict), [`exactOptionalPropertyTypes`](#exactoptionalpropertytypes),
[`noFallthroughCasesInSwitch`](#nofallthroughcasesinswitch), [`noImplicitAny`](#noimplicitany),
[`noImplicitOverride`](#noimplicitoverride), [`noImplicitReturns`](#noimplicitreturns),
[`noImplicitThis`](#noimplicitthis),
[`noPropertyAccessFromIndexSignature`](#nopropertyaccessfromindexsignature),
[`noUncheckedIndexedAccess`](#nouncheckedindexedaccess),[`noUnusedLocals`](#nounusedlocals),
[`noUnusedParameters`](#nounusedparameters), [`strict`](#strict),
 [`strictBindCallApply`](#strictbindcallapply), [`strictFunctionTypes`](#strictfunctiontypes),
 [`strictNullChecks`](#strictfunctiontypes),
[`strictPropertyInitialization`](#strictpropertyinitialization),
[`useUnknownInCatchVariables`](#useunknownincatchvariables)

**Modules:**

[`allowUmdGlobalAccess`](#allowumdglobalaccess), [`baseUrl`](#baseurl), [`module`](#module),
[`moduleResolution`](#moduleresolution), [`moduleSuffixes`](#modulesuffixes), [`noResolve`](#noresolve),
[`paths`](#paths), [`resolveJsonModule`](#resolvejsonmodule), [`rootDir`](#rootdir),
[`rootDirs`](#rootdirs), [`typeRoots`](#typeroots), [`types`](#types)

**Emit:**

[`declaration`](#declaration), [`declarationDir`](#declarationdir), [`declarationMap`](#declarationmap),
[`downlevelIteration`](#downleveliteration), [`emitBOM`](#emitbom),
[`emitDeclarationOnly`](#emitdeclarationonly), [`importHelpers`](#importhelpers),
[`importsNotUsedAsValues`](#importsnotusedasvalues), [`inlineSourceMap`](#inlinesourcemap),
[`inlineSources`](#inlinesources), [`mapRoot`](#maproot), [`newLine`](#newline), [`noEmit`](#noemit),
[`noEmitHelpers`](#noemithelpers), [`noEmitOnError`](#noemitonerror), [`outDir`](#outdir),
[`outFile`](#outfile), [`preserveConstEnums`](#preserveconstenums),
[`preserveValueImports`](#preservevalueimports), [`removeComments`](#removecomments),
[`sourceMap`](#sourcemap), [`sourceRoot`](#sourceroot), [`stripInternal`](#stripinternal)

**JavaScript Support:**

[`allowJs`](#allowjs), [`checkJs`](#checkjs), [`maxNodeModuleJsDepth`](#maxnodemodulejsdepth)

**Editor Support:**

[`disableSizeLimit`](#disablesizelimit), [`plugins`](#plugins)

**Interop Constraints:**

[`allowSyntheticDefaultImports`](#allowsyntheticdefaultimports), [`esModuleInterop`](#esmoduleinterop),
 [`forceConsistentCasingInFileNames`](#forceconsistentcasinginfilenames), [`isolatedModules`](#isolatedmodules), [`preserveSymlinks`](#preservesymlinks)

**Backwards Compatibility:**

[`charset`](#charset), [`keyofStringsOnly`](#keyofstringsonly),
[`noImplicitUseStrict`](#noimplicitusestrict), [`noStrictGenericChecks`](#nostrictgenericchecks),
[`out`](#out), [`suppressExcessPropertyErrors`](#suppressexcesspropertyerrors), [`suppressImplicitAnyIndexErrors`](#suppressimplicitanyindexerrors)

**Language and Environment:**

[`emitDecoratorMetadata`](#emitdecoratormetadata), [`experimentalDecorators`](#experimentaldecorators),
[`jsx`](#jsx), [`jsxFactory`](#jsxfactory), [`jsxFragmentFactory`](#jsxfragmentfactory),
[`jsxImportSource`](#jsximportsource), [`lib`](#lib), [`moduleDetection`](#moduledetection),
[`noLib`](#nolib),[`reactNamespace`](#reactnamespace),[`target`](#target),
[`useDefineForClassFields`](#usedefineforclassfields)

**Compiler Diagnostics:**

[`diagnostics`](#diagnostics), [`explainFiles`](#explainfiles),
[`extendedDiagnostics`](#extendeddiagnostics), [`generateCpuProfile`](#generatecpuprofile),
[`generateCpuProfile`](#generatecpuprofile), [`listFiles`](#listfiles),
[`traceResolution`](#traceresolution)

**Projects:**

[`composite`](#composite), [`disableReferencedProjectLoad`](#disablereferencedprojectload),
[`disableSolutionSearching`](#disablesolutionsearching),
[`disableSourceOfProjectReferenceRedirect`](#disablesourceofprojectreferenceredirect),
[`incremental`](#incremental), [`tsBuildInfoFile`](#tsbuildinfofile)

**Output Formatting:**

[`noErrorTruncation`](#noerrortruncation), [`preserveWatchOutput`](#preservewatchoutput), [`pretty`](#pretty)

**Completeness:**

[`skipDefaultLibCheck`](#skipdefaultlibcheck),[`skipLibCheck`](#skiplibcheck)

**watch options:**

[`assumeChangesOnlyAffectDirectDependencies`](#assumechangesonlyaffectdirectdependencies)

### allowUnreachableCode

是否允许代码中包含不会被执行的代码

- `undefined` <Badge>default</Badge> 向编辑器提供建议作为警告
- `true` 允许包含
- `false` 不允许，并给出错误警告

**example**  `"allowUnreachableCode": false`

```ts
function fn(n: number) {
  if (n > 5) {
    return true;
  } else {
    return false;
  }
  return true;
// error: Unreachable code detected.
}
```

### allowUnusedLabels

是否允许 未被使用的 `labels`。

- `undefined` <Badge>default</Badge> 向编辑器提供建议作为警告
- `true` 允许包含
- `false` 不允许，并给出错误警告

**example:**

```ts
function verifyAge(age: number) {
  // Forgot 'return' statement
  if (age > 18) {
    verified: true;
    // error: Unused label.
  }
}
```

### alwaysStrict

确保文件在ECMAScript严格模式下解析，并对每个源文件添加 `use strict`。

### exactOptionalPropertyTypes

如果启用 `exactOptionalPropertyTypes`，`typescript` 将会用更加严格的模式，对 通过 `type` 或者 `interface`
声明的包含 `?` 的可选属性的检查

**example:**

```ts
interface Theme {
  colorThemeOverride?: 'dark' | 'light';
}
```

如果没有启用这个配置，那么 `colorThemeOverride` 的值可以是 `'dark'`, `'light'`, `undefined`。
如果启用了这个配置，则值不能被显式的赋值为 `undefined`。

`"exactOptionalPropertyTypes": true`

```ts
const theme: Theme = {}

theme.colorThemeOverride = 'dark'
theme.colorThemeOverride = 'light'

theme.colorThemeOverride = undefined // error 
```

### noFallthroughCasesInSwitch

如果配置为 `true`, 则表示 `switch` 语句中的 任何一个非空的 `case` 分支，都必须包含 `break` 或 `return` 。

### noImplicitAny

在没有类型注释的情况下，`typescript` 在无法推断类型时，会将类型回退到 `any`。这可能会导致一些错误被遗漏。

启用此配置，`typescript` 会在类型回退到 `any` 时报告一个错误。

```ts
function fn(s) {
  // Parameter 's' implicitly has an 'any' type.
  console.log(s.subtr(3));
}
```

### noImplicitOverride

### noImplicitReturns

### noImplicitThis

### noPropertyAccessFromIndexSignature

### noUncheckedIndexedAccess

### noUnusedLocals

### noUnusedParameters

### strict

是否启用 严格模式的类型检查，当开启这个选项时，也会启用所有 `strict` 系列的配置。

### strictBindCallApply

当开启时，`TypeScript` 会检查 `call`、`bind`和`apply`是否使用正确的参数调用底层函数。

### strictFunctionTypes

当开启时，`TypeScript` 会对 函数的参数类型使用更严格的检查。

需要注意的是，该配置只适用于 `function` 语法，而不适用于 `method` 语法。

```ts
function fn(x: string) {
  return x
}
type Fn = (ns: string | number) => string | number

const fn1: Fn = fn // error: Types of parameters 'x' and 'ns' are incompatible.
```

### strictNullChecks

当开启时，`typescript` 会把 `undefined` 和 `null` 作为不同的类型。

### strictPropertyInitialization

当启用时，`typescript` 会检查 在 `class` 中已声明的属性，是否有在 `constructor` 中进行初始化。

### useUnknownInCatchVariables

### allowUmdGlobalAccess

允许 Umd 全局访问。

当 `allowUmdGlobalAccess` 设置为 `true` 时，将允许你在模块文件中以全局变量的形式访问 UMD 的导出。 模块文件是具有或同时导入、导出的文件。当未设置这个选项时，使用 UMD 模块的导出需要首先导入声明。

比如，在一个 Web 项目中， 知道特定的库（如 jQuery 或 Lodash ）在运行时总是可用的，但无法通过导入来使用他们。

### baseUrl

设置解析非绝对路径模块名时的基准目录。

### module

设置程序的模块系统。

可选值包括： `CommonJS`， `UMD`，`AMD`， `System`，`ESNext`， `ES2020`， `ES6/ES2015`，`ES2022`， `Node16`， `NodeNext`， `None`

### moduleResolution

指定模块解析策略。

可选值包括： `node` ，`classic`。

如果未指定值，当 `module` 为 `CommonJS`时，为 `node`，当 `module` 为 `UMD`，`AMD`， `System`，`ESNext`，`ES2015`时，为 `classic` 。

### moduleSuffixes

声明在模块解析时，默认搜索的文件名后缀列表

```json
{
  "compilerOptions": {
    "moduleSuffixes": [".ios", ".native", ""]
  }
}
```

`import * as foo from "./foo";`， `typescript` 将会检索 `./foo.ios.ts`, `./foo.native.ts`, `./foo.ts`。

### noResolve

### paths

路径设置。将模块导入重新映射到相对于 baseUrl 路径的配置。

paths 可以允许你声明 TypeScript 应该如何解析你的 require/import。

```json
{
  "compilerOptions": {
    "baseUrl": ".", // this must be specified if "paths" is specified.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"]
    }
  }
}
```

告诉 TypeScript 文件解析器支持一些自定义的前缀来寻找代码。 这种模式可以避免在你的代码中出现过长的相对路径:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
        "app/*": ["app/*"],
        "config/*": ["app/_config/*"],
        "environment/*": ["environments/*"],
        "shared/*": ["app/_shared/*"],
        "helpers/*": ["helpers/*"],
        "tests/*": ["tests/*"]
    },
}

```

### resolveJsonModule

允许直接导入 `.json` 模块。并基于json生成静态类型。

### rootDir

根目录。

**默认**: 所有输入的非声明文件中的最长公共路径。若 composite 被指定，则是包含 tsconfig.json 文件的目录。

### rootDirs

根目录。

通过 `rootDirs`，你可以告诉编译器有许多“虚拟”的目录作为一个根目录。
这将会允许编译器在这些“虚拟”目录中解析相对应的模块导入，就像它们被合并到同一目录中一样。

### typeRoots

默认情况下，所有 可见 的 `@types` 包都将包含在你的编译过程中。
在 `node_modules/@types` 中的任何包都被认为是 可见 的。
例如，这意味着包含 `./node_modules/@types/`，`../node_modules/@types/`，`../../node_modules/@types/` 中所有的包。

当 `typeRoots` 被指定，仅有 在 `typeRoots` 下的包会被包含。例如：

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings", "./vendor/types"]
  }
}
```

这个配置文件将包含 `./typings` 和 `./vendor/types` 下的所有包，而不包括 `./node_modules/@types` 下的。其中所有的路径都是相对于 `tsconfig.json`。

### types

默认情况下，所有 可见 的 `@types` 包都将包含在你的编译过程中。
在 `node_modules/@types` 中的任何包都被认为是 可见 的。
例如，这意味着包含 `./node_modules/@types/`，`../node_modules/@types/`，`../../node_modules/@types/` 中所有的包。。

当 types 被指定，则只有列出的包才会被包含在全局范围内。例如：

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "express"]
  }
}
```

这个 `tsconfig.json` 文件将 只会 包含 `./node_modules/@types/node`，`./node_modules/@types/jest`
和 `./node_modules/@types/express`。 其他在 `node_modules/@types/*` 下的包将不会被包含。

此选项不会影响 `@types/*` 如何被包含在你的代码中。

当你设置了这个选项，通过不在 types 数组中包含，它将：

- 不会再你的项目中添加全局声明（例如 node 中的 process 或 Jest 中的 expect）
- 导出不会出现再自动导入的建议中

### declaration

为你工程中的每个 `TypeScript` 或 `JavaScript` 文件生成 `.d.ts`文件。 这些 `.d.ts` 文件是描述模块外部 API 的类型定义文件。 可以通过 `.d.ts` 文件为非类型化的代码提供 `intellisense` 和精确的类型。

### declarationDir

配置 声明文件生成的输出目录。

### declarationMap

### downlevelIteration

`downlevel (降级）` 是 `TypeScript` 的术语，指用于转换到旧版本的 `JavaScript。` 这个选项是为了在旧版 `Javascript` 运行时上更准确的实现现代 `JavaScript` 迭代器的概念。

`ECMAScript 6` 增加了几个新的迭代器原语：`for / of` 循环（`for (el of arr)`），数组展开（`[a, ...b]`），参数展开（`fn(...args)`）和 `Symbol.iterator`。

如果 `Symbol.iterator` 存在的话，`--downlevelIteration` 将允许在 ES5 环境更准确的使用这些迭代原语。

### emitBOM

### emitDeclarationOnly

只生成 `.d.ts` 文件，但不生成 `.js` 文件

### importHelpers

### importsNotUsedAsValues

### inlineSourceMap

是否 内联 `sourceMap`

### inlineSources

### mapRoot

### newLine

指定输出文件时使用的行尾序列:  `CRLF` (dos)或 `LF` (unix)。

### noEmit

禁止编译器生成文件，例如 `JavaScript` 代码，`source-map` 或声明。

这为另一个工具提供了空间，例如用 `Babel` 或 `swc` 来处理将 `TypeScript` 转换为可以在 `JavaScript` 环境中运行的文件的过程。

然后你可以使用 `TypeScript` 作为提供编辑器集成的工具，或用来对源码进行类型检查。

### noEmitHelpers

### noEmitOnError

如果报告了任何错误，不允许编译器输出文件，如JavaScript源代码、源映射或声明。
默认为false，这使得在类似监听的环境中使用TypeScript更容易，
在这种环境中，您可能希望在确保所有错误都得到解决之前，再在另一个环境中查看代码更改的结果。

### outDir

如果被指定，`.js` （以及 .d.ts, .js.map 等）将会被生成到这个目录下。
原始源文件的目录将会被保留，如果计算出的根目录不是你想要的，可以查看 [`rootDir`](#rootdir)。

如果没有指定，`.js` 将被生成至于生成它们的 `.ts` 文件相同的目录中。

### outFile

如果被指定，所有 全局 （非模块） 文件将被合并到指定的单个输出文件中。

如果 `module` 为 `system` 或 `amd`，所有模块文件也将在所有全局内容之后被合并到这个文件中。

注：除非 `module` 是 `None``，System` 或 `AMD`， 否则不能使用 `outFile`。 这个选项 不能 用来打包 `CommonJS` 或 `ES6` 模块。

### preserveConstEnums

### preserveValueImports

### removeComments

当转换为 `JavaScript` 时，忽略所有 TypeScript 文件中的注释。默认为 `false`。

### sourceMap

启用生成 `sourcemap files`。 这些文件允许调试器和其他工具在使用实际生成的 `JavaScript` 文件时，
显示原始的 `TypeScript` 代码。 Source map 文件以 `.js.map` （或 `.jsx.map`）文件的形式被生成到相应的 `.js` 文件输出旁。

`.js` 文件将会包含一个 `sourcemap` 注释，以向外部工具表明文件在哪里。

### sourceRoot

### stripInternal

### allowJs

允许 `JavaScript` 文件在你的工程中被引入，而不是仅仅允许 `.ts` 和 `.tsx` 文件。

这个选项是一种可以允许 `.ts` 和 `.tsx` 与现有的 `JavaScript` 文件共存的方式。可以用于逐步将 `TypeScript` 文件逐步添加到 JS 工程中。

### checkJs

与 `allowJs` 配合使用，当 `checkJs` 被启用时，`JavaScript` 文件中会报告错误。也就是相当于在项目中所有 `JavaScript` 文件顶部包含 `// @ts-check`。

### maxNodeModuleJsDepth

### disableSizeLimit

在处理非常大的`JavaScript`项目时，为了避免可能出现的内存膨胀问题，`TypeScript`分配的内存数量有一个上限。
打开此标志将取消限制。

### plugins

可在编辑器内运行的语言服务插件列表。

语言服务插件是一种基于现有 `TypeScript` 文件向用户提供额外信息的方法。它们可以改进 `TypeScript` 和编辑器之间的现有信息，或提供自己的错误信息。

### allowSyntheticDefaultImports

当设置为 true， 并且模块没有显式指定默认导出时，allowSyntheticDefaultImports 可以让你这样写导入：

```ts
import React from "react";
```

而不是：

```ts
import * as React from "react";
```

本选项不会影响 `TypeScript` 生成的 `JavaScript`，它仅对类型检查起作用。当你使用 `Babel` 生成额外的默认导出，从而使模块的默认导出更易用时，本选项可以让 `TypeScript` 的行为与 `Babel` 一致。

### esModuleInterop

默认情况下（未设置 `esModuleInterop` 或值为 `false``），TypeScript` 像 ES6 模块一样对待 `CommonJS/AMD/UMD`。这样的行为有两个被证实的缺陷：

- 形如 `import * as moment from "moment"` 这样的命名空间导入等价于 `const moment = require("moment")`

- 形如 `import moment from "moment"` 这样的默认导入等价于 `const moment = require("moment").default`

这种错误的行为导致了这两个问题：

- ES6 模块规范规定，命名空间导入（`import * as x`）只能是一个对象。TypeScript 把它处理成 `= require("x")` 的行为允许把导入当作一个可调用的函数，这样不符合规范。

- 虽然 `TypeScript` 准确实现了 `ES6` 模块规范，但是大多数使用 `CommonJS/AMD/UMD` 模块的库并没有像 `TypeScript` 那样严格遵守。

开启 `esModuleInterop` 选项将会修复 `TypeScript` 转译中的这两个问题。

### forceConsistentCasingInFileNames

### isolatedModules

虽然你可以使用 `TypeScript` 来从 `TypeScript` 中生成 `JavaScript` 代码，
但是使用其他转译器例如 `Babel` 也很常见。 但其他转译器一次只能在一个文件上操作，
这意味着它们不能进行基于完全理解类型系统后的代码转译。
这个限制也同样适用于被一些构建工具使用的 `TypeScript` 的 `ts.transpileModule` 接口。

这些限制可能会导致一些 `TypeScript` 特性的运行时问题，例如 `const enum` 和 `namespace`。 设置 `isolatedModules` `选项后，TypeScript` 将会在当你写的某些代码不能被单文件转译的过程正确处理时警告你。

它不会改变你代码的行为，也不会影响 `TypeScript` 的检查和代码生成过程。

如果设置了 `isolatedModules`，则所有的实现文件必须是 模块 （也就是它有某种形式的 `import/export`）。

### preserveSymlinks

### charset

配置从磁盘读取文本文件时使用的编码。

### keyofStringsOnly

### noImplicitUseStrict

### noStrictGenericChecks

### out

已弃用。

### suppressExcessPropertyErrors

### suppressImplicitAnyIndexErrors

### emitDecoratorMetadata

启用对使用`reflect-metadata`模块的装饰器发射类型元数据的实验性支持。

### experimentalDecorators

### jsx

控制 JSX 在 JavaScript 文件中的输出方式。 这只影响 .tsx 文件的 JS 文件输出。

- `react`: 将 JSX 改为等价的对 `React.createElement` 的调用并生成 .js 文件。
- `react-jsx`: 改为 `__jsx` 调用并生成 .js 文件。
- `react-jsxdev`: 改为 `__jsx` 调用并生成 .js 文件。
- `preserve`: 不对 JSX 进行改变并生成 .jsx 文件。
- `react-native`: 不对 JSX 进行改变并生成 .js 文件。

### jsxFactory

更改使用经典JSX运行时编译JSX Elements时在.js文件中调用的函数。
最常见的变化是使用`h`或`preact.h`而不是默认的`React`。

### jsxFragmentFactory

### jsxImportSource

### lib

`TypeScript` 包括一组默认的内建 JS 接口（例如 Math）的类型定义，以及在浏览器环境中存在的对象的类型定义
（例如 `document`）。 `TypeScript` 还包括与你指定的 `target` 选项相匹配的较新的 JS 特性的 API。
例如如果`target` 为 `ES6` 或更新的环境，那么 Map 的类型定义是可用的。

你可能出于某些原因改变这些：

- 你的程序不运行在浏览器中，因此你不想要 "dom" 类型定义。
- 你的运行时平台提供了某些 JavaScript API 对象（也许通过 polyfill），但还不支持某个 ECMAScript 版本的完整语法。
- 你有一些 （但不是全部）对于更高级别的 ECMAScript 版本的 polyfill 或本地实现。

**高阶库:**

| 名称       | 内容 |
| ---------- | ---- |
| ES5        | ES3 和 ES5 的核心功能定义 |
| ES2015     | ES2015 中额外提供的 API (又被称为 ES6) —— array.find， Promise，Proxy，Symbol，Map，Set，Reflect 等。|
| ES6        | ES2015 的别名。|
| ES2016     | ES2016 中额外提供的 API —— array.include 等。 |
| ES7        | ES2016 的别名。|
| ES2017     | ES2017 中额外提供的 API —— Object.entries，Object.values，Atomics，SharedArrayBuffer，date.formatToParts，typed arrays 等。|
| ES2018     | ES2018 中额外提供的 API —— async iterables，promise.finally，Intl.PluralRules，rexexp.groups 等。|
| ES2019     | ES2019 中额外提供的 API —— array.flat，array.flatMap，Object.fromEntries，string.trimStart，string.trimEnd 等。|
| ES2020     | ES2020 中额外提供的 API —— string.matchAll 等。 |
| ESNext     | ESNext 中额外提供的 API —— 随着 JavaScript 的发展，这些会发生变化。|
| DOM        | DOM 定义 —— window，document 等。|
| WebWorker  | WebWorker 上下文中存在的 API。|
| ScriptHost | Windows Script Hosting System 的 API。|

**库的各个组件:**

`DOM.Iterable`， `ES2015.Core`， `ES2015.Collection`， `ES2015.Generator`， `ES2015.Iterable`，
`ES2015.Promise`， `ES2015.Proxy`， `ES2015.Reflect`， `ES2015.Symbol`，
`ES2015.Symbol.WellKnown`， `ES2016.Array.Include`， `ES2017.object`，
`ES2017.Intl`， `ES2017.SharedMemory`， `ES2017.String`， `ES2017.TypedArrays`，
`ES2018.Intl`， `ES2018.Promise`， `ES2018.RegExp`， `ES2019.Array`，
`ES2019.Full`， `ES2019.Object`， `ES2019.String`， `ES2019.Symbol`，
`ES2020.Full`， `ES2020.String`， `ES2020.Symbol.wellknown`， `ESNext.AsyncIterable`，
`ESNext.Array`， `ESNext.Intl`， `ESNext.Symbol`

### moduleDetection

模块检查。

- `auto` (default): `typescript` 会不仅检查 `import` 或 `export` 语句，
  还会检查 `package.json` 是否有 `type` 字段，且当 配置文件中 `module` 值是否为 `nodenext` 或 `node16`时，`type` 字段值为 `module`。以及检查。
  当使用 `jsx: react-jsx` 配置时，当前文件是否是 `jsx` 文件。

- `legacy`: 检查文件是否包含 检查 `import` 或 `export` 语句。
- `force` : 确保每个非声明文件都被视为是一个模块。

### noLib

禁用自动包含任何库文件。如果设置了该选项，lib将被忽略。

### reactNamespace

已弃用，改用 [`jsxFactory](#jsxfactory)

### target

编译目标

现代浏览器支持全部 `ES6` 的功能，所以 `ES6` 是一个不错的选择。 如果你的代码部署在旧的环境中，你可以选择设置一个更低的目标；如果你的代码保证会运行在新的环境中，你可以选择一个更高的目标。

`target` 的配置将会改变哪些 JS 特性会被降级，而哪些会被完整保留 例如，如果 `target` 是 `ES5` 或更低版本，箭头函数 `() => this` 会被转换为等价的 函数 表达式。

改变 `target` 也会改变 `lib` 选项的默认值。 你可以根据需要混搭 `target` 和 `lib` 的配置，你也可以为了方便只设置 `target`。

特殊的 `ESNext` 值代表你的 `TypeScript` 所支持的最高版本。这个配置应当被谨慎使用，因为它在不同的 `TypeScript` 版本之间的含义不同，并且会导致升级更难预测。

可选值： `es3` (default)， `es5`， `es6/es2015`， `es2016`， `es2017`， `es2018`， `es2019`， `es2020`， `es2021`， `es2022`， `esnext`

### useDefineForClassFields

### diagnostics

### explainFiles

### extendedDiagnostics

### generateCpuProfile

### listEmittedFiles

### listFiles

### traceResolution

### composite

`composite` 选项会强制执行某些约束，使得构建工具（包括 在 `--build` 模式下的 `TypeScript` 本身）可以快速确定一个工程是否已经建立。

当此设置开启时：

- 如果没有明确指定 `rootDir`，则默认为包含 `tsconfig.json` 文件的目录。

- 所有实现的文件必须由 `include` 来匹配，或在 `files` 数组中指定。如果违反了这一约束，`tsc` 将告诉你哪些文件没有被指定。

- `declaration` 默认为 `true`。

### disableReferencedProjectLoad

### disableSolutionSearching

### disableSourceOfProjectReferenceRedirect

### incremental

使 TypeScript 将上次编译的工程图信息保存到磁盘上的文件中。这将会在您编译输出的同一文件夹中创建一系列 `.tsbuildinfo` 文件。 它们不会再运行时被您的 `JavaScript` 使用，并且可以被安全的删除。

### tsBuildInfoFile

这个选项可以让您指定一个文件来存储增量编译信息，以作为复合工程的一部分，从而可以更快的构建更大的 `TypeScript` 代码库。

这个选项提供了一种方法，可以配置 `TypeScript` 追踪它存储在磁盘上的文件的位置，用来指示项目的构建状态。—— 默认情况下，它们与你生成的 `JavaScript` 在同一个文件夹中。

### noErrorTruncation

启用时，错误信息不会被截断。

### preserveWatchOutput

是否在控制台保留历史监听信息，而不是清空它们。

### pretty

是否使用 颜色和样式 格式化 输出信息。

### skipDefaultLibCheck

使用 `skipLibCheck` 此配置。

### skipLibCheck

跳过声明文件的类型检查。

这可以在编译期间节省时间，但代价是类型系统的准确性。例如，两个库可以以不一致的方式定义同一类型的两个副本。TypeScript不会对所有`d.ts`文件进行全面检查，而是会对你在应用源代码中特别引用的代码进行类型检查。

### assumeChangesOnlyAffectDirectDependencies

当这个选项被启用时，TypeScript将避免重新检查/重建所有可能真正受影响的文件，只检查/重建已经更改的文件以及直接导入这些文件的文件。

这可以被认为是监视算法的“快速和松散”实现，它可以大幅减少增量重建时间，代价是不得不偶尔运行完整的构建以获得所有编译器错误消息。

## `files`

**Types**： `string[]`

显式的指定需要编译的文件列表。

如果列表中的文件不存在，则会发生错误。

### example

```json
{
  "files": [
    "main.ts",
    "core.ts",
    "shared.ts",
    "utils.ts"
  ]
}
```

## `include`

**Type**: `string[]`

指定需要编译的文件列表，可以是目录，文件，也可以是模式匹配。
这些文件路径是相对于包含`tsconfig.json`的目录进行解析。

### example

```json
{
  "include": ["src/**/*.ts", "test/**/*.ts"]
}
```

它将会匹配：

```sh
.
├── scripts                ⨯
│   ├── lint.ts            ⨯
│   ├── update_deps.ts     ⨯
│   └── utils.ts           ⨯
├── src                    ✓
│   ├── client             ✓
│   │    ├── index.ts      ✓
│   │    └── utils.ts      ✓
│   ├── server             ✓
│   │    └── index.ts      ✓
├── tests                  ✓
│   ├── app.test.ts        ✓
│   ├── utils.ts           ✓
│   └── tests.d.ts         ✓
├── package.json
├── tsconfig.json
└── yarn.lock
```

### patterns

`include` 和 `exclude` 支持使用 通配符 模式匹配：

- `*` 匹配零个到多个字符（不包含目录分隔符）
- `?` 匹配任意一个字符（不包含目录分隔符）
- `**/` 匹配任意嵌套深度的目录

## `exclude`

**Type**: `string[]`

指定在解析 `include` 包含的文件时，应该跳过的文件列表，可以是目录，文件，也可以是模式匹配。

### example

```json
{
  "exclude": ["src/**/*.spec.ts"]
}
```

**提示**：
`exclude` 仅排除已包含在 `include` 设置中的文件。
但有时候即使`exclude` 已配置了排除某个文件，但在代码中仍然使用`import` 语句引入该文件，或在 `types` 中包含该文件， 或通过 `/// <reference` 引入， `typescript` 仍然会编译它。

`exclude` 并不是一个阻止文件被包含代码组织里的机制，它只是作用于 `include` 查找文件时排除文件。

## `references`

**Type**： `{ path: string }[]`

项目引用是一种将TypeScript项目解构为更小片段的方法。
使用项目引用可以大大提高构建和编辑器交互时间，加强组件之间的逻辑分离，并以新方式改进代码组织。

## `watchOptions`

配置`typescript`编译器 监听 文件和目录 的行为。

当使用 命令行 `--watch` 启用 编译器编译器会使用 `fs.watch` 和 `fs.watchFile` 对 文件和目录进行监听，
但两种方式各有利弊。

`fs.watch` 使用 **file system events** 通知 文件和目录的变更。
但它依赖于操作系统，并且通知并不可靠，在许多操作系统上并不能正常工作。
此外，它还限制了创建监听数量，在一些操作系统上如 `linux`，我们可能会因为包含很多文件的大型项目而很快耗尽它。
但由于它是使用的 **file system events**，它不会消耗过多的 `CPU cycle` 。
在`typescript`编译器中，使用`fs.watch`用于监听允许精度缺失的 **目录** 变更（配置文件的 `include`，
或者模块解析失败的目录）。

但只有 `Windows` 和 `OSX` 支持 递归监听，这意味着在其他系统上需要通过其它方式来支持 递归监听。

`fa.watchFile` 通过 轮询 的方式实现监听，因此需要消耗比较多的 `CPU cycle` 。但是 `fs.watchFile` 是获取 **目录/文件** 状态更新的最可靠的方式。编译器使用 `fs.watchFile` 监听源文件、配置文件和缺失文件引用。

```json
{
  "watchOptions": {
    "watchFile": "",
    "watchDirectory": "",
    "fallbackPolling": "",
    "synchronousWatchDirectory": true,
    "excludeDirectories": [],
    "excludeFiles": []
  }
}
```

### `watchFile`

配置监听单个文件的策略。支持以下可选值：

| | 描述|
|--|--|
| `fixedPollingInterval` | 每秒钟以固定时间间隔多次检查文件变更 |
| `priorityPollingInterval` | 使用 `fs.watchFile` 轮询检查文件变更。但对 源文件、配置文件、和缺失文件使用不同的时间间隔 |
|`dynamicPriorityPolling` | 使用动态队列的方式轮询检查文件变更。对于频繁变更的文件使用较短的时间间隔检查，对于低频变更的文件使用较长的时间间隔检查 |
| `useFsEvents` <Badge>default</Badge> | 使用 `fs.watch`(file system events) 监听文件变更（但在某些操作系统上可能不能正常监听变更）, 当超过了系统允许创建的监听数量限制时使用 `fs.watchFile`替代 |
| `useFsEventsOnParentDirectory` |使用 `fs.watch`(file system events) 监听文件的父目录的变更，精度较低 |

### `watchDirectory`

配置在缺失递归文件监听功能的系统上，监听整个目录的策略。 支持以下可选值：

| | 描述|
|--|--|
| `fixedPollingInterval` | 每秒钟以固定时间间隔多次检查所有目录变更 |
| `dynamicPriorityPolling` | 使用动态队列的方式轮询检查目录变更。对于频繁变更的目录使用较短的时间间隔检查，对于低频变更的目录使用较长的时间间隔检查 |
| `useFsEvents` <Badge>default</Badge> | 使用 `fs.watch`(file system events) 监听目录变更（但在某些操作系统上可能不能正常监听变更）|

### `fallbackPolling`

在使用文件系统事件时，此选项指定在系统耗尽本机文件监视器和/或不支持本机文件监视器时使用的轮询策略。

| | 描述|
|--|--|
| `fixedPollingInterval` | 每秒钟以固定时间间隔多次检查文件变更  |
| `priorityPollingInterval` | 使用 `fs.watchFile` 轮询检查文件变更。但对 源文件、配置文件、和缺失文件使用不同的时间间隔 |
| `dynamicPriorityPolling` | 使用动态队列的方式轮询检查文件变更。对于频繁变更的文件使用较短的时间间隔检查，对于低频变更的文件使用较长的时间间隔检查 |
| `synchronousWatchDirectory` | 禁用目录的延迟监视。当大量文件更改可能同时发生时(例如，运行npm install导致node_modules发生更改)，延迟监视是有用的，但在一些不太常见的设置中，你可能想用这个标志禁用它。 |

### `synchronousWatchDirectory`

在不支持本地递归监听的平台上同步调用回调并更新目录监听器的状态。而不是给一个小的超时，以允许在一个文件上可能发生多次编辑。

```json
{
  "watchOptions": {
    "synchronousWatchDirectory": true
  }
}
```

### `excludeDirectories`

**Type**: `string[]`

配置不需要被 监听的 目录。此配置可以减少需要被监听的文件数量。

### `excludeFiles`

**Type**: `string[]`

配置不需要被 监听的 文件。此配置可以减少需要被监听的文件数量。

## `typeAcquisition`

指向项目 类型获取 的行为。

类型获取 只有在 `javascript` 中有重要作用。在 `javascript` 项目中， `typescript` 工具会在后台或者 `node_modules`外部下载模块的类型声明。

而在 `typescript` 项目中，你需要显式的在项目中指定包含的类型。

```json
{
  "typeAcquisition": {
    "enable": true,
    "include": [],
    "exclude": [],
    "disableFilenameBasedTypeAcquisition": true
  }
}
```

### `enable`

指定是否在 `javascript` 项目中是否启用 类型获取。

### `include`

显式的声明需要包含的依赖类型。用于在 `javascript`项目中帮助`typescript`工具理解依赖跟踪，或者 `disableFilenameBasedTypeAcquisition` 设置为`true`时需要手动添加依赖。

#### example

```json
  "typeAcquisition": {
    "include": ["lodash"],
  }
}
```

### `exclude`

禁用某些模块的类型获取，这对于在测试基础设施中包含主应用程序不需要的其他库的项目非常有用。

#### example

```json
  "typeAcquisition": {
    "exclude": ["jest", "mocha"],
  }
}
```

### `disableFilenameBasedTypeAcquisition`

TypeScript的类型获取可以根据项目中的文件名推断应该添加什么类型。
这意味着在你的项目中有一个像 `JQuery` 这样的文件会自动从 `DefinitelyTyped` 下载`JQuery`的类型。
