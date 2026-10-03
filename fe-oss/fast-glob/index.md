---
url: /fe-oss/fast-glob/index.md
---
## 概述

[**fast-glob** 官方文档](https://github.com/mrmlnc/fast-glob){.read-more}

这是一个非常快速高效的Node.js glob 库。

## 安装

:::npm-to

```sh
npm install fast-glob
```

:::

## 使用

```ts
import { glob, globStream, globSync } from 'fast-glob'
```

```ts
// 异步模式
const entries = await glob(['.editorconfig', '**/index.js'], { dot: true })

// 同步模式
const entries = globSync(['.editorconfig', '**/index.js'], { dot: true })

// 流模式
const stream = globStream(['.editorconfig', '**/index.js'], { dot: true })

for await (const entry of stream) {
  // .editorconfig
  // services/index.js
}
```
