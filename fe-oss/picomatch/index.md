---
url: /fe-oss/picomatch/index.md
---
## 概述

一款基于 JavaScript 编写的极速且精准的全局模式匹配工具。

无第三方依赖，完整支持标准及扩展的Bash通配功能，包括花括号扩展、扩展通配符、POSIX字符集以及正则表达式。

## 场景

* 检查当前文件的路径是否符合特定模式
* 当需要从一个文件列表中 过滤/排除 出符合特定模式的文件集合

## 安装

:::npm-to

```sh
npm install picomatch
```

:::

## 使用

```ts
import pm from 'picomatch'

const isMatch = pm('*.js')

console.log(isMatch('abcd')) // => false
console.log(isMatch('a.js')) // => true
console.log(isMatch('a.md')) // => false
console.log(isMatch('a/b.js')) // => false
```
