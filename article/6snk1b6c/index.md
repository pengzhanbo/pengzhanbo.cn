---
url: /article/6snk1b6c/index.md
---
\==理解JavaScript执行上下文栈是掌握JavaScript核心机制的关键一步=={.important}。本文将深入探讨执行上下文栈的工作原理，通过实际代码示例帮助你彻底理解这个重要的概念。

## 什么是执行上下文？

执行上下文是JavaScript代码被评估和执行的环境。它决定了在特定时刻哪些变量、函数和对象是可访问的。

:::info 执行上下文的类型

* **全局执行上下文（GEC）**：当JavaScript开始执行时默认创建，包含全局变量和函数
* **函数执行上下文（FEC）**：每次函数调用时创建，管理函数的局部变量和参数
* **Eval执行上下文**：由`eval()`函数创建（不推荐使用）
  :::

## 执行上下文的两个阶段

每个执行上下文都经历两个主要阶段：

### 1. 创建阶段

```javascript title="创建阶段示例"
console.log(name) // undefined
var name = '张三'
console.log(name) // "张三"
```

在创建阶段：

* 为变量和函数分配内存
* 变量被初始化为`undefined`
* 函数声明被完全提升到内存中
* 定义作用域链和`this`值

### 2. 执行阶段

在执行阶段：

* 代码逐行执行
* 变量被赋予实际值
* 函数被调用执行

## 执行上下文栈（调用栈）

执行上下文栈是JavaScript引擎用来管理执行上下文的数据结构，遵循 **后进先出（LIFO）** 原则。

```javascript
function first() {
  console.log('第一个函数开始')
  second()
  console.log('第一个函数结束')
}

function second() {
  console.log('第二个函数开始')
  third()
  console.log('第二个函数结束')
}

function third() {
  console.log('第三个函数执行')
}

// 执行函数调用
first()
```

## 详细执行流程分析

让我们通过一个具体例子来理解整个执行过程：

```javascript title="执行上下文栈详细示例"
let globalVar = '全局变量'

function outer() {
  let outerVar = '外部变量'

  function inner() {
    let innerVar = '内部变量'
    console.log(innerVar) // 内部变量
    console.log(outerVar) // 外部变量（通过作用域链访问）
    console.log(globalVar) // 全局变量（通过作用域链访问）
  }

  inner()
}

outer()
```

:::steps

* **步骤1**：创建全局执行上下文，压入栈底
  * 变量：`globalVar = undefined`
  * 函数：`outer = function() {...}`
* **步骤2**：执行阶段，`globalVar`被赋值为"全局变量"
* **步骤3**：调用`outer()`，创建函数执行上下文并压入栈顶
* **步骤4**：在`outer()`中创建`inner()`的执行上下文并压入栈顶
* **步骤5**：`inner()`执行完毕，其上下文从栈中弹出
* **步骤6**：`outer()`执行完毕，其上下文从栈中弹出
* **步骤7**：程序结束，全局上下文被清除

:::

## 作用域链与变量查找

JavaScript使用**词法作用域**，这意味着函数的作用域在定义时就已经确定。

```javascript title="作用域链示例"
let x = 10

function parent() {
  let y = 20

  function child() {
    let z = 30
    console.log(x + y + z) // 60
    // JavaScript会沿着作用域链查找变量：
    // 1. 当前上下文（child）→ 2. 父上下文（parent）→ 3. 全局上下文
  }

  child()
}

parent()
```

## 常见的执行上下文问题

### 1. 栈溢出错误

```javascript title="栈溢出示例"
function infiniteRecursion() {
  infiniteRecursion() // 无限递归，导致栈溢出
}

// infiniteRecursion(); // 不要执行这行代码！
```

:::warning 栈溢出预防

* 为递归函数设置明确的终止条件
* 使用尾调用优化（在支持的环境中）
* 对于深度递归，考虑使用迭代解决方案
  :::

### 2. 变量提升的陷阱

```javascript title="变量提升问题"
console.log(a) // undefined
var a = 5

console.log(b) // ReferenceError: Cannot access 'b' before initialization
let b = 10

// 函数声明 vs 函数表达式
sayHello() // "Hello!" - 函数声明被完全提升

function sayHello() {
  console.log('Hello!')
}

sayHi() // TypeError: sayHi is not a function
var sayHi = function () {
  console.log('Hi!')
}
```

## 异步代码与执行上下文栈

:::tip 异步执行机制
JavaScript是单线程的，但通过事件循环机制处理异步操作。异步回调函数会在调用栈为空时执行。
:::

```javascript title="异步执行示例"
console.log('开始')

setTimeout(() => {
  console.log('定时器回调')
}, 0)

console.log('结束')

// 输出顺序：
// 开始
// 结束
// 定时器回调
```

## 调试技巧：查看调用栈

现代浏览器提供了查看调用栈的功能：

```javascript title="调用栈调试"
function functionA() {
  functionB()
}

function functionB() {
  functionC()
}

function functionC() {
  console.trace('当前调用栈') // 在控制台显示调用栈
}

functionA()
```

## 最佳实践

:::important 执行上下文最佳实践

1. **避免深层嵌套**：减少函数调用深度，防止栈溢出
2. **合理使用变量**：理解`var`、`let`、`const`的不同提升行为
3. **注意闭包使用**：闭包会保持对外部变量的引用，可能影响内存
4. **利用作用域**：合理组织代码结构，利用作用域链的优势
   :::

## 总结

执行上下文栈是JavaScript运行时的核心机制：

* 🎯 **执行上下文**为代码执行提供环境
* 🔄 **两个阶段**：创建阶段（内存分配）和执行阶段（代码运行）
* 📚 **调用栈**管理执行上下文的顺序（LIFO原则）
* 🔗 **作用域链**实现变量查找机制
* ⚡ **异步操作**通过事件循环与调用栈协同工作

掌握执行上下文栈的概念，能够帮助你编写更高效、更可预测的JavaScript代码，并在调试时快速定位问题根源。

## 参考

* [MDN - 执行模型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
