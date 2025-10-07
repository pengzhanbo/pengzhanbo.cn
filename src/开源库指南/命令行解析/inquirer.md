---
title: '@inquirer/prompts'
createTime: 2024/08/22 19:12:05
permalink: /fe-oss/inquirer/
---

<Badge text="NodeJS" />

<RepoCard repo="SBoudrias/Inquirer.js" />

## 概述

==@inquirer/prompts== 是一个用于 Node.js 的交互式命令行界面（CLI）库，旨在简化用户输入收集过程。
它支持多种问题类型（如输入框、选择列表、确认框等），并通过 Promise 或回调返回结构化答案，极大提升了命令行工具的交互体验

## 特性

- 问题类型

  支持 input（文本输入）、confirm（是/否）、list（单选列表）、checkbox（多选）、password（密码隐藏输入）等 12 种交互类型

- 异步验证与过滤

  通过 `validate` 函数实时校验输入合法性，`filter` 函数格式化答案

- 条件式提问

  使用 `when` 属性根据前置答案动态跳过问题，实现逻辑分支

- 跨平台兼容

  支持 Windows（CMD/PowerShell）、macOS（Terminal/iTerm）和 Linux（GNOME/Konsole）等终端

## 安装

::: npm-to

```sh
npm install @inquirer/prompts
```

:::

## 示例

### 基础用法

```ts
import { input } from '@inquirer/prompts'

const answer = await input({ message: 'Enter your name' })
```

### 以对象形式获取

```ts
import { confirm, input } from '@inquirer/prompts'

const answers = {
  firstName: await input({ message: 'What\'s your first name?' }),
  allowEmail: await confirm({ message: 'Do you allow us to send you email?' }),
}

console.log(answers.firstName)
```

### 条件式提问

```ts
import { confirm, input } from '@inquirer/prompts'

const allowEmail = await confirm({ message: 'Do you allow us to send you email?' })

let email
if (allowEmail) {
  email = await input({ message: 'What is your email address' })
}
```

### 超时返回默认值

```ts
import { input } from '@inquirer/prompts'

const answer = await input(
  { message: 'Enter a value (timing out in 5 seconds)' },
  { signal: AbortSignal.timeout(5000) },
).catch((error) => {
  if (error.name === 'AbortPromptError') {
    return 'Default value'
  }

  throw error
})
```

## 使用场景

- 脚手架工具
- 命令行配置向导
- 自动化脚本
