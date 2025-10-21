---
url: /article/browser-event-loop/index.md
---
事件循环，即 Event-Loop。

## 什么是 Event-Loop ？

Event-Loop 是一个执行模型，在 [html5规范](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops) 中进行了浏览器端的 Event-Loop 的明确定义。

## 宏任务与微任务

javascript 有两种异步任务，分别是`宏任务`和`微任务`

### 宏任务

宏任务，`macro task`，也叫 `tasks`，一些异步任务的回调会依次进入 `macro task queue`，等待后续被调用。

这些异步任务包括：

* setTimeout
* setInterval
* setImmediate (Node独有)
* requestAnimationFrame (浏览器独有)
* I/O
* UI rendering

### 微任务

微任务， `micro task`, 也叫 `jobs`，另一些异步任务的回调会依次进入`micro task queue`，等待后续被调用。

这些异步任务包括：

* process.nextTick(Node独有)
* Promise
* Object.observe
* MutationObserver

## 事件循环 Event Loop

1. 执行全局 `script` 代码，这些代码有一些是同步语句，有一些是异步语句（如： setTimeout）；
2. 全局`script`同步代码执行完毕后，调用栈Stack会清空；
3. 从微任务`micro task queue` 中取出位于队首的任务，放入调用栈Stack中执行，执行完后`micro task queue`长度减一；
4. 继续取出微任务`micro task queue`位于队首的任务，放入调用栈Stack中执行，
   以此类推，直到把`micro task queue`中的所有任务都执行完毕。**注意，如果在执行micro task的过程中，产生了`micro task`那么会加入到队列的末尾，也会在这个周期被调用执行**；
5. `micro task`中的所有无人都执行完毕，此时 `micro task queue` 为空队列，调用栈Stack也为空；
6. 取出宏队列 `macro task queue` 中位于队首的任务，放入Stack中执行；
7. 执行完毕后，调用栈Stack为空；
8. 重复第3-7个步骤；
9. 以此继续循环重复；

::: tip 重点

1. 宏任务`marco task` 一次只从队列中取出一个任务执行，执行后就去执行微任务队列中的任务；
2. 微任务队列中所有的任务都会依次取出来执行，直到`micro task queue`为空，
   且当前微任务执行过程中产生新的`micro task`，也会加入到当前`micro task queue`;
3. `UI Rendering`由浏览器自定判断决定执行节点。但是只要执行`UI Rendering`，它的节点是在执行完所有
   `micro task`之后，下一个`macro task`之前，紧跟着执行`UI Rendering`

:::

尝试从代码层面来分析 event-loop:

::: note 抖个机灵
代码人看代码应该比看流程图要来得好理解了吧（bushi）
:::

```js
// 执行器
// 接收一段javascript代码
class Execution {
  constructor(code) {
    this.code = code
    this.macroTaskQueue = []
    this.microTaskQueue = []
  }

  // 启动执行
  exec() {
    // 首次运行，将 传入的 code 推入到 Track中执行
    // 并获取其中的 宏任务和 微任务
    const { macroTaskQueue, microTaskQueue } = this.run(this.code)
    // 将宏任务和微任务 推入到 各自的 队列中
    this.macroTaskQueue.push(...macroTaskQueue)
    this.microTaskQueue.push(...microTaskQueue)
    // 开始执行微任务
    this.runMicroTaskQueue()
  }

  // 执行微任务队列
  runMicroTaskQueue() {
    // 遍历 微任务队列中的所有任务
    // 当当前的 微任务队列清空时，遍历才结束
    while (this.microTaskQueue.length) {
      // 取出 队首的微任务
      const task = this.microTaskQueue.shift()
      // 将 当前微任务 推入到 执行栈中执行
      // 并将返回的 宏任务和微任务 继续 推入到 各自的队列中
      const { macroTaskQueue, microTaskQueue } = this.run(task)
      this.macroTaskQueue.push(...macroTaskQueue)
      this.microTaskQueue.push(...microTaskQueue)
    }
    // 当前微任务执行完毕，继续执行宏任务
    this.runMacroTaskQueue()
  }

  // 执行宏任务队列
  runMacroTaskQueue() {
    // 从 宏任务队列队首 取出一个 宏任务
    const task = this.macroTaskQueue.shift()
    // 将当前 宏任务 推入到 执行栈中执行
    // 并将返回的 宏任务和微任务 继续 推入到 各自的队列中
    const { macroTaskQueue, microTaskQueue } = this.run(task)
    this.macroTaskQueue.push(...macroTaskQueue)
    this.microTaskQueue.push(...microTaskQueue)
    // 再一次执行 微任务队列中的任务
    this.runMicroTaskQueue()
  }

  // 执行栈调用
  run(task) {
    // track 函数表示 执行栈
    // 执行完毕返回 产生的 微任务队列 和 宏任务队列
    const { macroTaskQueue, microTaskQueue } = track(task)
    return { macroTaskQueue, microTaskQueue }
  }
}
const execute = new Execution(scriptCode)
execute.exec()
```

`event-loop` 概念性的内容大体就这么多，接下来从示例中来实际执行情况。

## 示例

::: warning 注意
以下示例是在 `Chrome` 中执行后获得的结果，在其他浏览器的表现并不一定完全相同。
:::

可以尝试自己心中执行这段代码后的打印顺序，再切换到`Console`中看实际的运行结果，是否符合你的预期结果。

::: code-tabs

@tab javascript

```js
console.log('script')

setTimeout(() => {
  console.log('timeout 1')
  Promise.resolve().then(() => {
    console.log('promise 1')
  })
})

new Promise((resolve) => {
  console.log('promise resolver')

  Promise.resolve().then(() => {
    console.log('promise 3')
  })

  resolve('promise 2')
}).then((data) => {
  console.log(data)
})

setTimeout(() => {
  console.log('timeout 2')
})

console.log('end')
```

@tab Console

```txt
script
promise resolver
end
promise 3
promise 2
timeout 1
promise 1
timeout 2
```

:::
