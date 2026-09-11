---
url: /interview-question/jdk3bh3a/index.md
---
::: tip 提问

1. 箭头函数相比函数有什么区别？

:::

1. 箭头函数总是匿名的
2. 绑定this

   在箭头函数出现之前，每个新函数都重新定义了自己的 `this` 值，在ES6之前，通过把this的值赋值给一个变量来保存

   ```js
   function demo() {
     let that = this
     that.count = 0
     // eslint-disable-next-line prefer-arrow-callback
     setTimeout(function () {
       that.count++
       console.log(that.count)
     }, 0)
   }
   ```

   箭头函数可以捕捉闭包上下文的`this`值，所以可以改写成：

   ```js
   function demo() {
     this.count = 0
     setTimeout(() => {
       this.count++
       console.log(this.count)
     })
   }
   ```
