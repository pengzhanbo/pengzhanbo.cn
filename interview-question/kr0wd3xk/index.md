---
url: /interview-question/kr0wd3xk/index.md
---
::: tip 提问

1. 对象有哪些原生方法？
2. 数组有哪些原生方法？
3. 什么是类数组？

:::

## 对象的原生方法

* `Object.assign()` 通过复制一个或多个对象来创建一个新的对象
* `Object.create()` 使用指定的原型对象和属性创建一个新对象
* `Object.defineProperty()` 给对象添加一个属性并指定该属性的配置
* `Object.defineProperties()` 给对象添加多个属性并分别指定它们的配置
* `Object.entries()` 返回给定对象自身可枚举属性的`[key, value]` 数组
* `Object.freeze()` 冻结对象，其他代码不能删除或更改任何属性
* `Object.getOwnPropertyNames()` 返回一个包含了指定对象所有可枚举或不可枚举的属性名的数组
* `Object.getOwnPropertySymbols()` 返回一个包含了指定对象自身所有的符号属性
* `Object.getPrototypeOf()` 返回指定对象的原型对象
* `Object.is()` 比较两个值是否相同。(所有 NaN值都相等。)
* `Object.keys()` 返回一个包含所有给定对象自身可枚举属性名称的数组
* `Object.preventExtensions()` 防止对象的任何扩展
* `Object.seal()` 防止其他代码删除对象的属性
* `Object.values()` 返回给定对象自身可枚举值的数组

## 数组的原生方法

### 静态方法

* `Array.from()` 从类数组对象或可迭代对象中创建一个新的数组实例
* `Array.isArray()` 判断某个变量是否是一个数组对象
* `Array.of()` 根据一组参数来创建新的数组实例

### 实例方法

* `Array.prototype.concat()` 合并两个或多个数组，并返回一个新的数组
* `Array.prototype.copyWithin` 浅复制数组的一部分到同一数组的另一个返回，并返回它，不会改变原数组的长度
* `Array.prototype.entries()` 返回一个新的`Array Iterator`对象，对象包含数组中的每个索引的键值对
* `Array.prototype.every()` 测试一个数组组内的所有元素是否都能通过某个指定函数的测试，并返回一个布尔值
* `Array.prototype.fill()` 用一个固定值填充一个数组中的全部元素
* `Array.prototype.filter()` 创建一个新数组，包含通过所提供的函数实现的测试的所有元素
* `Array.prototype.find()` 返回数组中满足提供的测试函数的第一个元素，否则返回 undefined
* `Array.prototype.findIndex()` 返回数组中满足提供的测试函数的第一个元素的索引，否则返回 -1
* `Array.prototype.flat()` 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
* `Array.prototype.flatMap()` 使用映射函数映射每一个元素，然后将结果压缩成一个新数组
* `Array.prototype.forEach()` 对数组的每一个元素执行一次给定的函数
* `Array.prototype.includes()` 判断一个数组是否包含一个指定的值，返回一个布尔值
* `Array.prototype.indexOf()` 返回在数组中可以找到一个给定元素的第一个索引，不存在则返回 -1
* `Array.prototype.join()` 将一个数组的所有元素链接成一个字符串并返回
* `Array.prototype.keys()` 返回一个包含数组中每个索引建的 `Array Iterator`对象
* `Array.prototype.lastIndexOf()` 返回指定元素在数组中的最后一个索引，不存在则返回 -1
* `Array.prototype.map()` 返回一个数组，其结果是该数组的每个元素是调用一次提供的函数后的返回值
* `Array.prototype.pop()` 从数组中删除最后一个元素，并返回该元素的值
* `Array.prototype.push()` 将一个或多个元素添加到数组的末尾，并返回该数组的新长度
* `Array.prototype.reduce()` 对数组中的每个元素指定一个指定的reducer函数（从左向右），将其结果汇总为单个返回值
* `Array.prototype.reduceRight()` 类似于 `reduce()`，但是是从右向左
* `Array.prototype.reverse()` 将数组中元素的位置颠倒，并返回该数组。该方法会改变原数组
* `Array.prototype.shift()` 从数组中删除第一个元素，并返回该元素的值
* `Array.prototype.slice()` 提取原数组的一部分并返回一个新数组
* `Array.prototype.some()` 测试数组中是不是至少有一个元素通过了提供的测试函数
* `Array.prototype.sort()` 对数组元素进行原地排序并返回此数组
* `Array.prototype.splice()` 通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容
* `Array.prototype.unshift()` 将一个或多个元素添加到数组的头部，并返回该数组的新长度
* `Array.prototype.values()` 返回一个新的`Array Iterator` 对象，该对象包含数组每个索引的值。

### 类数组

类数组是指 一个拥有 `length` 属性 和 若干索引属性的对象。

类数组对象和数组类似，但不能调用数组的方法。

常见的类数组有， `arguments` 和 DOM方法返回的结果
