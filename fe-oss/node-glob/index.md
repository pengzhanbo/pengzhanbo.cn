---
url: /fe-oss/node-glob/index.md
---
## 概述

[**glob** 官方文档](https://github.com/isaacs/node-glob){.read-more}

使用 shell 的模式来匹配文件。

这是 JavaScript 中最正确且第二快的 glob 实现。

![glob](https://github.com/isaacs/node-glob/raw/main/logo/glob.png)

## 安装

:::npm-to

```sh
npm install glob
```

:::

## 使用

```ts
import { glob, Glob, globStream, globStreamSync, globSync } from 'glob'
```

```ts
// 所有js文件，但不要查看node_modules
const jsfiles = await glob('**/*.js', { ignore: 'node_modules/**' })

// 支持多种模式
const images = await glob(['css/*.{png,jpeg}', 'public/*.{png,jpeg}'])

// 使用同步模式
const imagesAlt = globSync('{css,public}/*.{png,jpeg}')

// 使用流模式
const filesStream = globStream(['**/*.dat', 'logs/**/*.log'])

const g = new Glob('**/foo', {})
// glob 对象是异步迭代器，也可以执行 globIterate() 或
// g.iterate()，效果相同
for await (const file of g) {
  console.log('found a foo file:', file)
}
```

```ts
// 自定义忽略规则可以这样设置，例如通过以下方式：
// 这将忽略所有markdown文件以及名为'docs'的文件夹
const customIgnoreResults = await glob('**', {
  ignore: {
    ignored: p => /\.md$/.test(p.name),
    childrenIgnored: p => p.isNamed('docs'),
  },
})
```
