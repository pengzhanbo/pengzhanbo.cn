---
url: /article/z09dssz9/index.md
---
闭包是 JavaScript 中一个既强大又容易让人困惑的概念。很多开发者虽然知道闭包的存在，但对它的理解往往停留在表面。本文将带您深入探索闭包的奥秘，从基础概念到高级应用，再到性能优化，让您真正掌握这个 JavaScript 的核心特性。

## 什么是闭包？

### 闭包的基本定义

:::tip 核心概念
闭包可以简单理解为：**一个函数和其词法环境的组合**。当一个函数能够记住并访问其词法作用域，即使函数在其词法作用域之外执行，这个函数就被称为闭包。
:::

在 JavaScript 中，函数在创建时会形成一个包含函数内部变量和外部环境的闭包。这意味着，闭包可以"记住"其创建时的上下文，并能在稍后调用时访问这些变量。

### 闭包的工作原理

要理解闭包的工作原理，我们首先需要理解 JavaScript 的执行上下文和作用域链。当一个函数在另一个函数内部被定义时，它会包含对外部函数变量的引用。这些引用在外部函数执行完毕后不会被销毁，而是被闭包所保留。

```javascript title="基础闭包示例"
function outerFunction() {
  let outerVariable = 'I am from outer scope'
  function innerFunction() {
    console.log(outerVariable)
  }
  return innerFunction
}

const closure = outerFunction()
closure() // 输出: I am from outer scope
```

在上面的例子中，`innerFunction` 保留了对 `outerVariable` 的访问权，即使 `outerFunction` 已经执行完毕。这就是闭包的基本特性。

## 闭包的高级应用场景

### 1. 模拟私有变量

JavaScript 中没有真正的私有变量概念，但通过闭包可以完美模拟出类似的效果。

```javascript title="计数器实现"
function createCounter() {
  let count = 0
  return {
    increment() {
      count++
      return count
    },
    decrement() {
      count--
      return count
    },
    getValue() {
      return count
    }
  }
}

const counter = createCounter()
console.log(counter.increment()) // 输出: 1
console.log(counter.increment()) // 输出: 2
console.log(counter.decrement()) // 输出: 1
console.log(counter.count) // 输出: undefined
```

在这个例子中，`count` 变量无法直接从外部访问，只能通过 `increment`、`decrement` 和 `getValue` 方法进行操作。这种方式在编写模块化代码时尤为有用。

### 2. 柯里化（Currying）

柯里化是一种将接受多个参数的函数转换成一系列接受单个参数的函数的技术。

```javascript title="柯里化函数"
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

// 使用示例
function multiply(a, b, c) {
  return a * b * c
}

const curriedMultiply = curry(multiply)
console.log(curriedMultiply(2)(3)(4)) // 输出: 24
console.log(curriedMultiply(2, 3)(4)) // 输出: 24
```

### 3. 函数记忆化（Memoization）

记忆化是一种优化技术，通过缓存函数调用的结果来避免重复计算。

```javascript title="记忆化实现"
function memoize(fn) {
  const cache = new Map()
  return function (...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      console.log('从缓存中获取结果')
      return cache.get(key)
    }
    else {
      console.log('计算新结果')
      const result = fn.apply(this, args)
      cache.set(key, result)
      return result
    }
  }
}

// 斐波那契数列示例
const fibonacci = memoize((n) => {
  if (n <= 1)
    return n
  return fibonacci(n - 1) + fibonacci(n - 2)
})

console.log(fibonacci(10)) // 只会计算必要的值
```

### 4. 模块模式

闭包是实现 JavaScript 模块化的核心机制。

```javascript title="模块模式实现"
const myModule = (function () {
  let privateVariable = 0

  function privateMethod() {
    return privateVariable
  }

  return {
    publicMethod() {
      privateVariable++
      return privateMethod()
    },
    getValue() {
      return privateVariable
    }
  }
})()

console.log(myModule.publicMethod()) // 输出: 1
console.log(myModule.getValue()) // 输出: 1
console.log(myModule.privateVariable) // 输出: undefined
```

## 闭包在异步编程中的应用

### 解决循环中的闭包问题

这是一个经典的闭包应用场景，也是很多开发者容易犯错的地方。

```javascript title="循环中的闭包问题与解决方案"
// 问题代码 - 所有按钮都会显示最后一个值
function problematicSetup() {
  let buttons = document.querySelectorAll('.problem-btn')
  // eslint-disable-next-line vars-on-top, no-var
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      console.log(`Button ${i} clicked`) // 总是输出 Button 3 clicked
    })
  }
}

// 解决方案1：使用立即执行函数
function solution1() {
  let buttons = document.querySelectorAll('.solution1-btn')
  for (let i = 0; i < buttons.length; i++) {
    (function (index) {
      buttons[index].addEventListener('click', () => {
        console.log(`Button ${index} clicked`)
      })
    })(i)
  }
}

// 解决方案2：使用let（推荐）
function solution2() {
  const buttons = document.querySelectorAll('.solution2-btn')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      console.log(`Button ${i} clicked`)
    })
  }
}
```

### 异步操作中的状态保持

```javascript title="异步操作中的闭包应用"
function createAsyncProcessor(delay) {
  let processing = false
  let queue = []

  return function (data) {
    return new Promise((resolve) => {
      queue.push({ data, resolve })

      if (!processing) {
        processing = true
        processQueue()
      }

      function processQueue() {
        if (queue.length === 0) {
          processing = false
          return
        }

        const item = queue.shift()
        setTimeout(() => {
          console.log(`处理数据: ${item.data}, 延迟: ${delay}ms`)
          item.resolve(`结果: ${item.data}`)
          processQueue()
        }, delay)
      }
    })
  }
}

const processor = createAsyncProcessor(1000)
processor('任务1').then(console.log)
processor('任务2').then(console.log)
```

## 闭包的性能考量与最佳实践

### 内存泄漏风险

:::warning 注意
不当的闭包使用会导致内存泄漏，特别是在循环中创建大量闭包时。
:::

```javascript title="内存泄漏示例"
function createLeakyClosure() {
  let largeData = Array.from({ length: 1000000 }).join('*') // 大量数据
  let unusedVariable = Array.from({ length: 500000 }).join('x') // 未使用的数据

  return function () {
    console.log(largeData.length) // 只使用了largeData
    // unusedVariable 也被保留在内存中！
  }
}

const leakyFunction = createLeakyClosure()
// largeData 和 unusedVariable 都保留在内存中
```

### 性能优化策略

:::steps

* **控制闭包数量**：避免在不必要的场合创建闭包
* **及时释放引用**：在适当时候将不再需要的变量设置为 `null`
* **使用块级作用域**：优先使用 `let` 和 `const` 代替 `var`
* **避免循环引用**：注意闭包与 DOM 元素之间的循环引用

:::

```javascript title="优化后的闭包使用"
function createOptimizedClosure() {
  let importantData = Array.from({ length: 1000000 }).join('*')
  let temporaryData = Array.from({ length: 500000 }).join('x')

  // 使用完毕后立即释放不需要的变量
  temporaryData = null

  return {
    getData() {
      return importantData.length
    },
    cleanup() {
      importantData = null // 提供清理方法
    }
  }
}
```

## 现代 JavaScript 中的闭包

### ES6+ 对闭包的改进

随着 ES6 的普及，`let` 和 `const` 的引入让闭包的使用更加安全和直观。

```javascript title="现代闭包写法"
// 使用 const 和箭头函数
function createModernCounter() {
  let count = 0

  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
    reset: () => count = 0
  }
}

// 类中的闭包
class Counter {
  #count = 0 // 私有字段

  createClosure() {
    return () => this.#count // 箭头函数自动绑定 this
  }
}
```

### 模块系统中的闭包

在 ES6 模块中，闭包的行为更加清晰：

```javascript title="counter.js"
let count = 0

export const increment = () => ++count
export const decrement = () => --count
export const getValue = () => count

// count 变量被模块作用域的闭包保护
```

```javascript title="main.js"
import { getValue, increment } from './counter.js'

console.log(increment()) // 1
console.log(getValue()) // 1
// 无法直接访问 count 变量
```

## 实战案例：构建一个状态管理器

让我们用一个完整的例子来展示闭包在实际项目中的应用：

```javascript title="简单状态管理器"
function createStore(reducer, initialState) {
  let state = initialState
  let listeners = []

  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
    return action
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  dispatch({ type: '@@INIT' })

  return { getState, dispatch, subscribe }
}

// 使用示例
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counterReducer, 0)

store.subscribe(() => {
  console.log('状态更新:', store.getState())
})

store.dispatch({ type: 'INCREMENT' }) // 输出: 状态更新: 1
store.dispatch({ type: 'INCREMENT' }) // 输出: 状态更新: 2
store.dispatch({ type: 'DECREMENT' }) // 输出: 状态更新: 1
```

## 总结

闭包是 JavaScript 中不可或缺的部分，它为我们提供了：

:::info 关键要点

* **数据封装**：实现私有变量和方法
* **状态保持**：在函数调用之间维持状态
* **函数工厂**：动态创建具有特定行为的函数
* **模块化**：构建可维护的代码结构
* **异步编程**：处理回调和高阶函数
  :::

然而，闭包的强大也意味着需要谨慎使用。记住以下最佳实践：

1. **理解作用域链**：清楚知道每个闭包引用了哪些变量
2. **避免不必要的闭包**：特别是在性能敏感的场景中
3. **注意内存管理**：及时释放不再需要的引用
4. **利用现代语法**：使用 `let`/`const` 和箭头函数让闭包更清晰

掌握闭包不仅能让您写出更优雅的 JavaScript 代码，还能帮助您深入理解 JavaScript 的语言特性。

## 参考

* [MDN 闭包文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
* 《你不知道的 JavaScript》上卷
* JavaScript.info 关于闭包的章节
