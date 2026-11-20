---
url: /fe-oss/unconfig/index.md
---
## 概述

\==unconfig== 是一个轻量级、高度灵活的 Node.js 开源工具库，专注于简化配置文件读取的过程。
它由 Vue 和 Vite 核心团队成员 Anthony Fu 开发，旨在解决工具库和框架中多格式配置文件的兼容性问题。

**unconfig 默认支持 `ts`, `mjs`, `js`, `json`**

## 安装

::: npm-to

```sh
npm install unconfig
```

:::

## 使用

```ts
import { loadConfig } from 'unconfig'

const { config, sources } = await loadConfig({
  sources: [
    // const `my.config.xx` 加载
    {
      files: 'my.config',
      // 默认扩展
      extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
    },
    // 如果在上述配置文件中未找到，则加载`package.json`中的`my`字段
    {
      files: 'package.json',
      extensions: [],
      rewrite(config) {
        return config?.my
      },
    },
    // 从 `vite.config` 加载内联配置
    {
      files: 'vite.config',
      async rewrite(config) {
        const resolved = await (typeof config === 'function' ? config() : config)
        return resolved?.my
      },
    },
    // ...
  ],
  // 如果为false，则仅加载第一个匹配项
  // 如果为true，将加载所有匹配项并进行深度合并
  merge: false,
})
```
