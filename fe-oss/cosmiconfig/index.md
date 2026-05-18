---
url: /fe-oss/cosmiconfig/index.md
---
## 概述

\==cosmiconfig== 是一个专为 Node.js 生态设计的智能化配置解析库，旨在解决 JavaScript 工具链中碎片化的配置文件管理问题。
它通过统一、灵活的加载机制，支持包括 JSON、YAML、JS 模块等在内的多种格式，显著简化了开发者对配置文件的查找、解析与集成流程。

::: tip `eslint` / `stylelint` / `prettier` / `webpack` 等知名开源项目，均使用 `cosmiconfig` 进行配置文件解析
:::

## 配置文件查找过程

默认情况下，cosmiconfig 会检查当前目录中是否存在以下配置：

1. `package.json` 文件中的特定属性
2. 无扩展名的 JSON/YAML 格式 "rc文件"
3. 扩展名为 `.json` / `.yaml` / `.yml` / `.js` / `.ts` / `.mjs` / `.cjs` 的 "rc文件"
4. 上述两种文件在 `.config` 子目录中的存在形式
5. `.config.js` / `.config.ts` / `.config.mjs` / `.config.cjs` 格式的配置文件

## 安装

::: npm-to

```sh
npm install cosmiconfig
```

:::

## 使用

### 基本用法

```ts
import cosmiconfig from 'cosmiconfig'

const explorer = cosmiconfig('myapp')

explorer.search().then((result) => {
  console.log(result.config) // 配置内容
})
```

在这个例子中，`cosmiconfig` 按以下顺序查找配置文件：

```txt
package.json 中的 `myapp` 字段
.myapprc
.myapprc.json
.myapprc.{yaml,yml}
.myapprc.{js,ts,mjs,cjs}
.config/.myapprc
.config/.myapprc.json
.config/.myapprc.{yaml,yml}
.config/.myapprc.{js,ts,mjs,cjs}
myapp.config.{js,ts,mjs,cjs}
```

### 自定义搜索路径

```ts
import cosmiconfig from 'cosmiconfig'

const explorer = cosmiconfig('myapp', {
  searchPlaces: ['.myapprc', 'config/myapp.json'], // 自定义搜索路径
})

explorer.search().then((result) => {
  console.log(result.config) // 配置内容
})
```

### 自定义加载器

```ts
const cosmiconfig = require('cosmiconfig')
const explorer = cosmiconfig('myapp', {
  searchPlaces: ['myapp.toml'], // 自定义搜索路径
  loaders: { '.toml': customTOMLParser } // 扩展自定义格式解析
})

// 异步搜索当前目录及祖先目录
explorer.search().then((result) => {
  if (result)
    console.log('配置内容:', result.config)
})
```
