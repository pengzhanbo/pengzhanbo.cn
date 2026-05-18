---
url: /fe-oss/clack-prompts/index.md
---
## 概述

`@clack/prompts` 是一个轻量级、美观且用户友好的命令行交互工具库。
它提供了现代化的 CLI 提示组件，支持 TypeScript 类型安全，具有动画效果和直观的交互体验，适用于创建脚手架工具、配置向导等 CLI 应用。

## 特性

* **类型安全**：完整的 TypeScript 支持，提供精准的类型推断
* **丰富的组件**：支持文本输入、选择器、确认框、多选等交互元素
* **现代化 UI**：动态加载状态、彩色高亮、动画过渡效果
* **取消处理**：内置 `Esc`/`Ctrl+C` 取消操作的处理逻辑
* **输入验证**：内置验证器，支持自定义验证规则
* **主题定制**：允许自定义颜色和样式
* **无障碍支持**：优化键盘导航体验

![cac](https://github.com/bombshell-dev/clack/raw/main/.github/assets/clack-demo.gif)

## 安装

::: npm-to

```bash
npm install @clack/prompts
```

:::

## 使用

### 基础示例

```ts
import {
  cancel,
  confirm,
  isCancel,
  select,
  text
} from '@clack/prompts'

// 处理取消操作的通用函数
function handleCancel(value: unknown) {
  if (isCancel(value)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }
}

(async () => {
  // 文本输入
  const name = await text({
    message: 'What is your name?',
    placeholder: 'Anonymous',
    validate: (value) => {
      if (value.trim().length === 0)
        return 'Name is required!'
    }
  })
  handleCancel(name)

  // 选择器
  const framework = await select({
    message: 'Choose a framework',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js', hint: 'recommended' },
      { value: 'svelte', label: 'Svelte' },
    ]
  })
  handleCancel(framework)

  // 确认框
  const installDeps = await confirm({
    message: 'Install dependencies?'
  })
  handleCancel(installDeps)

  console.log({
    name,
    framework,
    installDeps
  })
})()
```

### 多选组件

```ts
import { multiselect } from '@clack/prompts'

const tools = await multiselect({
  message: 'Select tools:',
  options: [
    { value: 'eslint', label: 'ESLint' },
    { value: 'prettier', label: 'Prettier', selected: true },
    { value: 'typescript', label: 'TypeScript' },
  ],
  required: true
})
handleCancel(tools)
```

### 密码输入

```ts
import { password } from '@clack/prompts'

const secret = await password({
  message: 'Enter API key:',
  mask: '*'
})
handleCancel(secret)
```

### 自定义主题

```ts
import { setTheme, text } from '@clack/prompts'

setTheme({
  color: {
    primary: '#8B5CF6', // 紫色
    error: '#EF4444' // 红色
  },
  symbols: {
    pointer: '👉'
  }
})

const themeDemo = await text({
  message: 'Custom themed input'
})
```

## 使用场景

* **脚手架工具**

  创建项目初始化工具（如 `create-react-app`），交互式配置项目选项

* **CLI 配置向导**

  引导用户完成复杂工具的配置过程（如数据库连接设置）

* **自动化脚本**

  在部署脚本中确认关键操作（如生产环境部署确认）
