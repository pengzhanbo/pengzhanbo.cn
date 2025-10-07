---
title: ora
createTime: 2024/05/04 17:48:03
permalink: /fe-oss/ora/
tags:
  - console
  - cli
  - logging
---

<Badge text="NodeJS 18+" />

<RepoCard repo="sindresorhus/ora" />

## 概述

:::center

优雅的终端加载 spinner

![ora spinner](https://github.com/sindresorhus/ora/raw/main/screenshot.svg)
:::

当你的任务需要进行长时间的等待其完成时，给出一个 loading spinner 就很有用了。

## 安装

::: npm-to

```sh
npm install ora
```

:::

## 使用

```ts
import ora from 'ora'

// 创建一个 spinner，注意需要调用 start() 才会显示
const spinner = ora('Loading unicorns').start()

// 可以在任何时候更改 spinner 的状态
setTimeout(() => {
  spinner.color = 'yellow'
  spinner.text = 'Loading rainbows'
}, 1000)

// 当你的长任务完成时
// 如果 成功
spinner.succeed()
// 如果 失败
spinner.fail('fail')
// 中断并输出信息
spinner.info('info')
// 中断并输出警告
spinner.warn('warn')
// 直接中断
spinner.stop()

// 清理 spinner
spinner.clear()
```

::: center
![ora](https://github.com/sindresorhus/ora/raw/main/screenshot-2.gif){style="max-width:320px"}
:::
