---
title: ansis
createTime: 2024/05/04 15:39:22
permalink: /fe-oss/ansis/
tags:
  - console
  - logging
---

<Badge text="NodeJS 14+" /> <Badge text="Bun" /> <Badge text="Deno" /> <Badge text="Chromium-based Browsers" />

<RepoCard repo="webdiscus/ansis" />

## 概述

适用于终端、CI 环境及基于 Chromium 浏览器的ANSI色彩库。

Ansis 注重小巧体积与高速性能，同时提供丰富功能并妥善处理各类边界情况。

## 推荐

相对于 [picocolors](./picocolors.md)，ansis 的功能更加全面，而且支持 链式调用，这在一些日志格式化输出时非常有用。

## 安装

::: npm-to tabs="npm,pnpm,yarn,deno,bun"

```sh
npm install ansis
```

:::

## 使用

```ts
import ansis, { bold, fg, hex, red, rgb } from 'ansis'

console.log(ansis.bold('file.txt'))
console.log(red`Error: ${bold.cyan(file)} not found!`)
console.log(bold.bgRed`ERROR`) // 链式调用，组合文本格式
console.log(fg(208)`Orange`)
console.log(rgb(224, 17, 95)`Ruby`)
console.log(hex('#FF75D1').bold.underline('Pink'))

console.log(ansis.strip(red('Text'))) // 输出纯文本，不包含ANSI代码
```

![ansis](https://github.com/webdiscus/ansis/raw/master/docs/img/ansis-demo.png)
