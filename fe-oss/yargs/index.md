---
url: /fe-oss/yargs/index.md
---
&#x20;

## 概述

[**yargs** 官方文档](https://github.com/yargs/yargs){.read-more}

\==yargs== 是 Node.js 生态中广泛使用的命令行参数解析库，专注于简化 CLI 工具的开发。

## 特性

* 参数解析与类型转换

  自动解析命令行参数，支持字符串、数字、布尔值、数组等类型转换。

* 命令与子命令系统

  支持多级嵌套命令（如 `cli serve start`），每个命令可独立配置参数和逻辑。

  ```ts
  yargs.command('serve [port]', '启动服务', (yargs) => {
    yargs.positional('port', { default: 5000 })
  }, (argv) => { /* 业务逻辑 */ })
  ```

* 自动化文档生成

  * 基于参数描述（`describe`）和用法示例（`usage`）自动生成帮助菜单（`--help`）。
  * 支持添加脚注（`epilog`）和示例（`example`）

## 安装

::: npm-to

```sh
npm install yargs
```

:::

## 使用

```ts
#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).parse()

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!')
}
else {
  console.log('Retreat from the xupptumblers!')
}
```

```sh
$ ./plunder.js --ships=4 --distance=22
Plunder more riffiwobbles!

$ ./plunder.js --ships 12 --distance 98.7
Retreat from the xupptumblers!
```

### 示例

```ts
#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv)) // hideBin 是 process.argv.slice(2) 的简写形式
  // 添加命令
  .command('serve [port]', 'start the server', (yargs) => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000
      })
  }, (argv) => {
    if (argv.verbose)
      console.info(`start server on :${argv.port}`)
    serve(argv.port)
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .parse()
```

## 适用场景

* 脚手架工具
* 运维自动化脚本
* 交互式 CLI 工具
* 配置动态注入
