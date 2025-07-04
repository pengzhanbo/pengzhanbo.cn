---
url: /fe-oss/cac/index.md
---
## 概述

[**cac** 官方文档](https://github.com/egoist/cac){.read-more}

\==cac== 是一个轻量级 Node.js 库，用于快速构建命令行工具（CLI）。
它提供 简化命令解析、参数处理和子命令管理，同时保持 API 简洁易用。
支持 TypeScript 原生类型推断。

![cac](https://user-images.githubusercontent.com/8784712/28623641-373450f4-7249-11e7-854d-1b076dab274d.png)

## 特性

1. **链式 API 设计**：支持流畅的链式调用（如 `.command().option().action()`），提升代码可读性。
2. **智能参数解析**：
   * 用 `<必选参数>` 和 `[可选参数]` 声明参数，支持展开参数（如 `[...files]`）。
   * 自动生成 `--help` 文档，包含命令描述和示例。
3. **异步操作支持**：`action()` 回调支持 `async/await`，方便处理异步任务。
4. **事件驱动**：继承 `EventEmitter`，可通过 `on()` 监听命令执行事件。
5. **嵌套命令与选项**：支持多级子命令和全局/局部选项，适合复杂 CLI 场景。

## 安装

::: npm-to

```bash
npm install cac
```

:::

## 使用示例

### 基础用法

```ts
import cac from 'cac'

const cli = cac('my-cli')

// 注册全局选项
cli.option('--config <path>', '配置文件路径', { default: './config.json' })

// 定义命令
cli
  .command('build <entry>', '构建项目')
  .option('--minify', '压缩输出文件') // 命令专属选项
  .action((entry, options) => {
    console.log(`构建入口：${entry}`)
    if (options.minify)
      console.log('启用压缩')
  })

// 默认命令（无命令名时触发）
cli.command('').action(() => cli.outputHelp())

cli.parse()
```

### 子命令与异步操作

```ts
cli
  .command('deploy <env>', '部署到环境')
  .option('--force', '强制覆盖')
  .action(async (env, options) => {
    console.log(`部署到 ${env}`)
    if (options.force) {
      await simulateDeployment() // 模拟异步部署
      console.log('部署完成！')
    }
  })

async function simulateDeployment() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}
```

### 错误处理与帮助文档

```ts
cli
  .command('rm <dir>', '删除目录')
  .example('rm dist --recursive') // 自定义示例
  .action((dir, options) => {
    if (!options.recursive)
      throw new Error('需使用 --recursive 标志')
    console.log(`删除目录：${dir}`)
  })

// 捕获未知命令
cli.on('command:not-found', (name) => {
  console.error(`未知命令：${name}`)
  cli.outputHelp()
})
```

## 使用场景

* **脚手架工具**：结合 `inquirer.js` 实现交互式问答（如项目初始化）：

  ```ts
  import inquirer from 'inquirer'
  cli.command('init').action(async () => {
    const answers = await inquirer.prompt([{ type: 'input', name: 'project' }])
    console.log(`创建项目：${answers.project}`)
  })
  ```

* **构建脚本**：定义 `build`、`watch` 等命令，集成 Rollup/Vite 等工具。

* **自动化工具**：如批量文件处理（`lint [...files]`）或部署流程（`deploy production`）。
