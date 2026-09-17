---
url: /fe-oss/fdir/index.md
---
## 概述

NodeJS 最快的目录遍历与通配符匹配工具

:::important 在需要高性能场景下读取大目录文件时，使用 `fdir` 是一个不错的选择。
最快速度：在NodeJS领域，尚无任何同类工具能在速度上与fdir匹敌。它能轻松在不到1秒内遍历包含100万个文件的目录。
:::

## 安装

:::npm-to

```sh
npm install fdir
```

:::

## 使用

[**fdir** 官方文档](https://github.com/thecodrr/fdir/blob/HEAD/documentation.md){.read-more}

```ts
import { fdir } from 'fdir'
```

```ts
import { fdir as Fdir } from 'fdir'

const crawler = new Fdir()
const files = crawler.crawl('/path/to/dir').sync()
```
