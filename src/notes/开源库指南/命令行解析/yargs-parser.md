---
title: yargs-parser
createTime: 2024/07/29 20:17:24
permalink: /fe-oss/yargs-parser/
---

<Badge text="NodeJS" /> <Badge text="Deno" /> <Badge text="Browser" />

<RepoCard repo="yargs/yargs-parser" />

## 概述

==yargs-parser== 是一个轻量级、高性能的 Node.js 命令行参数解析库，专注于将原始命令行输入（如 `process.argv`）转换为结构化的 JavaScript 对象。作为流行框架 `yargs` 的核心解析引擎，它提供了高度可定制的解析能力，适合直接集成或作为底层工具使用。

## 特性

- **参数结构化解析**

  将命令行输入（如 `--name=foo -abc 100`）解析为键值对对象，支持：

  - **布尔标志**：`-a` 解析为 `{ a: true }`
  - **键值参数**：`--file config.txt` 解析为 `{ file: "config.txt" }`
  - **数组与嵌套对象**：`--file a.txt --file b.txt` 生成数组 `{ file: ["a.txt", "b.txt"] }`；
    `--db.host localhost` 生成嵌套对象 { `db: { host: "localhost" }` }
  - **位置参数**：未标记的参数保存在 `_` 属性中（如 `node app.js run` → `{ _: ["run"] }`）

- **解析配置**

  - **类型自动转换**：启用 `parse-numbers` 后，`--port 8080` 自动转为数字（而非字符串）
  - **别名系统**：`alias: { n: "name" }` 使 `-n foo` 等效于 `--name foo`
  - **默认值**：`default: { env: "dev" }` 确保未提供参数时使用默认值
  - **驼峰转换**：`camel-case-expansion` 配置将 `--my-option` 转为 `myOption`

## 安装

::: npm-to

``` sh
npm install yargs-parser
```

:::

## 使用

```ts title="example.js"
import parse from 'yargs-parser'

const argv = parse(process.argv.slice(2))
console.log(argv)
```

```sh
node example.js --foo=33 --bar hello
{ _: [], foo: 33, bar: 'hello' }
```

## 适用场景

- CLI 工具开发
