---
url: /article/gu55hnjs/index.md
---
:::info 重要提示
本文讨论的是 **原生 CSS @function 规则**，而非 Sass/Less 等预处理器中的函数功能。这是 CSS 规范中正在发展的新特性，用于在原生 CSS 中定义可重用的函数逻辑。
:::

::: warning `@function` 目前的浏览器兼容性堪忧，不建议在生产中使用
:::

@[caniuse](mdn-css_at-rules_function)

## 什么是 CSS @function？

CSS `@function` 规则允许开发者定义自定义函数，这些函数可以接受参数并返回计算后的值。这为 CSS 带来了真正的编程能力，让样式代码更加模块化和可维护。

### 基本语法结构

```css title="基础 @function 语法"
@function --function-name(<function-parameter>#?) [returns <css-type>]? {
  <declaration-rule-list>
}
```

## 入门示例：从简单开始

让我们通过一个实际的例子来理解 `@function` 的基本用法。

### 示例 1：基础数值计算

```css title="定义一个简单的加倍函数"
@function --double(--value) {
  result: calc(var(--value) * 2);
}

.container {
  --base-size: 20px;
  padding: --double(var(--base-size)); /* 结果为 40px */
  margin: --double(10px); /* 结果为 20px */
}
```

:::steps

* **函数定义**：使用 `@function` 关键字定义函数，函数名必须以 `--` 开头
* **参数声明**：在括号内声明参数，参数也是自定义属性
* **返回值**：使用 `result` 描述符指定函数的返回值
* **函数调用**：在属性值中使用 `--function-name(arguments)` 语法调用

:::

## 深入理解：高级特性

### 1. 类型约束和默认值

为了编写更健壮的函数，我们可以指定参数和返回值的类型：

```css title="带类型约束的函数"
@function --transparent(--color <color>, --alpha <number>: 0.5) returns <color> {
  result: oklch(from var(--color) l c h / var(--alpha));
}

.card {
  --primary-color: #3498db;
  background-color: --transparent(var(--primary-color), 0.3);
  /* 或者使用默认值 */
  border-color: --transparent(var(--primary-color)); /* alpha 默认为 0.5 */
}
```

### 2. 复杂数据类型处理

当需要处理包含逗号的值列表时，可以使用花括号包裹：

```css title="处理值列表参数"
@function --max-plus-x(--list <length>#, --x <length>) {
  result: calc(max(var(--list)) + var(--x));
}

.element {
  width: --max-plus-x({10px, 20px, 15px}, 5px); /* 结果为 25px */
}
```

## 条件逻辑：使用 CSS `if()` 函数

CSS 提供了 `if()` 函数来实现条件逻辑，这可以在 `@function` 中用于创建复杂的条件判断。

### `if()` 函数基础语法

```css title="if() 函数基本用法"
@function --responsive-value(--mobile, --desktop) {
  result: if(
    media(width < 768px): var(--mobile);
    else: var(--desktop)
  );
}

.container {
  padding: --responsive-value(1rem, 2rem);
}
```

### 在 `@function` 中使用 `if()` 的完整示例

```css title="使用 if() 的条件函数"
@function --narrow-wide(--narrow, --wide) {
  result: if(
    media(width < 700px): var(--narrow);
    else: var(--wide)
  );
}

body {
  display: grid;
  grid-template-columns: repeat(--narrow-wide(1, 3), 1fr);
  gap: --narrow-wide(0, 20px);
  padding: 0 20px;
}

h2 {
  font-size: --narrow-wide(2.5rem, 2rem);
}
```

### 多重条件判断

```css title="多重条件的 if() 函数"
@function --theme-aware-color(--light, --dark, --dim) {
  result: if(
    style(--scheme: dark): var(--dark);
    style(--scheme: dim): var(--dim);
    else: var(--light)
  );
}

.card {
  background-color: --theme-aware-color(white, #333, #555);
  color: --theme-aware-color(black, white, #ccc);
}
```

## 实际应用场景

### 场景 1：响应式设计助手

```css title="响应式布局函数"
@function --responsive-spacing(--mobile, --tablet, --desktop) {
  result: if(
    media(width < 768px): var(--mobile);
    media(width < 1024px): var(--tablet);
    else: var(--desktop)
  );
}

.section {
  padding: --responsive-spacing(1rem, 2rem, 3rem);
  margin-bottom: --responsive-spacing(2rem, 3rem, 4rem);
}
```

### 场景 2：颜色工具函数

```css title="颜色处理函数"
@function --lighten(--color <color>, --amount <percentage>) {
  result: color-mix(in oklch, var(--color), white var(--amount));
}

@function --darken(--color <color>, --amount <percentage>) {
  result: color-mix(in oklch, var(--color), black var(--amount));
}

.button {
  --main-color: #4a90e2;
  background-color: var(--main-color);
  border-color: --darken(var(--main-color), 20%);

  &:hover {
    background-color: --lighten(var(--main-color), 10%);
  }
}
```

### 场景 3：主题感知函数

```css title="主题感知函数"
@function --light-dark(--light, --dark) {
  result: if(
    style(--scheme: dark): var(--dark);
    else: var(--light)
  );
}

.component {
  background-color: --light-dark(white, #1a1a1a);
  color: --light-dark(black, white);
  border: 1px solid --light-dark(#e0e0e0, #333);
}
```

## 函数组合与嵌套

CSS 函数可以相互调用，创建更复杂的逻辑：

```css title="函数组合示例"
@function --scale-factor(--base) {
  result: calc(var(--base) * 1.2);
}

@function --composed-calculation(--value) {
  --scaled: --scale-factor(var(--value));
  result: calc(var(--scaled) + 10px);
}

.container {
  width: --composed-calculation(100px); /* 结果为 130px */
}
```

## 作用域和变量优先级

理解 CSS 函数中的作用域规则非常重要：

```css title="作用域示例"
@function --scope-demo(--param) {
  --local: 100;
  result: calc(var(--global) + var(--param) + var(--local));
}

.element {
  --global: 50;
  --param: 999; /* 这个不会影响函数参数 */
  value: --scope-demo(25); /* 结果为 175 (50 + 25 + 100) */
}
```

:::warning 作用域规则

* 函数参数 > 元素上的自定义属性
* 函数内部局部变量 > 函数参数
* 同名的变量，后定义的会覆盖先定义的
  :::

## 条件逻辑的完整实现

### 使用 `if()` 实现复杂条件

```css title="复杂条件逻辑"
@function --adaptive-spacing(--dense, --normal, --generous) {
  result: if(
    media(width < 480px) and media(any-pointer: coarse): var(--dense);
    media(width < 768px): var(--normal);
    media(width >= 1200px): var(--generous);
    else: var(--normal)
  );
}

.card {
  padding: --adaptive-spacing(0.5rem, 1rem, 1.5rem);
  margin: --adaptive-spacing(0.25rem, 0.5rem, 1rem);
}
```

### 结合 `calc()` 和 `if()`

```css title="计算与条件结合"
@function --dynamic-width(--base) {
  result: calc(
    var(--base) *
    if(
      media(width < 768px): 0.8;
      media(width < 1024px): 0.9;
      else: 1.0
    )
  );
}

.sidebar {
  width: --dynamic-width(300px);
}
```

## 最佳实践和注意事项

### 1. 命名约定

```css
/* ✅ 推荐：使用描述性名称 */
@function --calculate-responsive-width(--base, --multiplier) { ... }

/* ❌ 避免：名称不明确 */
@function --func1(--a, --b) { ... }
```

### 2. 错误处理策略

```css title="安全的函数设计"
@function --safe-multiply(--value, --multiplier: 1) {
  /* 使用默认值和合理的计算来避免错误 */
  result: calc(var(--value) * var(--multiplier));
}
```

### 3. 性能考虑

```css
/* ✅ 推荐：避免不必要的复杂计算 */
@function --optimized-calculation(--value) {
  /* 简单的计算 */
  result: calc(var(--value) * 2);
}

/* ❌ 避免：过于复杂的嵌套函数 */
@function --overly-complex(--value) {
  /* 多层嵌套和复杂逻辑可能影响性能 */
}
```

## 渐进增强策略

对于不支持 `if()` 函数的浏览器，可以使用以下策略：

```css title="渐进增强示例"
/* 基础样式 - 所有浏览器都支持 */
.card {
  padding: 1rem;
  background-color: white;
}

/* 增强样式 - 仅支持 if() 的浏览器应用 */
@supports (padding: if(media(width < 768px): 0.5rem; else: 1rem)) {
  .card {
    padding: if(
      media(width < 768px): 0.5rem;
      else: 1rem
    );
    background-color: if(
      style(--theme: dark): #333;
      else: white
    );
  }
}
```

## 总结

CSS `@function` 规则结合 `if()` 函数为原生 CSS 带来了强大的编程能力：

### 核心优势

* **代码复用**：避免重复的计算逻辑
* **条件逻辑**：通过 `if()` 函数实现复杂的条件判断
* **类型安全**：通过类型约束减少错误
* **维护性**：集中管理复杂计算逻辑
* **表达力**：创建领域特定的语言

### 关键特性

* **`if()` 函数**：支持 `style()`、`media()` 和 `supports()` 查询
* **类型约束**：可指定参数和返回值的类型
* **默认值**：为参数提供默认值
* **作用域**：清晰的变量优先级规则

### 适用场景

* 复杂的数学计算
* 响应式设计助手
* 颜色处理工具
* 动画配置管理
* 布局计算工具
* 主题切换系统

:::tip 实践建议
虽然 `@function` 和 `if()` 功能强大，但在实际项目中建议：

1. 先从简单的工具函数开始
2. 逐步引入复杂的条件逻辑
3. 始终提供兼容性回退
4. 在团队中建立统一的函数命名和使用规范
5. 使用 `@supports` 进行特性检测
   :::

## 参考

* [MDN @function 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/@function)
* [MDN if() 函数文档](https://developer.mozilla.org/en-US/docs/Web/CSS/if)
* [CSS Functions and Mixins 规范](https://drafts.csswg.org/css-mixins-1/#function-rule)
* [CSS 自定义函数使用指南](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_custom_functions_and_mixins/Using_custom_functions)
