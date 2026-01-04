---
url: /fe-oss/chokidar/index.md
---
::: note 注释

优秀的好用的 文件监听 相关开源项目, 就目前而言只有 `chokidar` 是我用过最好用的。

如果你有其它不错的文件监听开源项目推荐，欢迎评论留言。
:::

## 概述

[**chokidar** 官方文档](https://github.com/paulmillr/chokidar){.read-more}

跨平台的简洁高效文件监控库。

### 原因

选择 Chokidar 而非原生 `fs.watch/fs.watchFile` 的诸多优势：

* 事件触发机制更可靠
  * macOS系统能准确上报文件名
  * 杜绝重复事件通知
  * 将变更分类为新增/修改/删除，而非无意义的"重命名"提示
* 支持原子写入操作（通过atomic选项）
  * 某些文件编辑器会采用此方式
* 支持分块写入检测（通过awaitWriteFinish选项）
  * 大文件通常采用分块写入方式
* 支持文件/目录过滤
* 完整支持符号链接
* 始终提供递归监控功能（原生事件仅部分支持）
* 可自定义递归监控深度

Chokidar 依赖于 Node.js 核心的 `fs` 模块，但在使用 `fs.watch` 和 `fs.watchFile` 进行监听时，会对接收的事件进行标准化处理，
通常通过获取文件状态和目录内容来验证事件真实性。
默认采用基于 `fs.watch` 的实现方案，该方案避免了轮询机制，能有效降低 CPU 占用率。
请注意，chokidar 会递归地为指定路径范围内的所有内容初始化监听器，因此需谨慎设置监听范围，
避免因监控过多不必要内容而浪费系统资源。在某些情况下会改用 `fs.watchFile` 方案，该方案采用轮询机制，会消耗更多系统资源。

::: important `chokidar` 现在最新版本是 **v4** , 它与旧的版本，在使用上的差异比较大，本文所有的示例都是基于 **v4** 的版本。
:::

## 安装

::: npm-to

```sh
npm install chokidar
```

:::

## 使用

```ts
import { watch } from 'chokidar'
```

### 监听单个文件

```ts
const watcher = watch('./foo.txt')

// 文件的任何变更都会触发
watcher.on('all', (event, path) => {
  console.log(event, path)
})

// 关闭监听
watcher.close()
```

### 监听多个文件

```ts
const watcher = watch(['./foo.txt', './bar.txt'])

// 文件修改
watcher.on('change', (path) => {
  console.log(path)
})

// 向监听器添加新的监听文件
watcher.add('./baz.txt')
watcher.add(['./foz.txt', './bab.txt'])

// 从监听器中移除监听文件
watcher.unwatch('./foo.txt')
```

### 监听文件夹

```ts
// 监听 foo 目录下的所有文件，递归地监听子文件夹
const watcher = watch('/foo/')

// 新增文件
watcher.on('add', path => console.log(path))
// 删除文件
watcher.on('unlink', path => console.log(path))
// 文件修改
watcher.on('change', path => console.log(path))

// 监听多个文件夹
watch(['/foo', '/bar'])
```

需要注意的是，监听文件夹会递归的监听子文件夹，如果文件夹下的文件很多，子目录深度过深可能会导致性能问题。
因此，通常需要配合 `ignored` 参数来限制监听范围，避免递归监听不必要的文件夹。

`ignored` : `string | RegExp | (string | RegExp)[] | (path, stats) => boolean`

**注意，不支持 glob 模式匹配！**

```ts
// 监听 foo 目录下的所有 `.js` 文件
const watcher = watch('/foo/', {
  // 忽略所有非 `.js` 文件
  ignored: (path, stats) => Boolean(stats?.isFile()) && !path.endsWith('.js'),
  ignoreInitial: true
})
```

### 当前工作目录

`cwd` : `string`

```ts
// 监听 foo 目录下的所有文件
const watcher = watch('.', {
  cwd: path.join(process.cwd(), 'foo'),
  ignoreInitial: true,
  // path 参数是绝对路径
  ignored: (path, stats) => Boolean(stats?.isFile())
})

watcher.on('add', (path) => {
  console.log(path) // path 是相对于 `cwd` 的路径
})
```
