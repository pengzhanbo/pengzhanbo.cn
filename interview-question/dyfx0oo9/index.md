---
url: /interview-question/dyfx0oo9/index.md
---
## 函数柯里化

函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

函数柯里化的目的是参数复用。本质上是降低通用性，提高适用性。

实现：

```js
function curry(fn, ...args) {
  return fn.length < args.length ? fn(...args) : curry.bind(null, fn, ...args)
}
```
