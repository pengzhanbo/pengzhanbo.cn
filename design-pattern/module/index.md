---
url: /design-pattern/module/index.md
---
::: warning 建议优先使用 ES6 模块（静态加载、显式依赖）和 class（面向对象）实现类似功能。

模块模式的价值更多体现在遗留项目维护或需要精细控制闭包的场景中。
:::

## 什么是模块模式？

\==Module (模块)模式== 是用于封装代码、实现私有作用域的一种设计模式。

它通过闭包和立即执行函数表达式（IIFE），将变量和方法划分为“私有”和“公有”两部分，从而减少全局污染、提高代码可维护性。

## 实现模块模式

### 基本模块模式

通过 IIFE 创建闭包，返回一个包含公有方法的对象：

```ts
const myModule = (function () {
  // 私有变量和方法
  let privateVar = '私有数据'
  function privateMethod() {
    console.log(privateVar)
  }

  // 公有接口
  return {
    publicMethod() {
      privateMethod()
    },
  }
})()

myModule.publicMethod() // 输出 "私有数据"
```

### 揭示模块（Revealing Module）模式

明确声明公有方法，直接暴露内部函数引用，增强可读性：

```ts
const myModule = (function () {
  function privateMethod() { /* ... */ }
  function publicMethod() {
    privateMethod()
  }

  return { publicMethod } // 直接暴露公有方法
})()
```

### 其它

* AMD 模块
* CommonJS 模块
* ES6 模块

## 优点

* **封装性**

  私有变量和方法仅在模块内部可见，避免外部误操作。

* **减少全局污染**

  所有逻辑封装在模块内，避免全局命名冲突。

* **代码组织清晰**

  通过公有接口管理外部可访问的方法，提高可维护性。

* **支持依赖注入**

  可通过参数注入依赖（如 jQuery）：

  ```ts
  const myModule = (function ($) {
    // 使用 $ 作为局部变量
  })(jQuery)
  ```

## 缺点

* **内存占用**

  闭包导致私有变量无法被垃圾回收，长期存在可能增加内存消耗。

* **扩展性差**

  模块是单例的，难以直接继承或扩展（需通过组合或混入模式实现）。

* **测试困难**

  私有方法无法直接测试，需通过公有接口间接验证。

* **ES6 替代方案**

  ES6 模块（import/export）和 class 语法更现代，模块模式在部分场景下已过时。
