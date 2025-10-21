---
url: /article/d12xkizf/index.md
---
## 执行上下文

执行上下文是， `JavaScript` 代码被 **解析** 和 **执行** 时 **所在环境** 的抽象概念。
`JavaScript` 的任何代码都是在执行上下文中执行的。

### 类型

`JavaScript` 有三种 执行上下文 类型：

* **全局执行上下文**

  默认的执行上下文，或者说基础执行上下文。 任何不在函数内部的代码，都是在 全局执行上下文中。
  全局上下文执行两个事情：

  * 创建一个全局的 `window`对象（在浏览器环境中）。
  * 设置 `this` 的值等于 全局的 `window` 对象。

  一个程序只会有一个全局执行上下文。

* **函数执行上下文**

  每当函数被执行时，都会为该函数创建一个新的执行上下文。
  每个函数都有它自己的执行上下文，且是在函数执行的时候进行创建。
  函数上下文可以有任意多个，每当一个函数执行上下文被创建，它会按照定义的顺序，执行一系列步骤。

* **eval函数执行上下文**

  执行在 `eval` 函数内部的代码也会有它属于自己的执行上下文。

### 创建执行上下文

创建执行上下文主要分为两个阶段： **创建阶段** 和 **执行阶段**。

## 创建阶段

在创建阶段，会做三件事：

* this 值的决定，即 This绑定
* 创建词法环境组件
* 创建变量环境组件

### This绑定

* 全局执行上下文

  在全局执行上下文中， `this` 的值指向全局对象。(在浏览器中， `this` 引用 `Window` 对象)。

* 函数执行上下文

  在函数执行上下文中， `this` 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么 `this` 会被设置成那个对象，否则 `this` 的值被设置为全局对象或者 `undefined` （在严格模式下）。

  ```js
  let foo = {
    bar() {
      console.log(this)
    },
  }

  // 'this' 引用 'foo', 因为 'baz' 被对象 'foo' 调用
  foo.bar()

  let bar = foo.baz

  // 'this' 指向全局 window 对象，因为没有指定引用对象
  bar()
  ```

### 词法环境

> [ECMAScript 标准](https://262.ecma-international.org/6.0/)
>
> 词法环境是一种规范类型，基于 ECMAScript 代码的词法嵌套结构来定义标识符和具体变量和函数的关联。
> 一个词法环境由环境记录器和一个可能的引用外部词法环境的空值组成。

词法环境是一种 **持有标识符—变量映射** 的结构。

::: tip
这里的标识符指的是变量/函数的名字，而变量是对实际对象\[包含函数类型对象]或原始数据的引用。
:::

在词法环境的内部有两个组件：**(1) 环境记录器**和 **(2) 一个外部环境的引用**。

* **环境记录器**是存储变量和函数声明的实际位置。
* **外部环境的引用**意味着它可以访问其父级词法环境（作用域）。

词法环境有两种类型：

* **全局环境**（在全局执行上下文中）是没有外部环境引用的词法环境。全局环境的外部环境引用是 `null`。它拥有内建的 Object/Array/等、在环境记录器内的原型函数（关联全局对象，比如 `window` 对象）还有任何用户定义的全局变量，并且 `this` 的值指向全局对象。
* 在**函数环境**中，函数内部用户定义的变量存储在环境记录器中。并且引用的外部环境可能是全局环境，或者任何包含此内部函数的外部函数。

环境记录器也有两种类型：

* **声明式环境记录器**: 存储变量、函数和参数。
* **对象环境记录器**: 用来定义出现在全局上下文中的变量和函数的关系。

可以看出：

* 在**全局环境**中，环境记录器是对象环境记录器。
* 在**函数环境**中，环境记录器是声明式环境记录器。

::: tip 注意
对于**函数环境**，**声明式环境记录器**还包含了一个传递给函数的 `arguments` 对象（此对象存储索引和参数的映射）和传递给函数的参数的 `length`。
:::

使用伪代码描述 词法环境，大致如下：

```
GlobalExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
    }
    outer: <null>
  }
}

FunctionExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
    }
    outer: <Global or outer function environment reference>
  }
}
```

### 变量环境

**变量环境** 同样是一个 **词法环境**，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。

**变量环境** 有着上面定义的词法环境的所有属性。

在 `ES6` 中，**词法环境**和**变量环境**的一个不同就是前者被用来存储函数声明和变量（`let` 和 `const`）绑定，
而后者只用来存储 `var` 变量绑定。

示例代码：

```js
let a = 20
const b = 30
let c

function multiply(e, f) {
  let g = 20
  return e * f * g
}

c = multiply(20, 30)
```

示例代码 执行上下文伪代码：

```
GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      c: undefined,
    }
    outer: <null>
  }
}

FunctionExectionContext = {
  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>
  }
}
```

::: warning
只有遇到调用函数 `multiply` 时，函数执行上下文才会被创建。
:::

**说明：**

可能你已经注意到 `let` 和 `const` 定义的变量并没有关联任何值，但 `var` 定义的变量被设成了 `undefined。`

这是因为在创建阶段时，引擎检查代码找出变量和函数声明，虽然函数声明完全存储在环境中，但是变量最初设置为 `undefined`（`var` 情况下），或者未初始化（`let` 和 `const` 情况下）。

这就是为什么你可以在声明之前访问 `var` 定义的变量（虽然是 `undefined`），但是在声明之前访问 `let` 和 `const` 的变量会得到一个引用错误。

这就是我们说的变量声明提升。

## 执行阶段

在此阶段，完成对所有这些变量的分配，最后执行代码。

::: warning
在执行阶段，如果 `JavaScript` 引擎不能在源码中声明的实际位置找到 `let` 变量的值，它会被赋值为 `undefined`。
:::
