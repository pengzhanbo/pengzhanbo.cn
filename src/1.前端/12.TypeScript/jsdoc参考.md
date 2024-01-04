---
title: jsdoc参考
author: 鹏展博
createTime: 2022/11/22 09:50:13
permalink: /article/o95q9n27/
---

> 本文翻译自 [官方文档 JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

----

下面的列表概述了当使用 JSDoc 注释在 JavaScript 文件中提供类型信息时，当前支持哪些结构。

注意，下面没有显式列出的任何标记(例如 `@async` )都不支持。

**Types**

- [@type](#type).
- [@param](#param-and-returns) (or [@arg](#param-and-returns) or [@argument](#param-and-returns))
- [@returns](#param-and-returns) (or [@return](#param-and-returns))
- [@typedef](#typedef-callback-and-param)
- [@callback](#typedef-callback-and-param)
- [@template](#template)
- [@satisfies](#satisfies)

**Classes**

- [Property Modifiers](#property-modifiers) [@public](#public), [@private](#private), [@protected](#protected), [@readonly](#readonly)
- [@override](#override)
- [@extends](#extends) (or [@augments](#augments))
- [@implements](#implements)
- [@class](#class) (or [@constructor](#constructor))
- [@this](#this)

**Documentation**

文档标签在TypeScript和JavaScript中都有效。

- [@deprecated](#deprecated)
- [@see](#see)
- [@link](#link)

**Other**

- [@enum](#enum)
- [@author](#author)
- [Other supported patterns](#other-supported-patterns)
- [Unsupported patterns](#unsupported-patterns)
- [Unsupported tags](#unsupported-tags)


其含义通常与 [jsdoc.app](https://jsdoc.app) 中给出的标签含义相同，或者是超集。
下面的代码描述了不同之处，并给出了每个标记的一些示例用法。

## Types

### `@type`

你可以使用 `@type` 标签来声明类型，类型可以是：

- 原始的，如 `string`、`number` 等。
- 在 typescript 声明文件中声明的，可以是全局的，也可以是导入的。
- 在 [@typedef](#typedef-callback-and-param) 标签中声明的。

您可以使用大多数 JSDoc 类型语法和任何 TypeScript 语法，
从 [最基本的语法string](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) 到 [最高级的语法（例如条件类型）](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)。

```js
/**
 * @type {string}
 */
var s;
 
/** @type {Window} */
var win;
 
/** @type {PromiseLike<string>} */
var promisedString;
 
// 你可以用DOM属性指定一个HTML元素
/** @type {HTMLElement} */
var myElement = document.querySelector(selector);
element.dataset.myData = '';
```

`@type` 可以指定联合类型 - 例如，某些内容可以是字符串或布尔值。

```js
/**
 * @type {string | boolean}
 */
var sOrB;
```

可以使用多种语法指定数组类型：

```js
/** @type {number[]} */
var ns;
/** @type {Array.<number>} */
var jsdoc;
/** @type {Array<number>} */
var nas;
```

还可以指定对象文字类型。例如，具有属性“a”（字符串）和“b”（数字）的对象使用以下语法：

```js
/** @type {{ a: string, b: number }} */
var var9;
```

可以使用标准 JSDoc 语法或 TypeScript 语法，使用字符串和数字索引签名来指定类 Map 和类 Array 对象。

```js
/**
 * 一个类似map的对象，将任意 `string` 属性映射到 `number`。
 *
 * @type {Object.<string, number>}
 */
var stringToNumber;
 
/** @type {Object.<number, object>} */
var arrayLike;
```

前面两种类型相当于 TypeScript 类型 `{ [x: string]: number }` 和 `{ [x: number]: any }` 。
编译器理解这两种语法。

可以使用 TypeScript 或 Google Closure 语法指定函数类型：

```js
/** @type {function(string, boolean): number} Closure syntax */
var sbn;
/** @type {(s: string, b: boolean) => number} TypeScript syntax */
var sbn2;
```

或者可以只使用未指定的Function类型：

```js
/** @type {Function} */
var fn7;
/** @type {function} */
var fn6;
```

Closure 中的其他类型也适用：

```js
/**
 * @type {*} - can be 'any' type
 */
var star;
/**
 * @type {?} - unknown type (same as 'any')
 */
var question;
```

#### Casts

TypeScript 借用了 Google Closure 的强制转换语法。
这允许 `@type` 通过在任何带括号的表达式之前添加标签来将类型转换为其他类型。

```js
/**
 * @type {number | string}
 */
var numberOrString = Math.random() < 0.5 ? "hello" : 100;
var typeAssertedNumber = /** @type {number} */ (numberOrString);
```

`const` 甚至可以像 TypeScript 一样进行转换：

```js
let one = /** @type {const} */(1);
```

#### Import types

可以使用 类型导入 从其它文件中导入类型声明，此语法是 TypeScript 特定的，与 JSDoc 标准不同：

```js
// @filename: types.d.ts
export type Pet = {
  name: string,
};
 
// @filename: main.js
/**
 * @param {import("./types").Pet} p
 */
function walk(p) {
  console.log(`Walking ${p.name}...`);
}
```

导入类型可以在类型别名声明中使用：

```js
/**
 * @typedef {import("./types").Pet} Pet
 */
 
/**
 * @type {Pet}
 */
var myPet;
myPet.name;
```

如果不知道模块中值的类型，或者模块中的类型较大且难以获取，则可使用导入类型从模块中获取值的类型：

```js
/**
 * @type {typeof import("./accounts").userAccount}
 */
var x = require("./accounts").userAccount;
```


### `@param` and `@returns`

`@param` 的语法使用与 `@type` 的类型语法使用相同，但添加了参数名称。
该参数也可以通过用方括号括住名称来声明为可选：

```js
// 可以用各种语法形式声明参数
/**
 * @param {string}  p1 - string 参数
 * @param {string=} p2 - 可选参数 (Google Closure syntax)
 * @param {string} [p3] - 可选参数 (JSDoc syntax).
 * @param {string} [p4="test"] - 带默认值的可选参数
 * @returns {string} 返回结果
 */
function stringsStringStrings(p1, p2, p3, p4) {
  // TODO
}
```

同样，对于函数的返回类型：

```js
/**
 * @return {PromiseLike<string>}
 */
function ps() {}
 
/**
 * @returns {{ a: string, b: number }} - 可以使用 '@returns' 或 '@return'
 */
function ab() {}
```

### `@typedef`, `@callback`, and `@param`

可以使用 `@typedef` 定义更加复杂的类型。类似的语法也适用于 `@param`。

```js
/**
 * @typedef {Object} SpecialType - 创建一个名为 'SpecialType' 的类型
 * @property {string} prop1 - SpecialType 上的 string 类型属性
 * @property {number} prop2 - SpecialType 上的 number 类型属性
 * @property {number=} prop3 - SpecialType 上的 一个可选的 number 类型属性
 * @prop {number} [prop4] - SpecialType 上的 一个可选的 number 类型属性
 * @prop {number} [prop5=42] - SpecialType 上的 一个可选的 number 类型属性，默认值为 42
 */
 
/** @type {SpecialType} */
var specialTypeObject;
specialTypeObject.prop3;
```

可以在第一行使用 `Object` 或 `object` 。

```js
/**
 * @typedef {object} SpecialType1 - creates a new type named 'SpecialType1'
 * @property {string} prop1 - a string property of SpecialType1
 * @property {number} prop2 - a number property of SpecialType1
 * @property {number=} prop3 - an optional number property of SpecialType1
 */
 
/** @type {SpecialType1} */
var specialTypeObject1;
```

`@param` 允许对一次性类型规范使用类似的语法。
请注意，嵌套属性名称必须以参数名称作为前缀：

```js
/**
 * @param {Object} options - The shape is the same as SpecialType above
 * @param {string} options.prop1
 * @param {number} options.prop2
 * @param {number=} options.prop3
 * @param {number} [options.prop4]
 * @param {number} [options.prop5=42]
 */
function special(options) {
  return (options.prop4 || 1001) + options.prop5;
}
```

`@callback` 与 `@typedef` 类似，但它指定函数类型而不是对象类型：

```js
/**
 * @callback Predicate
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */
 
/** @type {Predicate} */
const ok = (s) => !(s.length % 2);
```

当然，任何这些类型都可以使用 TypeScript 语法在单行中声明 `@typedef`：

```js
/** @typedef {{ prop1: string, prop2: string, prop3?: number }} SpecialType */
/** @typedef {(data: string, index?: number) => boolean} Predicate */
```

### `@template`

可以使用 `@template` 标签声明类型参数。可以用于创建通用的函数、类或类型：

```js
/**
 * @template T
 * @param {T} x - A generic parameter that flows through to the return type
 * @returns {T}
 */
function id(x) {
  return x;
}
 
const a = id("string");
const b = id(123);
const c = id({});
```

使用逗号或多个标签来声明多个类型参数：

```js
/**
 * @template T,U,V
 * @template W,X
 */
```

还可以在类型参数名称之前指定类型约束。仅列表中的第一个类型参数受到约束：

```js
/**
 * @template {string} K - K must be a string or string literal
 * @template {{ serious(): string }} Seriousalizable - must have a serious method
 * @param {K} key
 * @param {Seriousalizable} object
 */
function seriousalize(key, object) {
  // ????
}
```

最后，可以指定类型参数的默认值：

```js
/** @template [T=object] */
class Cache {
    /** @param {T} initial */
    constructor(initial) {
    }
}
let c = new Cache()
```

### `@satisfies`

`@satisfies` 提供 [对 TypeScript 中后缀运算符的satisfies](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html) 访问。
Satisfies 用于声明某个值实现了某种类型，但不影响该值的类型。

```js
// @ts-check
/**
 * @typedef {"hello world" | "Hello, world"} WelcomeMessage
 */
 
/** @satisfies {WelcomeMessage} */
const message = "hello world" // const message: "hello world"

/** @satisfies {WelcomeMessage} */
const failingMessage = "Hello world!"
// Type '"Hello world!"' does not satisfy the expected type 'WelcomeMessage'.

/** @type {WelcomeMessage} */
const messageUsingType = "hello world" // const messageUsingType: WelcomeMessage
```

## Classes

Classes 可以声明 ES6 的 Classes

```js
class C {
  /**
   * @param {number} data
   */
  constructor(data) {
    // property types can be inferred
    this.name = "foo";
 
    // or set explicitly
    /** @type {string | null} */
    this.title = null;
 
    // or simply annotated, if they're set elsewhere
    /** @type {number} */
    this.size;
 
    this.initialize(data); // Should error, initializer expects a string
  }
  /**
   * @param {string} s
   */
  initialize = function (s) {
    this.size = s.length;
  };
}
 
var c = new C(0);
 
// C should only be called with new, but
// because it is JavaScript, this is allowed and
// considered an 'any'.
var result = C(1);
```

它们也可以声明为构造函数; 需要与 `@constructor` 和 `@this`  一起使用。

### Property Modifiers

`@public`、`@private` 和 `@protected` 的工作方式与 TypeScript 中的 `public`、 `private` 、`protected` 完全相同：

```js
// @ts-check
 
class Car {
  constructor() {
    /** @private */
    this.identifier = 100;
  }
 
  printIdentifier() {
    console.log(this.identifier);
  }
}
 
const c = new Car();
console.log(c.identifier);
// Property 'identifier' is private and only accessible within class 'Car'.
```

- `@public` 始终是隐含的并且可以省略，但意味着可以从任何地方访问属性。
- `@private` 意味着属性只能在包含类中使用。
- `@protected` 意味着属性只能在包含类和所有派生子类中使用，但不能在包含类的不同实例上使用。

`@public`、`@private`、 和 `@protected` 不适用于构造函数。

### `@readonly`

`@readonly` 修饰符确保属性仅在初始化期间被写入。

```js
// @ts-check
 
class Car {
  constructor() {
    /** @readonly */
    this.identifier = 100;
  }
 
  printIdentifier() {
    console.log(this.identifier);
  }
}
 
const c = new Car();
console.log(c.identifier);
```

### `@override`

`@override` 与 TypeScript 的工作方式相同；在重写基类方法的方法上使用它：

```js
export class C {
  m() { }
}
class D extends C {
  /** @override */
  m() { }
}
```

在 tsconfig 中设置 `noImplicitOverride: true` 以检查覆盖。

### `@extends`

当 JavaScript 类扩展通用基类时，没有用于传递类型参数的 JavaScript 语法。该 `@extends` 标签允许这样做：

```js
/**
 * @template T
 * @extends {Set<T>}
 */
class SortableSet extends Set {
  // ...
}
```

请注意，`@extends` 仅适用于类。目前，构造函数无法扩展类。

### `@implements`

同样，也没有用于实现 TypeScript 接口的 JavaScript 语法。该@implements标签的工作方式就像在 TypeScript 中一样：

```js
/** @implements {Print} */
class TextBook {
  print() {
    // TODO
  }
}
```

### `@constructor`

编译器根据 this-property 赋值推断构造函数，但是如果添加 `@constructor` 标签，
可以使检查更严格并提供更好的建议：

```js
/**
 * @constructor
 * @param {number} data
 */
function C(data) {
  // property types can be inferred
  this.name = "foo";
 
  // or set explicitly
  /** @type {string | null} */
  this.title = null;
 
  // or simply annotated, if they're set elsewhere
  /** @type {number} */
  this.size;
 
  this.initialize(data);
// Argument of type 'number' is not assignable to parameter of type 'string'.
/**
 * @param {string} s
 */
C.prototype.initialize = function (s) {
  this.size = s.length;
};
 
var c = new C(0);
c.size;
 
var result = C(1);
// Value of type 'typeof C' is not callable. Did you mean to include 'new'?
}
```

> 注意：错误消息仅显示在具有 [JSConfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 并 [checkJs](https://www.typescriptlang.org/tsconfig#checkJs) 启用的 JS 代码库中。

对于`@constructor`，`this` 是在构造函数 `C` 中检查的，所以你会得到初始化方法的建议，如果你给它传递一个数字就会出现错误。如果调用 `C` 而不是构造它，编辑器也可能显示警告。

不幸的是，这意味着同样可调用的构造函数不能使用 `@constructor`。

### `@this`

`this` 当编译器有一些上下文可以使用时，它通常可以找出类型。如果没有，您可以显式通过 `@this` 标签指定`this`：

```js
/**
 * @this {HTMLElement}
 * @param {*} e
 */
function callbackForLater(e) {
  this.clientHeight = parseInt(e); // should be fine!
}
```


## Documentation

### `@deprecated`

当函数、方法或属性被弃用时，您可以通过使用 `/** @deprecated */` JSDoc 注释对其进行标记来让用户知道。
该信息显示在完成列表中，并作为编辑器可以专门处理的建议诊断。
在 VS Code 等编辑器中，不推荐使用的值通常以删除线样式显示 ~~像这样~~。

```js
/** @deprecated */
const apiV1 = {};
const apiV2 = {};

```

### `@see`

`@see` 允许链接到程序中的其他名称：

```ts
type Box<T> = { t: T }
/** @see Box for implementation details */
type Boxify<T> = { [K in keyof T]: Box<T> };
```

有些编辑器会变成 Box 链接，以便轻松跳转。

### `@link`

@link与 类似@see，只不过它可以在其他标签内使用：

```ts
type Box<T> = { t: T }
/** @returns A {@link Box} containing the parameter. */
function box<U>(u: U): Box<U> {
  return { t: u };
}
```

## Other

### `@enum`

`@enum` 标签允许您创建一个对象字面值，其成员都是指定类型。
与JavaScript中的大多数对象字面量不同，它不允许其他成员。
`@enum` 旨在与Google Closure的 `@enum` 标签兼容。

```js
/** @enum {number} */
const JSDocState = {
  BeginningOfLine: 0,
  SawAsterisk: 1,
  SavingComments: 2,
};
 
JSDocState.SawAsterisk;
```

注意 `@enum` 与TypeScript的 `enum` 完全不同，而且比它简单得多。
但是，与TypeScript的枚举不同，`@enum` 可以是任何类型:

```js
/** @enum {function(number): number} */
const MathFuncs = {
  add1: (n) => n + 1,
  id: (n) => -n,
  sub1: (n) => n - 1,
};
 
MathFuncs.add1;
```

### `@author`

可以使用以下方式指定项目的作者@author：

```js
/**
 * Welcome to awesome.ts
 * @author Ian Awesome <i.am.awesome@example.com>
 */
```

请记住用尖括号将电子邮件地址括起来。否则，`@example` 将被解析为新标签。


### Other supported patterns

```js
var someObj = {
  /**
   * @param {string} param1 - JSDocs on property assignments work
   */
  x: function (param1) {},
};
 
/**
 * As do jsdocs on variable assignments
 * @return {Window}
 */
let someFunc = function () {};
 
/**
 * And class methods
 * @param {string} greeting The greeting to use
 */
Foo.prototype.sayHi = (greeting) => console.log("Hi!");
 
/**
 * And arrow function expressions
 * @param {number} x - A multiplier
 */
let myArrow = (x) => x * x;
 
/**
 * Which means it works for function components in JSX too
 * @param {{a: string, b: number}} props - Some param
 */
var fc = (props) => <div>{props.a.charAt(0)}</div>;
 
/**
 * A parameter can be a class constructor, using Google Closure syntax.
 *
 * @param {{new(...args: any[]): object}} C - The class to register
 */
function registerClass(C) {}
 
/**
 * @param {...string} p1 - A 'rest' arg (array) of strings. (treated as 'any')
 */
function fn10(p1) {}
 
/**
 * @param {...string} p1 - A 'rest' arg (array) of strings. (treated as 'any')
 */
function fn9(p1) {
  return p1.join();
}
```

### Unsupported patterns

对象字面量类型中的属性类型的后缀 equals 不指定可选属性：

```js
/**
 * @type {{ a: string, b: number= }}
 */
var wrong;
/**
 * Use postfix question on the property name instead:
 * @type {{ a: string, b?: number }}
 */
var right;
```

[strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks) 可空类型仅在打开时才有意义：

```js
/**
 * @type {?number}
 * With strictNullChecks: true  -- number | null
 * With strictNullChecks: false -- number
 */
var nullable;
```

TypeScript 原生语法是联合类型：

```js
/**
 * @type {number | null}
 * With strictNullChecks: true  -- number | null
 * With strictNullChecks: false -- number
 */
var unionNullable;
```

不可为 null 的类型没有任何意义，并且被视为其原始类型：

```js
/**
 * @type {!number}
 * Just has type number
 */
var normal;
```

与 JSDoc 的类型系统不同，TypeScript 只允许将类型标记为包含 null 或不包含 null。
没有显式的不可为空性 — 如果打开 `strictNullChecks`，则number不可为空。如果它关闭，则可number为空。

### Unsupported tags

TypeScript 会忽略任何不支持的 JSDoc 标签。

以下标签有待解决的问题来支持它们：

- `@const`（[问题＃19672](https://github.com/Microsoft/TypeScript/issues/19672)）
- `@inheritdoc`（[问题＃23215](https://github.com/Microsoft/TypeScript/issues/23215)）
- `@memberof`（[问题＃7237](https://github.com/Microsoft/TypeScript/issues/7237)）
- `@yields`（[问题＃23857](https://github.com/Microsoft/TypeScript/issues/23857)）
