---
url: /fe-oss/pathe/index.md
---
## 概述

由于历史原因，Windows系统沿袭了MS-DOS的传统，采用反斜杠作为路径分隔符，而非macOS、Linux等Posix操作系统使用的正斜杠。
如今 Windows 系统已同时支持正斜杠与反斜杠的路径表示。
Node.js 内置的 `path` 模块在默认操作时会根据运行的操作系统采用不同处理方式——当运行于Windows系统时，该模块会默认采用Windows风格的路径处理逻辑，这导致了Windows与POSIX系统间的代码行为差异。

与流行的 [upath](./upath.md) 相比，pathe 在提供与 Node.js 完全兼容的API导出的同时，实现了所有操作结果的路径标准化。该库采用现代ESM/TypeScript 编写，且不依赖 Node.js 运行时环境！

本包可作为 Node.js 原生 `path` 模块的无缝替代方案，始终将路径标准化为正斜杠 `/` 格式，并确保在包括 Node.js 在内的各类环境中稳定运行。

::: tip `pathe` 可直接作为 `node:path` 的直接替代方案
:::

## 安装

::: npm-to

```sh
npm install pathe
```

:::

## 使用

```ts
// ESM / Typescript
import { matchesGlob, resolve } from 'pathe'
```

## API

与 `node:path` API 完全兼容。

[**`node:path` API 文档**](https://nodejs.org/api/path.html){.read-more}
