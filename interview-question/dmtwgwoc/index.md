---
url: /interview-question/dmtwgwoc/index.md
---
::: tip 提问

1. 什么是原型
2. 什么是原型链
3. 原型链与继承

:::

## 原型

Javascript 是一种基于原型的语言，同时，javascript只有一种结构：对象。
每个实例对象都有一个私有属性 `__proto__`指向它的构造函数的原型对象`prototype`

## 原型链

原型对象`prototype`也有自己的原型对象`__proto__`，层层向上，直到有一个的原型对象为null。根据定义，null没有原型，并作为这个原型链的最后一个环节。

## 原型链与继承

`javascript` 对象是动态的属性"包裹"（指自身的属性）。同时，对象还有一个指向一个原型对象的链。
当访问一个对象的属性时，不仅会在该对象上查找，也会在该对象的原型上查找，进而在该对象的原型的原型上查找，
依次层层向上查找，直到找到匹配的属性，或者到达原型链的末尾。

当继承的函数被调用时，`this`指向的是当前继承的对象，而不是继承的函数所在的原型对象。

## 获取原型的方法

* `someObj.__proto__`
* `someObj.constructor.prototype`
* `Object.getPrototypeOf(someObj)`
