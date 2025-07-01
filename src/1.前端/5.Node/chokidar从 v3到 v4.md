---
title: chokidar 从 v3 到 v4 升级指南
createTime: 2025/06/15 20:09:19
permalink: /article/h3gsxe94/
---

众所周知，[chokidar](https://github.com/paulmillr/chokidar) 是前端最广泛使用的 文件监听工具。
在 NPM 上每周有约 1 亿次的下载量，是 `webpack` / `vite` 等主流的前端构建工具的必不可少的依赖之一。

但是从 `v3` 升级到 `v4` ，它有一个非常重要的破坏性变更，这导致了我们升级过程不够平滑。
在这篇文章中，将说明如何进行升级。

<!-- more -->

## 从 v3 到 v4 的破坏性变更

我们先看看 [`v3.6.0` 到 `v4.0.0` 的版本更新说明](https://github.com/paulmillr/chokidar/releases/tag/4.0.0)：

> - Remove glob support
> - Remove bundled fsevents
> - Decrease dependency count from 13 to 1
> - Rewrite in typescript. Makes emitted types more precise
> - The package became hybrid common.js / ESM
> - Bump minimum node.js requirement to v14+

其中，我们重点关注的是第一条： **Remove glob support** 。

在 `v3` 中，chokidar 支持 glob 语法的文件匹配，我们可以这么写：

```ts
import process from 'node:process'
import chokidar from 'chokidar'

const watcher = chokidar.watch('foo/**/*.js', { cwd: process.cwd() })

watcher.on('all', (event, path) => {
  console.log(event, path)
})
```

但在 `v4`， **glob** 模式匹配已被移除，这意味着以上的用法已经无效。

## v4 的新特性

`v4` 版本的 `chokidar.watch(paths[, options])` ，第一个参数可以是 文件路径或者目录 以及它们数组，对于目录，会递归地监听目录下的所有文件。

也就是说：

- 如果传入的是一组文件路径，那么这些文件路径都应该是明确的指向具体的文件。
- 如果是一个目录，那么这个目录下的所有文件都会被监听，包括递归的监听所有子目录下的文件。

因此，在 `v4` 中，我们可以这么写的:

```ts
// 监听文件列表
const watcher = chokidar.watch([
  '/foo/a.js',
  '/foo/b.js',
  '/foo/c.js',
])

// 监听目录，包括 递归的监听子目录
const watcher = chokidar.watch('/foo')
```

以及，可以通过 `watcher.add()` 添加新的文件或目录

```ts
watcher.add('/foo/d.js')
watcher.add(['/foo/e.js', '/foo/f.js'])
watcher.add('/bar')
```

## 从 v3 到 v4 的升级

从上面可以看出，从 `v3` 升级到 `v4` 的最大阻碍是如何从 `glob` 模式匹配改写为 `v4` 的文件路径匹配。

我们先来看一个常见的例子：

```ts
import chokidar from 'chokidar'

const watcher = chokidar.watch('foo/**/*.js')
```

这个例子需要监听 `foo` 目录下的包括其所有子目录的下的 `.js` 文件。

如果我们只考虑 **仅监听现有文件的修改和删除**，那么可以这么写:

```ts
import glob from 'node:fs/promises'
import chokidar from 'chokidar'

const files: string[]
for (const file of await glob('foo/**/*.js')) {
  files.push(file)
}

const watcher = chokidar.watch(files)
```

`fs.glob` 是 `NodeJS v22.0.0` 新增的 API，可以通过 `glob` 模式匹配查找文件，并返回文件路径列表。

但是，如果我们需要考虑 **新增 `.js` 文件** 时，以上的方式就不合适了，因为监听的文件列表是一开始就确定的。

因此需要转换下思路，变更为监听文件目录：

```ts
const watcher = chokidar.watch('./foo')
```

我们很容易就想到在 监听事件中过滤 文件的后缀名：

```ts
watcher.on('add', (path) => {
  if (path.endsWith('.js')) {
    // ...
  }
})

watcher.on('change', (path) => {
  if (path.endsWith('.js')) {
    // ...
  }
})
```

但是，这不是推荐的做法，因为在监听该目录时，是包括了目录下的所有文件类型，即使非 `.js` 文件也一并监听了。
这造成了非必要的额外资源开销，特别是如果该目录较大时，可能会导致性能问题。

因此，我们需要借助于 `chokidar` 的 `ignored` 配置项：

```ts
const watcher = chokidar.watch('./foo', {
  ignored: (path, stats) => {
    // 忽略所有非 `.js` 文件
    return Boolean(stats?.isFile()) && !path.endsWith('.js')
  }
})
```

这可以避免非 `.js` 的文件被监听。

我们再来看一个例子：

```ts
const watcher = chokidar.watch('{foo,bar}/**/{baz,qux}/*.{js,ts,css}')
```

此时问题变得比较棘手了，编写 `ignored` 将变得比较复杂

```ts
import path from 'node:path'
const watcher = chokidar.watch(['./foo', './bar'], {
  ignored: (filepath, stats) => {
    const basename = path.basename(filepath)
    const dirname = path.dirname(filepath).split('/').filter(Boolean).pop()
    return Boolean(stats?.isFile())
      && !basename.endsWith('.js')
      && !basename.endsWith('.ts')
      && !basename.endsWith('.css')
      && dirname !== 'baz'
      && dirname !== 'qux'
  }
})
```

而如果 `glob` 再进一步变得更加复杂：

```ts
const watcher = chokidar.watch([
  '{foo,bar}/**/{baz,qux}/*.{js,ts,css}', 
  'biz/**/*.{js,ts,css,less}',
  'buzz/**{pizz,puz}/*.{js,ts,css}'
])
```

::: danger `ignored` 谁爱写谁写去
:::

我们知道， `v3` 的 glob 有 `picomatch` 提供支持，因此，我们也可以引入 `picomatch` 来实现类似的功能。
对于 `ignored` ，我们所要做的，就是对结果取反：

```ts
import process from 'node:process'
import path from 'node:path'
import picomatch from 'picomatch'
import chokidar from 'chokidar'

const cwd = process.cwd()

const matcher = picomatch([
  '{foo,bar}/**/{baz,qux}/*.{js,ts,css}', 
  'biz/**/*.{js,ts,css,less}',
  'buzz/**{pizz,puz}/*.{js,ts,css}'
])
const watcher = chokidar.watch(['./foo', './bar', './biz', './buzz'], {
  cwd,
  ignored: (filepath, stats) => {
    if (stats?.isFile()) {
      // 结果取反，表示匹配的结果不忽略，反之忽略
      return !matcher(path.relative(cwd, filepath))
    }
    return false
  }
})
```

### `ignored` 的注意事项

`ignored` 检查的 `filepath` ，包括了 文件和 目录，并且包括一级目录，比如 `watch('./foo')`，
`filepath` 会包含 `${cwd}/foo` 的目录路径，如果你在 `ignored` 的结果中不小心忽略了它，
那么会导致整个 `watcher` 不再监听任何文件。因此，在忽略文件时，最好使用 `stats.isFile()` 预先检查：

```ts
const watcher = chokidar.watch('./foo', {
  ignored: (path, stats) => {
    if (stats?.isFile()) {
      // 检查要忽略的文件
    }
    return false // 表示非文件则不忽略
  }
})
```

同理，忽略目录时，最好使用 `stats.isDirectory()` 预先检查。
