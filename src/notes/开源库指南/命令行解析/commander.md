---
title: commander
createTime: 2024/08/22 19:11:28
permalink: /fe-oss/commander/
---

<Badge text="NodeJS" />

<RepoCard repo="tj/commander.js" />

## 概述

[**commander** 官方文档](https://github.com/tj/commander.js){.read-more}

`commander` 是一个轻量级、功能强大的 Node.js 命令行接口（CLI）开发工具库。

它简化了命令行参数解析、命令定义和帮助文档生成的过程，被广泛应用于构建专业的命令行工具（如 Vue CLI、React Native CLI 等）。

## 特性

- **声明式命令定义**：通过链式 API 直观定义命令、子命令和选项
- **自动生成帮助文档**：基于定义的命令结构自动生成 `--help` 说明
- **灵活的选项解析**：支持短选项（`-v`）、长选项（`--verbose`）、必填/可选参数和默认值
- **智能参数验证**：内置类型检查（字符串、数字、布尔值等）和自定义验证逻辑
- **命令分层结构**：支持多级子命令（如 `git remote add`）
- **交互式提示**：可与 `inquirer.js` 等库集成实现用户交互
- **自动化错误处理**：自动捕获并格式化参数错误
- **插件生态系统**：支持通过插件扩展功能（如 `commander-inquirer`）

## 安装

::: npm-to

```sh
npm install commander
```

:::

## 使用

### 基础示例

```ts
import { Command } from 'commander'
const program = new Command()

program
  .name('file-util')
  .description('文件操作工具')
  .version('1.0.0')

program.command('split')
  .description('拆分文件')
  .argument('<file>', '要拆分的文件')
  .option('-s, --size <bytes>', '分块大小', '1024')
  .action((file, options) => {
    console.log(`拆分文件: ${file}, 分块大小: ${options.size}字节`)
  })

program.parse(process.argv)
```

### 选项配置

```ts
program
  .option('-d, --debug', '启用调试模式', false)
  .option('-c, --count <number>', '重复次数', Number.parseInt, 1)
  .option('-l, --list <items>', '项目列表', val => val.split(','))
  .option('--no-color', '禁用颜色输出')
```

### 高级功能

**自定义验证**：

```ts
program
  .argument('<port>', '端口号', (val) => {
    const port = Number.parseInt(val)
    if (Number.isNaN(port))
      throw new Error('无效端口')
    return port
  })
```

**异步操作**：

```ts
program
  .command('download')
  .action(async () => {
    await fetchData()
    console.log('下载完成!')
  })
```

## 使用场景

- **开发脚手架工具**

  快速创建项目模板（如 `create-react-app` 风格工具）

  ```bash
  my-cli create <project-name> --template vue
  ```

- **构建运维脚本**

  封装服务器部署、日志分析等操作

  ```sh
  deploy-tool --env production --rollback-on-error
  ```

- **创建交互式 CLI 应用**

  结合 `inquirer` 实现问卷式配置生成

  ```bash
  config-generator init
  ```
