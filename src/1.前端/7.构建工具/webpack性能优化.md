---
title: Webpack场景下的项目优化方案
author: pengzhanbo
createTime: 2022/10/11 09:20:02
permalink: /article/fybr4lt3/
---

::: center
![webpack](https://www.webpackjs.com/icon-square-small.85ba630cf0c5f29ae3e3.svg){width=100}
:::

在一个基于 webpack 作为构建工具的前端项目中，通常会有以下两个方面进行优化。

1. [编译构建时间优化](#编译构建时间优化)
2. [构建产物优化](#构建产物优化)


## 编译构建时间优化

编译构建时间优化，旨在加快每次构建的速度，减少构建时间。
它包括，开发时每次修改文件重新编译时的时间开销；为项目构建最终产物时的总体时间开销。

优化的方向包括：

1. [编译构建时间优化](#编译构建时间优化).
2. [缩小文件匹配范围](#缩小文件匹配范围).
3. [文件后缀匹配](#文件后缀匹配).
4. [缓存](#缓存).
5. [并行构建](#并行构建).

### 缩小文件匹配范围

在配置 webpack loader 时，通常会指定两个属性：`test` 和 `use` ，用以声明哪些文件需要被转换。
```js
module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```
在默认情况下，匹配查找范围是相对于项目根目录的上下文进行搜索，当项目文件数量很多时，这个过程会非常耗时。
在这种情况下，可以使用 `include` 和 `exclude` 两个属性来限制文件匹配范围。

```js
const path = require('node:path')
module.exports = {
  module: {
    rules: [{ 
      test: /\.txt$/,
      use: 'raw-loader',
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
    }],
  },
};
```

- `exclude` : 排除所有符合条件的文件
- `include` : 只包含所有符合条件的文件

合理的使用 `include` 和 `exclude` 属性可以有效的减少文件匹配范围，从而减少构建时间。

> **参考：** [webpack module.rules](https://www.webpackjs.com/configuration/module/#rule)

### 文件后缀匹配

通常我们在导入模块时，习惯忽略文件后缀名，因为 `webpack` 会帮助进行补全。

但这是有代价的，webpack 内部尝试使用内置配置，补全后缀后查找文件时候存在，再尝试加载，直到匹配到文件，
这会造成额外的 I/O 开销。

一方面，可以通过修改 webpack 的配置 `resolve.extensions`，调整 后缀补全的规则，并通过顺序控制补全的优先级，
将最常用的文件后缀放在最前面，并减少非必要的后缀名。
```js
module.exports = {
  resolve: {
    // .md, .json 等非必要的，则不要写入配置
    extensions: ['.tsx', '.ts', '.js'],
  },
};
```

另一方面，在导入模块时，尽量不要忽略文件后缀名。

> **参考**： [webpack resolve.extensions](https://www.webpackjs.com/configuration/resolve/#resolveextensions)

### 缓存

每次启动构建，如果都需要重新编译所有的文件，那么势必会花费很长的时间，
所以需要对编译结果进行缓存，以便下次直接加载缓存的结果，并只对修改的文件进行重新编译。

在 `webpack5` 中，提供了 `cache` 配置，可直接开启缓存。

```js
module.exports = {
  cache: {
    type: 'filesystem',
  }
}
```

> **参考**： [webpack cache](https://www.webpackjs.com/configuration/cache/#cache)

### 并行构建

webpack 运行在 NodeJS 环境中，是单线程的，所以一次只能干一件事。
而目前主流的电脑都是多核的，可以利用这一特性，让 webpack 并行构建。
通常情况下，使用 [thread-loader](https://github.com/webpack-contrib/thread-loader) 来实现并行构建。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          // 开启多进程打包。 
          {
            loader: 'thread-loader', 
            options: {
              workers: 3 // 开启 3个 进程
            }
          },
          { loader: 'babel-loader' }
        ]
      }
    ]
  }
}
```

放置在 thread-loader 之后的 loader 会在一个单独的 worker 池(worker pool) 中运行。
每个 worker 都是一个单独的有 600ms 限制的 node.js 进程。同时跨进程的数据交换也会被限制。所以建议仅在耗时的 loader 上使用。

如果项目不大，文件不多，则没必要使用 thread-loader。其本身也有额外的性能开销。


## 构建产物优化

构建产物优化，旨在 减少构建产物的体积，合理的组织构建产物，从而提高页面的加载速度，首屏加载速度等。

通用的构建优化包括：

1. [压缩 `js`, `css`，`html` 代码](#压缩-js-css-html-代码).
2. [压缩图片资源](#压缩图片资源).
3. [代码分割](#代码分割).
4. [按需加载](#按需加载).
5. [preload, prefetch](#preload-prefetch).
6. [tree-shaking](#tree-shaking).


### 压缩 js, css，html 代码

#### 压缩 js

使用 `terser-webpack-plugin` 来压缩 js 代码:

```js
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [ new TerserPlugin() ]
  }
}
```

#### 压缩 css

通过 `css-minimizer-webpack-plugin` 来压缩 css 代码，
同时使用 `mini-css-extract-plugin` 将 css 提取到单独的文件中。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
           // 提取成单独的文件
           MiniCssExtractPlugin.loader,
           'css-loader',
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: 'asset/css/style.css',
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩 css
      new CssMinimizerPlugin({}),
    ],
  },
}
```

#### 压缩 html

使用 `html-webpack-plugin` 来压缩 html 代码。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // 动态生成 html 文件
      template: './index.html',
      minify: {
        // 压缩HTML
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true // 压缩内联css
      },
    })
  ]
}
```


### 压缩图片资源

压缩 图片资源的方法多种多样，需要根据实际的情况进行选择。
其中还包括多倍图的处理，如：`@2x`、`@3x`、`@4x` 等。

比如，可以使用 `image-webpack-loader` 来实现图片压缩。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true },
              optipng: { enabled: false },
              pngquant: { quality: [0.65, 0.9], speed: 4 },
              gifsicle: { interlaced: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ]
  },
}
```


### 代码分割

如果是一个 中大型项目，或者是一个 MPA 项目，一般会拥有多个页面，
但都是使用的相同的技术栈，有重复使用的公共资源。
如果每个页面的代码都独自包含这些相同的代码，则会导致资源的浪费，每次加载不同页面都会加载重复的资源，
浪费用户的流量，页面加载缓慢，影响用户体验。

在这种情况下，将第三方的模块、公共资源单独拆分为独立的文件，
利用缓存机制，不同页面加载的时候只需要花费首次加载的时间，减少二次加载等待时间。

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 值有 `all`，`async` 和 `initial`
      minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）。
      minRemainingSize: 0,
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
      maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
      maxInitialRequests: 30, // 入口点的最大并行请求数。
      enforceSizeThreshold: 50000,
      cacheGroups: {
        'defaultVendors': {
          test: /[\/]node_modules[\/]/,  //第三方模块拆出来
          priority: -10,
          reuseExistingChunk: true,
        },
        'utilVendors': {
          test: /[\/]utils[\/]/, //公共模块拆出来
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
}
```

> **参考**： [代码分离](https://www.webpackjs.com/guides/code-splitting)


### 按需加载

大多数时候，使页面达到可用，并不需要加载所有的资源。

比如在 SPA/MPA 应用中，通过路由来实现不同的页面，如果所有的页面代码都打包在相同的文件，
那么加载某个页面的代码时，实际上也加载了其它页面的代码，导致页面的加载速度达不到预期。

因为，将 路由页面的资源拆分为不同的文件，使用时才加载这些资源，可以减少当前页面的加载时间。

```js
const List = lazyComponent('list', () => import(/* webpackChunkName: "list" */ '@/pages/list'));
const Detail = lazyComponent('detail', () => import(/* webpackChunkName: "detail" */ '@/pages/detail'));
```

进一步的，越尽快的让页面渲染，就越有利于用户体验。
因此，还可以分析当前页面完成首屏渲染所需要的关键资源，将非关键资源拆分出去，首次只加载
关键资源，完成后再加载非关键资源。


### preload, prefetch

- refetch（预获取）：将来某些导航下可能需要的资源
- preload（预加载）：当前导航下可能需要资源

在webpack中使用 `prefetch` 实现预获取：

```js
// ...
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

这会生成 `<link rel="prefetch" href="login-modal-chunk.js">` 并追加到页面头部，指示浏览器在闲置时间预取 login-modal-chunk.js 文件。

在webpack中使用 `preload` 实现预加载：

```ts
//...
import(/* webpackPreload: true */ 'ChartingLibrary');
```

在页面中使用 `ChartComponent` 时，在请求 `ChartComponent.js` 的同时，还会通过 `<link rel="preload">` 请求 `charting-library-chunk`。假定 `page-chunk` 体积比 `charting-library-chunk` 更小，也更快地被加载完成，页面此时就会显示 `LoadingIndicator` ，等到 `charting-library-chunk` 请求完成，`LoadingIndicator` 组件才消失。这将会使得加载时间能够更短一点，因为只进行单次往返，而不是两次往返，尤其是在高延迟环境下。

> **参考**： [webpack prefetch/preload](https://www.webpackjs.com/guides/code-splitting#prefetchingpreloading-modules)

### tree-shaking

`tree shaking` 在**生产模式下已经默认开启**

需要注意的是：

- 只对ESM生效
- 只能是静态声明和引用的 ES6 模块，不能是动态引入和声明的。
- 只能处理模块级别，不能处理函数级别的冗余。
- 只能处理 JS 相关冗余代码，不能处理 CSS 冗余代码。

对于 CSS资源， 可以使用 `purgecss-webpack-plugin` 插件对 CSS 进行 tree-shaking。

```js
const PurgecssPlugin = require('purgecss-webpack-plugin');
module.exports = {
  plugins: [new PurgeCSSPlugin({
      paths: glob.sync('src/**/*', { nodir: true }),
    })],
}
```


> **参考**： [webpack tree-shaking](https://www.webpackjs.com/guides/tree-shaking/)

