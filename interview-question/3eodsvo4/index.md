---
url: /interview-question/3eodsvo4/index.md
---
::: tip 提问

1. 什么是 节流与防抖？
2. 如何实现 节流与防抖？

:::

## 节流与防抖

* 函数防抖： 在事件被触发的 N秒后再执行回调，如果在这N秒内事件又被触发，则重新计时。

* 函数节流：在一个规定的单位时间内，只能有一次触发事件的回调函数执行，如果在单位时间内事件被触发多次，只有一次生效。

## 实现

### 函数防抖

```js
function debounce(fn, wait) {
  let timer = null
  return function (...args) {
    let ctx = this

    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(ctx, args)
    }, wait)
  }
}
```

### 函数节流

```js
function throttle(fn, delay) {
  let preTime = Date.now()
  return function (...args) {
    let ctx = this
    let nowTime = Date.now()
    if (nowTime - preTime >= delay) {
      preTime = Date.now()
      return fn.apply(ctx, args)
    }
  }
}
```
