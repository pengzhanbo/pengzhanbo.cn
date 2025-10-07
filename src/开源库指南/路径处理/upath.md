---
title: upath
createTime: 2024/05/22 11:20:29
permalink: /fe-oss/upath/
---

<Badge text="NodeJS" />

<RepoCard repo="anodynos/upath" />

::: warning 该库上次更新为 `2020-11-07`
:::

## 概述

[**upath** 文档](https://github.com/anodynos/upath){.read-more}

一个可无缝替代/代理 Node.js `path` 模块的工具，具备以下特性：

- 将所有字符串参数和返回结果中的Windows反斜杠 `\` 替换为 Unix 斜杠 `/` 。

- 新增文件扩展名处理函数：
  - addExt - 添加扩展名
  - trimExt - 修剪扩展名
  - removeExt - 移除扩展名
  - changeExt - 更改扩展名
  - defaultExt - 设置默认扩展名

- 扩展标准化功能：
  - normalizeSafe - 保留有意义的起始`./`路径标记
  - normalizeTrim - 在normalizeSafe基础上额外去除冗余的末尾`/`

- 提供辅助函数toUnix：简单实现 `\` 到 `/` 的转换并合并重复斜杠

## 安装

::: npm-to

```sh
npm install upath
```

:::

## 使用

```ts
import upath from 'upath'

upath.normalize('path/to/file')
upath.join('path', 'to', 'file')
```

## API

与 `node:path` API 完全兼容。

[**`node:path` API 文档**](https://nodejs.org/api/path.html){.read-more}
