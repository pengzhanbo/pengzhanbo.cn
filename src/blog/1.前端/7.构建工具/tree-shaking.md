---
title: tree-shaking，“摇” 掉没用的代码
createTime: 2023/06/04 10:11:37
permalink: /article/hw3zwayv/
---

## 什么是 Tree-Shaking？

Tree-Shaking 是一个现代 JavaScript 打包工具中广泛使用的术语，它指的是在打包过程中**移除未使用的代码**的技术。这个名称非常形象——就像摇动一棵树，让枯叶（无用代码）落下，只保留健康的枝叶（有用代码）。

## 为什么需要 Tree-Shaking？

在传统的前端开发中，我们经常引入整个库或模块，但实际上只使用了其中一小部分功能。比如：

```javascript
import { filter, map, reduce } from 'lodash'

// 只使用了 map 和 filter
const result = array.map(x => x * 2).filter(x => x > 10)
```

上面的例子中，`reduce` 函数被导入但从未使用，Tree-Shaking 可以将其从最终打包文件中移除。

## Tree-Shaking 的工作原理

### 1. 静态分析

Tree-Shaking 依赖于 ES6 模块的**静态结构**特性：

```javascript
// ES6 模块 - 支持 Tree-Shaking
import { functionA } from './moduleA'
export { functionB } from './moduleB'

// CommonJS - 不支持 Tree-Shaking
const moduleA = require('./moduleA')
module.exports = { functionB }
```

ES6 模块在编译时就能确定导入导出的关系，而 CommonJS 在运行时才能确定。

### 2. 依赖图构建

打包工具会构建模块依赖图：

```
Entry → Module A → Module B → Module C
                → Module D (未使用)
```

### 3. 标记和清除

工具会标记所有从入口点可达的代码，然后清除未被标记的代码。

## 实际配置示例

### Webpack 配置

```javascript
// webpack.config.js
module.exports = {
  mode: 'production', // 生产模式自动开启 Tree-Shaking
  optimization: {
    usedExports: true,
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }] // 重要：不转换 ES6 模块
            ]
          }
        }
      }
    ]
  }
}
```

### Rollup 配置

```javascript
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm' // 输出 ES 模块格式
  },
  plugins: [
    // Rollup 默认支持 Tree-Shaking
  ]
}
```

## 最佳实践指南

### 1. 使用 ES6 模块语法

```javascript
// ✅ 推荐 - 支持 Tree-Shaking
import { specificFunction } from 'library'
export function util1() {}
export function util2() {}

// ❌ 避免 - 不支持 Tree-Shaking
const _ = require('lodash')
module.exports = everything
```

### 2. 配置 Babel 正确

```json
// .babelrc
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false // 保持 ES6 模块不变
    }]
  ]
}
```

### 3. 使用支持 Tree-Shaking 的库

选择提供 ES 模块版本的库：

```json
{
  "dependencies": {
    "lodash-es": "^4.17.21", // lodash 的 ES 模块版本
    "date-fns": "^2.29.3" // 天然支持 Tree-Shaking
  }
}
```

### 4. 避免副作用

标记纯模块：

```json
// package.json
{
  "name": "your-package",
  "sideEffects": false
}
```

```json
// package.json
{
  "name": "your-package",
  "sideEffects": [
    "*.css",
    "*.scss"
  ]
}
```

## 常见陷阱和解决方案

### 1. 动态导入问题

```javascript
// ❌ 无法 Tree-Shaking
const moduleName = 'utils'
import(moduleName).then((module) => {
  module.dynamicFunction()
})

// ✅ 明确的静态导入
import { specificUtil } from './utils'
```

### 2. 类的方法移除

```javascript
class Calculator {
  add(a, b) { return a + b }
  multiply(a, b) { return a * b } // 如果未使用会被移除
}

// 只使用 add 方法
const calc = new Calculator()
calc.add(1, 2)
```

### 3. 第三方库的副作用

```javascript
// 某些库可能有副作用，阻止 Tree-Shaking
import 'polyfill-library' // 可能包含副作用
```

## 性能对比示例

让我们看一个实际的 Tree-Shaking 效果对比：

**Tree-Shaking 前：**

```javascript
import _ from 'lodash'

// 只使用一个函数
const result = _.chunk([1, 2, 3, 4], 2)
// 打包大小：~70KB（整个 lodash）
```

**Tree-Shaking 后：**

```javascript
import { chunk } from 'lodash-es'

const result = chunk([1, 2, 3, 4], 2)
// 打包大小：~2KB（仅 chunk 函数）
```

## 调试 Tree-Shaking

### Webpack Bundle Analyzer

```bash
npm install --save-dev webpack-bundle-analyzer
```

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

## 总结

Tree-Shaking 是现代前端优化的关键技术，要充分发挥其作用需要：

1. **使用 ES6 模块**作为项目标准
2. **正确配置构建工具**，避免意外转换模块语法
3. **选择支持 Tree-Shaking 的第三方库**
4. **合理标记副作用**，帮助打包工具识别
5. **定期分析打包结果**，持续优化

通过合理运用 Tree-Shaking，可以显著减少最终打包文件的大小，提升应用加载性能，为用户提供更好的体验。

## 参考

- [Webpack Tree-Shaking 文档](https://webpack.js.org/guides/tree-shaking/)
- [Rollup Tree-Shaking 原理](https://rollupjs.org/guide/en/#tree-shaking)
- [ES6 模块与 CommonJS 差异](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
