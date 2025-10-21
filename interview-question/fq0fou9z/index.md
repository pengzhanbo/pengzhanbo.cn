---
url: /interview-question/fq0fou9z/index.md
---
::: tip 提问

1. AMD 模块加载器原理？
2. CMD 模块加载器原理？
3. CommonJS 模块加载器原理？

:::

::: tip 说明
虽然各个规范有所差异，但其最基本的一些原理原则还是相似的，
这里主要讲 AMD规范的模块加载器的原理，其他规范的差异部分再补充说明。
:::

1. **模块ID**, ID即路径原则。

2. **脚本加载**， 使用 `createElement('script') && appendChild` 请求加载模块。

   一般需要给 script设置一个属性用于标识模块ID。

3. **document.currentScript**，通过该属性获取当前模块的基本信息

文件的路径等信息，对于匿名模块非常有用。

4. 依赖分析

   模块被define后并不是马上可用了，在执行factory方法生产的 export 之前，需要保证它的依赖是可用的，
   需要先把依赖分析出来。

5. 递归加载

分析出模块依赖后，需要递归加载依赖模块。

在 CommonJs规范的nodeJS实现中，一个简化的实现例子如下：

```js
function require(path) {
  if (require.cache[path]) {
    return require.cache[path].exports
  }
  let src = fs.readFileSync(path)
  let code = new Function('exports, module', src)
  let module = { exports: {} }
  code(module.exports, module)
  require.cache[path] = module
  return module.exports
}
require.cache = Object.create(null)
```
