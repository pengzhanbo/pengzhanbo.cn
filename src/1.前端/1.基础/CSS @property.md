---
title: 玩转 CSS @property
author: pengzhanbo
createTime: 2023/11/17 02:20:24
tags: 
  - css
permalink: /article/z7btimbk/
---

`@property` CSS at-rule是 [CSS Houdini API](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Houdini)
的一部分，它允许开发者显式地定义他们的 [CSS 自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*),
允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。

`@property` 的出现，极大的增强了 CSS 的能力。

<!-- more -->

::: info CSS Houdini
`CSS Houdini` 开放 CSS 的底层 API 给开发者，使得开发者可以通过这套接口自行扩展 CSS，并提供相应的工具允许开发者介入浏览器渲染引擎的样式和布局流程中，使开发人员可以编写浏览器可以解析的 CSS 代码，从而创建新的 CSS 功能。
:::

---

通常情况下，我们定义和使用一个 CSS 自定义属性是这样的：

```css
:root {
    --c-red: #fff;
}

p {
    color: (--c-red);
}
```

而有了 `@property` 规则，我们可以这样做：

```css
@property --c-red {
  syntax: '<color>';
  inherits: false;
  initial-value: #f00;
}

p {
  color: var(--c-white);
}
```

效果：
<style>
  @property --p-red {
  syntax: '<color>';
  inherits: false;
  initial-value: #f00;
}
</style>
::: normal-demo 代码演示

```html
<p class="css-vars">这是使用 css vars 定义的文字颜色</p>
<p class="css-property">这是使用 css @property 定义的文字颜色</p>
```

```css
.css-vars {
  --c-red: #f00;
  color: var(--c-red);
}
@property --p-red {
  syntax: '<color>';
  inherits: false;
  initial-value: #f00;
}
.css-property {
  color: var(--p-red);
}
```

:::

## @property

`@property` 规则提供了一个直接在样式表中注册自定义属性的方式，而无需运行任何 JS 代码。
有效的 `@property` 规则会注册一个自定义属性，就像 `CSS.registerProperty` 函数被使用同样的参数调用了一样。

### 语法

```css
@property <custom-property-name> {
  syntax: <string>;
  inherits: <boolean>;
  initial-value: <declaration-value>;
}
```

- `<custom-property-name>`: 自定义属性名，定义后可在 CSS 中通过 `var(<custom-property-name>)` 进行引用。
- syntax：该自定义属性的语法规则，也可以理解为表示定义的自定义属性的类型。
- inherits：该自定义属性是否可以被继承。
- initial-value：该自定义属性的初始值。

一个有效的 `@property` 规则代表一项自定义属性的注册，使用自定义属性名作为规则内代码序列的序部。

`@property` 规则中 `syntax` 和 `inherits` 描述符是必需的;
如果其中任何一项缺失，整条规则都将失效并且会被忽略。
`initial-value` 描述符仅在 `syntax` 描述符为通用 `syntax` 定义时是可选的，
否则 `initial-value` 也是必需的——如果此时该描述符缺失，整条规则都将失效且被忽略。

未知的描述符自身都是无效的，且会被忽略。但是不会造成整条 `@property` 规则的失效。

### syntax语法类型

- `<length>` : 任何有效的 length 值， 如 `12px`， `12rem` 等。
- `<number>` : 任何有效的 number 值， 如 `12`， `12.5`, `-12` 等。
- `<percentage>` : 任何有效的 percentage 值， 如 `12%` 等。
- `<length-percentage>` : 任何有效的 length-percentage 值， 如 `12px` 或 `12%` 等。
- `<color>` : 任何有效的 color 值， 如 `#fff` 或 `rgb(255, 255, 255)` 等。
- `<image>` : 任何有效的 image 值, 如 `url('foo.png')`，或 `linear-gradient(red, blue)` 等。
- `<url>` : 任何有效的 url 值， 如 `url('foo.png')` 等。
- `<integer>` : 任何有效的 integer 值， 如 `12` 等。
- `<angle>` : 任何有效的 angle 值， 如 `12deg` 等。
- `<time>` : 任何有效的 time 值， 如 `12s` 等。
- `<resolution>` : 任何有效的 resolution 值， 如 `12dpi` 等。
- `<transform-function>` : 任何有效的 transform-function 值， 如 `rotate(12deg)` 等。
- `<custom-ident>` : 任何有效的 custom-ident 值， 如 `foo` 等。

### syntax语法符号

`syntax` 支持 `+`、`#`、`|` 符号， 用于接收特殊的类型定义。

- `syntax: '<color#>'` : 接受逗号分隔的颜色值列表
- `syntax: '<length+>'` ：接受以空格分隔的长度值列表
- `syntax: '<length | length+>'`：接受单个长度或者以空格分隔的长度值列表

## 示例

在了解完 `@property` 规则之后，我们来看一些例子。

### 渐变过渡效果

通常我们实现一个渐变图案的代码如下：

::: normal-demo 渐变图案

```html
<div class="gradient"></div>
```

```css
.gradient {
  width: 150px;
  height: 150px;
  margin: auto;
  background: linear-gradient(45deg, #f66, #ff0);
}
```

:::

我们改造一下代码，使用 自定义属性实现，并尝试通过修改自定义属性，实现渐变过渡效果：

::: normal-demo 自定义属性

```html
<div class="gradient"></div>
<p>鼠标悬停到方块中查看效果</p>
```

```css
.gradient {
  --color-1: #f66;
  --color-2: #ff0;
  width: 150px;
  height: 150px;
  margin: auto;
  background: linear-gradient(45deg, var(--color-1), var(--color-2));
  transition: background 1s;
}
.gradient:hover {
  --color-1: #fcc;
  --color-2: #606;
}
```

:::

可以看到，虽然我们使用 `transition` 添加了 过渡动画，在 `hover` 时修改了 自定义属性。
当我们把鼠标移动到 `.gradient` 上时，并没有渐变过渡动画效果，我们只是得到了 两侦之间的变化。

**使用 @property 进行改造****

现在，我们把使用 `@property` 替换 CSS 自定义属性：

```css
@property --houdini-color-1 {
  syntax: '<color>';
  inherits: false;
  initial-value: #f66;
}

@property --houdini-color-2 {
  syntax: '<color>';
  inherits: false;
  initial-value: #ff0;
}
```

使用了 @property 语法，定义了两个 CSS Houdini 自定义变量 `--houdini-color-1` 和 `--houdini-color-2`，在 hover 变化的时候，改变这两个颜色。

同时， 修改 `transition` 语句，**不再是对`background` 进行过渡，而是对`--houdini-color-1` 和 `--houdini-color-2` 进行过渡**。

<style>
@property --houdini-color-1 {
  syntax: '<color>';
  inherits: false;
  initial-value: #f66;
}

@property --houdini-color-2 {
  syntax: '<color>';
  inherits: false;
  initial-value: #ff0;
}
</style>

::: normal-demo 自定义属性

```html
<div class="gradient"></div>
<p>鼠标悬停到方块中查看效果</p>
```

```css
@property --houdini-color-1 {
  syntax: '<color>';
  inherits: false;
  initial-value: #f66;
}

@property --houdini-color-2 {
  syntax: '<color>';
  inherits: false;
  initial-value: #ff0;
}

.gradient {
  width: 150px;
  height: 150px;
  margin: auto;
  background: linear-gradient(45deg, var(--houdini-color-1), var(--houdini-color-2));
  transition: --houdini-color-1 1s, --houdini-color-2 1s;
}
.gradient:hover {
  --houdini-color-1: #fcc;
  --houdini-color-2: #606;
}
```

:::

可以看到， 渐变过渡动画效果成功了！

由此，我们可以实现更加复杂的渐变过渡效果：

<style>
@property --an-color-1 {
  syntax: '<color>';
  inherits: false;
  initial-value: fuchsia;
}
@property --an-color-2 {
  syntax: '<color>';
  inherits: false;
  initial-value: #f79188;
}
@property --an-color-3 {
  syntax: '<color>';
  inherits: false;
  initial-value: red;
}
</style>
::: normal-demo 渐变过渡动画

```html
<div class="bg-animate"></div>
```

```css
@property --an-color-1 {
  syntax: '<color>';
  inherits: false;
  initial-value: fuchsia;
}
@property --an-color-2 {
  syntax: '<color>';
  inherits: false;
  initial-value: #f79188;
}
@property --an-color-3 {
  syntax: '<color>';
  inherits: false;
  initial-value: red;
}

.bg-animate {
  width: 150px;
  height: 150px;
  margin: auto;
  background: linear-gradient(45deg,
    var(--an-color-1),
    var(--an-color-2),
    var(--an-color-3));
  animation: change 10s infinite linear;
}
@keyframes change {
  20% {
    --an-color-1: red;
    --an-color-2: #a93ee0;
    --an-color-3: fuchsia;
  }
  40% {
    --an-color-1: #ff3c41;
    --an-color-2: #e228a0;
    --an-color-3: #2e4c96;
  }
  60% {
    --an-color-1: orange;
    --an-color-2: green;
    --an-color-3: teal;
  }
  80% {
    --an-color-1: #ae63e4;
    --an-color-2: #0ebeff;
    --an-color-3: #efc371;
  }
}
```

:::

### 复杂背景动画

我们通过代码实现一个复杂的 渐变图案背景：

::: normal-demo 复杂背景

```html
<div class="bg"></div>
```

```css
.bg {
  width: 100%;
  height: 350px;
  background-image:
    radial-gradient(
      circle at 86% 7%,
      rgba(40, 40, 40, 0.04) 0%,
      rgba(40, 40, 40, 0.04) 50%,
      rgba(200, 200, 200, 0.04) 50%,
      rgba(200, 200, 200, 0.04) 100%
    ),
    radial-gradient(
      circle at 15% 16%,
      rgba(99, 99, 99, 0.04) 0%,
      rgba(99, 99, 99, 0.04) 50%,
      rgba(45, 45, 45, 0.04) 50%,
      rgba(45, 45, 45, 0.04) 100%
    ),
    radial-gradient(
      circle at 75% 99%,
      rgba(243, 243, 243, 0.04) 0%,
      rgba(243, 243, 243, 0.04) 50%,
      rgba(37, 37, 37, 0.04) 50%,
      rgba(37, 37, 37, 0.04) 100%
    ),
    linear-gradient(#6cc, #09c);
}
```

:::

如果我们想让它动起来，如果不是用 `@property`，可能要废一番功夫，但是，在 `@property` 的支持下，
我们可以实现不错的动画效果：

<style>
@property --per-1 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 75%;
}

@property --per-2 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 99%;
}

@property --per-3 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 15%;
}

@property --per-4 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 16%;
}

@property --per-5 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 86%;
}

@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
</style>

::: normal-demo 复杂背景动画

```html
<div class="bg"></div>
```

```css
@property --per-1 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 75%;
}

@property --per-2 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 99%;
}

@property --per-3 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 15%;
}

@property --per-4 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 16%;
}

@property --per-5 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 86%;
}

@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.bg {
  width: 100%;
  height: 350px;
  background-image:
    radial-gradient(
      circle at var(--per-5) 7%,
      rgba(40, 40, 40, 0.04) 0%,
      rgba(40, 40, 40, 0.04) 50%,
      rgba(200, 200, 200, 0.04) 50%,
      rgba(200, 200, 200, 0.04) 100%
    ),
    radial-gradient(
      circle at var(--per-3) var(--per-4),
      rgba(99, 99, 99, 0.04) 0%,
      rgba(99, 99, 99, 0.04) 50%,
      rgba(45, 45, 45, 0.04) 50%,
      rgba(45, 45, 45, 0.04) 100%
    ),
    radial-gradient(
      circle at var(--per-1) var(--per-2),
      rgba(243, 243, 243, 0.04) 0%,
      rgba(243, 243, 243, 0.04) 50%,
      rgba(37, 37, 37, 0.04) 50%,
      rgba(37, 37, 37, 0.04) 100%
    ),
    linear-gradient(#6cc, #09c);
    animation: move 30s infinite alternate linear;
}
@keyframes move {
  100% {
    --per-1: 85%;
    --per-2: 49%;
    --per-3: 45%;
    --per-4: 39%;
    --per-5: 70%;
    --angle: 360deg;
  }
}
```

:::

## 参考

- [MDN CSS Properties and Values API](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Properties_and_Values_API)
- [CSS Houdini API css-properties-values-api](https://drafts.css-houdini.org/css-properties-values-api/#syntax-strings)
