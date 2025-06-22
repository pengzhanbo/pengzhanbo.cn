---
title: minimist
createTime: 2024/08/26 19:11:14
permalink: /fe-oss/minimist/
---

<Badge text="NodeJS" />

<RepoCard repo="minimistjs/minimist" />

## 概述

**minimist** 是一个轻量级的 Node.js 命令行参数解析库。

它专注于将 `process.argv` 中的原始参数转换为结构化对象，支持短选项（如 `-a`）、长选项（如 `--debug`）、类型自动转换（布尔值、数字）、别名配置等特性。

## 特性

- **灵活的选项解析**

  - **短选项/长选项**：支持 `-a 1` 和 `--option=value` 格式。
  - **无值选项自动转布尔值**：例如 `--debug` 解析为 `{ debug: true }`。
  - **带值选项**：如 `--port 8080` 解析为 `{ port: 8080 }`。

- **类型控制**

  - **`boolean` 选项**：强制参数为布尔类型（如 `{ boolean: ['verbose'] }`），避免歧义。
  - **`string` 选项**：强制参数为字符串（如 `{ string: ['file'] }`），空值转为空字符串 `""`。
  - **数字自动转换**：若值为数字字符串（如 `--port "8080"`），自动转为数字类型。

- **高级配置**

  - **别名（`alias`）**：例如 `{ alias: { h: 'help' } }`，使 `-h` 和 `--help` 等效。
  - **默认值（`default`）**：为未提供参数设置默认值。
  - **特殊符号 `--`**：`--` 后的参数存入 `_` 数组（如 `node app.js -- file1` → `{ _: ['file1'] }`）。

- **轻量高效**
   无外部依赖，代码精简，适合嵌入小型工具或学习源码设计。

## 安装

通过 npm 安装：

::: npm-to

```sh
npm install minimist
```

:::

## 使用

### 基础解析

```ts
const args = minimist(process.argv.slice(2))
console.log(args)
```

运行命令及输出：

```bash
$ node app.js --name=foo -x 1 --verbose
{ _: [], name: 'foo', x: 1, verbose: true }
```

### 类型强制与别名

```ts
const args = minimist(process.argv.slice(2), {
  boolean: ['debug'], // 强制 debug 为布尔值
  string: ['config'], // 强制 config 为字符串
  alias: { d: 'debug' }, // -d 等价于 --debug
  default: { debug: false } // 默认值
})
```

```bash
$ node app.js -d --config=path/to/file
{ _: [], debug: true, config: 'path/to/file', d: true }
```

### 处理歧义场景

当参数可能被误解析为值时，通过 `boolean` 或 `string` 明确类型：

```sh
node app.js -r value
```

- **默认**：`{ r: 'value' }`
- **`{ boolean: ['r'] }`**：`{ r: true, _: ['value'] }`。

## 使用场景

- **CLI 工具开发**
  - 快速解析用户输入，如 Vue CLI 用其校验参数数量：

    ```ts
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log('提示：仅首个参数被用作应用名称')
    }
    ```

- **自动化脚本**

  - 在 Gulp 等构建工具中处理自定义参数（如 `gulp build --env=prod`）。

- **轻量级配置管理**

  - 替代复杂配置库，适用于一次性脚本或简单应用。
