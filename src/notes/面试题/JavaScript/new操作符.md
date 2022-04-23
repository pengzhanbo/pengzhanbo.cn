---
title: new操作符
createTime: 2022/04/22 06:57:30
author: pengzhanbo
permalink: /note/interview-question/chnx193c/
---

::: tip 提问
1. `new` 操作符 具体做了什么？
2. 如果实现 `new`？
:::

## new 操作符

1. 首先创建了一个空对象
2. 设置原型，将对象的原型指向函数的原型
3. 让函数的 `this` 指向这个对象的原型，并执行构造函数的代码
4. 判断函数的返回值类型，如果是值类型，返回创建的对象，如果是引用类型，返回这个引用类型的对象。

## 实现

``` js
function newFactory(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new Error('constructor must be a function');
  }

  const object = Object.create(constructor.prototype);
  const result = constructor.apply(object, args);

  if (result && (typeof result === 'object' || typeof result === 'function')) {
    return result;
  } else {
    return object;
  }
}
```
