---
url: /interview-question/69vboeiz/index.md
---
::: tip 提问

1. 什么是严格模式？
2. 严格模式有什么作用？

:::

## 严格模式

严格模式 是 ECMAScript5 添加的 严格运行模式，这种模式使得 javascript 在更严格的条件下运行。

```js
'use strict'
```

### 目的

* 消除 javascript 语法的一些不合理，不严谨之处，减少一些怪异行为；
* 消除代码运行的一些不安全之处，保证代码运行的安全；
* 提高编译效率，增加运行速度；
* 为未来新版本的 javascript做好铺垫。

## 区别

* 禁止使用 with 语句
* 禁止 this 关键字指向全局对象
* 对象不能有重名的属性
