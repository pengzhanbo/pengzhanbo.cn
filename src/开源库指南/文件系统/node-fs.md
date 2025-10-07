---
title: node:fs
createTime: 2024/06/10 13:41:44
permalink: /fe-oss/node-fs/
---

<Badge text="NodeJS" />

## 概述

对文件进行操作，包括读取、写入、删除、重命名等操作。

`node:fs` 模块从 `v20` ，其表现已足够覆盖大多数文件操作的需求，无需再依赖其他的文件系统模块。

[**node:fs** 官方文档](https://nodejs.org/docs/latest/api/fs.html){.read-more}

## 其它可代替方案

- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [graceful-fs](https://github.com/isaacs/node-graceful-fs)

## 读取文件

### 同步阻塞读取

```ts
import { readFileSync } from 'node:fs'

const data = readFileSync('path/to/file', 'utf8')
```

### 异步读取

```ts
import { readFile } from 'node:fs/promises'

const data = await readFile('path/to/file', 'utf8')
```

### 读取目录下所有文件

```ts
import { readdir, readFile } from 'node:fs/promises'

// `recursive: true` 递归读取
const files = await readdir('path/to/directory', { recursive: true })

const data = {}
for (const file of files) {
  data[file] = await readFile(file, 'utf8')
}
```

## 写入文件

### 同步阻塞写入

```ts
import { writeFileSync } from 'node:fs'

writeFileSync('path/to/file', 'hello world', 'utf8')
```

### 异步写入

```ts
import { writeFile } from 'node:fs/promises'

await writeFile('path/to/file', 'hello world', 'utf8')
```

### 写入检查

```ts
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

// 确保目录存在
// recursive: true 递归创建
await mkdir(path.dirname('path/to/file'), { recursive: true })
await writeFile('path/to/file', 'hello world', 'utf8')
```

## 检查文件是否存在

```ts
import { existsSync } from 'node:fs'

if (existsSync('path/to/file')) {
  // do something
}
```

:::warning 注意
在对文件进行读写时，并不需要使用 `existsSync` 检查文件是否存在，而应该直接读写，通过 `try-catch` 捕获错误。

读写前检查文件是否存在通常被认为是一种 ==反模式=={.danger} 。
:::

## 删除文件

```ts
import { unlink } from 'node:fs/promises'

await unlink('path/to/file')
```

## 删除目录

```ts
import { rm } from 'node:fs/promises'

// `recursive: true` 递归删除
await rm('path/to/directory', { recursive: true })
```

## 复制文件

```ts
import { copyFile } from 'node:fs/promises'

await copyFile('source/file', 'destination/file')
```

## 复制目录

```ts
import { cp } from 'node:fs/promises'

// `recursive: true` 递归复制
await cp('source/directory', 'destination/directory', { recursive: true })
```
