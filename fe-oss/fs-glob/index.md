---
url: /fe-oss/fs-glob/index.md
---
&#x20;

## 概述

`NodeJS` 在 22.0.0 版本新增的试验性 API。

根据模式，查找匹配的文件和目录。

## 使用方法

### 回调模式

```ts
import { glob } from 'node:fs'

glob('**/*.js', (err, matches) => {
  if (err)
    throw err
  console.log(matches) // 文件或目录 路径列表
})
```

### 同步阻塞查找

```ts
import { globSync } from 'node:fs'

const matches = globSync('**/*.js')

console.log(matches) // 文件或目录 路径列表
```

### 异步查找

```ts
import { glob } from 'node:fs/promises'

for await (const entry of glob('**/*.js'))
  console.log(entry)
```

## API

### `fs.glob(pattern[, options], callback)`

* `pattern`: `string | string[]` 匹配模式
* `options`: `object` 选项
  * `cwd`: `string` 当前工作目录。默认值：process.cwd()
  * `exclude`: `Function | string[]` 用于过滤文件/目录或要排除的 glob 模式列表的函数。如果提供了函数，则返回 `true` 以排除该项目，返回 false 以包含它。默认值：undefined。
  * `withFileTypes`: `boolean` 如果 glob 应将路径返回为 `Dirents`，则为 `true`，否则为 `false`。默认值：false。
* `callback`: `(err, matches) => void` 回调函数

```ts
import { glob } from 'node:fs'

glob('**/*.js', (err, matches) => {
  if (err)
    throw err
  console.log(matches)
})
```

### `fs.globSync(pattern[, options])`

* `pattern`: `string | string[]` 匹配模式
* `options`: `object` 选项
  * `cwd`: `string` 当前工作目录。默认值：process.cwd()
  * `exclude`: `Function | string[]` 用于过滤文件/目录或要排除的 glob 模式列表的函数。如果提供了函数，则返回 `true` 以排除该项目，返回 false 以包含它。默认值：undefined。
  * `withFileTypes`: `boolean` 如果 glob 应将路径返回为 `Dirents`，则为 `true`，否则为 `false`。默认值：false。

```ts
import { globSync } from 'node:fs'

const matches = globSync('**/*.js')

console.log(matches)
```

### `fs.promises.glob(pattern[, options])`

* `pattern`: `string | string[]` 匹配模式
* `options`: `object` 选项
  * `cwd`: `string` 当前工作目录。默认值：process.cwd()
  * `exclude`: `Function | string[]` 用于过滤文件/目录或要排除的 glob 模式列表的函数。如果提供了函数，则返回 `true` 以排除该项目，返回 false 以包含它。默认值：undefined。
  * `withFileTypes`: `boolean` 如果 glob 应将路径返回为 `Dirents`，则为 `true`，否则为 `false`。默认值：false。

```ts
import { glob } from 'node:fs/promises'

for await (const entry of glob('**/*.js'))
  console.log(entry)
```
