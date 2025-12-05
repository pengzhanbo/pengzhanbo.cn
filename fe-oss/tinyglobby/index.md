---
url: /fe-oss/tinyglobby/index.md
---
## 概述

[**tinyglobby** 官方文档](https://github.com/SuperchupuDev/tinyglobby){.read-more}

一个快速且极简的替代方案，旨在与 `globby` 和 `fast-glob` 保持相同行为。

## 安装

:::npm-to

```sh
npm install tinyglobby
```

:::

## 使用

```ts
import { glob, globSync } from 'tinyglobby'

await glob(['files/*.ts', '!**/*.d.ts'], { cwd: 'src' })
globSync(['src/**/*.ts'], { ignore: ['**/*.d.ts'] })
```
