---
url: /article/xu1kn104/index.md
---
## 前言

你是否有过这样的需求：想彻底清掉某个元素继承来或者自己设置的样式？想让某个属性回到浏览器默认的样子？
想穿越层层叠叠的 CSS 规则，直接回到浏览器最原始的状态？

你可能会想到使用 `!important` 或者 写一堆覆写规则。

但其实 CSS 早已准备好了三个关键词来帮你做这件事：`initial`、`unset`、`revert`。

## 继承与默认值

`initial`、`unset`、`revert` 三个关键词长得像，作用也像（都是 “重置”） ，但背后的逻辑却是不同的。
在理解这三个值之前，我们需要了解两个基础的概念：**继承** 和 **初始值** 。

### 继承 (Inheritance)

**某些 CSS 属性（比如 `color`, `font-family`）会从父元素自动传递给子元素。**

这就是为什么你给 `body` 设置了颜色，里面的 `p`、`span` 通常也跟着变。

### 初始值 (Initial Value)

**每个 CSS 属性在规范里都定义了一个默认值。**
这个默认值跟你用什么浏览器、什么元素通常没有直接关系（注意，我说的是 **“通常”** ！）。

比如 `display` 的初始值是 `inline`，不管它是用在 `div` 还是 `span` 上，初始值都是 `inline`
（虽然浏览器默认给 `div` 的是 `block`，这稍后解释）。

[CSS Display Module Level 3 - **display initial**](https://www.w3.org/TR/css-display-3/#the-display-properties){.read-more}

### 浏览器的内置样式表

需要注意的是，**规范中定义的默认值，并不一定是在浏览器中的默认值**。

因为在浏览器中，还存在着内置的 **用户代理样式表（User Agent Stylesheet）** （UAS）。UAS 会根据其它的因素，
比如元素的类型等，来决定不同元素下的不同属性的默认值。

因此，虽然 CSS 规范中定义了 `display` 的默认值为 `inline` ， 但是在 `div` 上，它的实际默认值为 `block` 。
又如 `li` 的 `list-style`，作为 `ul` 或 `ol` 的子元素时，它的默认值也不一样。

![uas div](/images/css/uas-div.png)

::: info 在开始前，我们先做一些前置的名词定义

* **作者样式表**：指网站的作者自己写的样式表，这也可能包含了用户使用其它工具修改覆盖的样式。
* **浏览器默认样式**：即 用户代理样式表（User Agent Stylesheet）。
* **规范初始值**：指 CSS 规范中定义的初始值。

:::

## `initial`

`initial` 相当于 ==恢复出厂设置==，其作用是，**将属性的值重置为 CSS 规范中定义的初始值**。

`initial` 完全无视元素的类型、继承性、以及任何之前设置的样式规则（包括 作者样式表 和 浏览器默认样式），
强制将属性设置为它的 **规范初始值**。

举个例子：

```css
div {
  display: block; /* 浏览器默认给div的 */
  color: red;     /* 我们自己设置的 */
  font-weight: bold; /* 我们自己设置的 */
  border: 1px solid blue; /* 我们自己设置的 */
}

.my-reset-div {
  display: initial; /* 规范里 display 的初始值是 'inline'！ */
  color: initial;   /* 规范里 color 的初始值是 'black' */
  font-weight: initial; /* 规范里 font-weight 的初始值是 'normal' */
  border: initial;  /* 规范里 border 的初始值是 'none' (各个分属性初始值的组合) */
}
```

我们来看看它会有什么表现：(背景色加以区分，便于理解)

:::: demo normal expanded

::: code-tabs

@tab CSS

```css
div {
  display: block;
  color: red;
  font-weight: bold;
  border: 1px solid blue;
  background-color: yellow;
}

.my-reset-div {
  display: initial;
  color: initial;
  font-weight: initial;
  border: initial;
}
```

@tab HTML

```html
<div>我是没有 Reset 的 div</div>
<br>
<div class="my-reset-div">我是有 Reset 的 div</div>
```

:::
::::

可以看到，应用了 `.my-reset-div` 后，这个 `div` 变成：

* display: inline (不再是 block)
* color: black (不再是 red)
* font-weight: normal (不再是 bold)
* border: none (蓝边框消失)

`initial` 对 `div` 的 `display` 重置成了 `inline`，而不是我们熟悉的 `block`。

**因为 `initial` 只认规范初始值！**

## `unset`

`unset` 的行为与 属性是否具有 **继承性** 有关：

* **可继承属性 (Inherited Property)**: 行为等同于 `inherit` 。值来自父元素。
* **不可继承属性 (Non-inherited Property)**: 行为等同于 `initial`。值重置为规范定义的初始值。

举个例子:

:::: demo normal expanded

::: code-tabs

@tab CSS

```css
body {
  color: darkblue;
  font-size: 18px;
}
div {
  display: block; /* 浏览器默认 */
  color: red;     /* 覆盖继承 */
  border: 2px dashed green; /* 新增 */
  padding: 20px; /* 新增 */
}
.unset-example {
  color: unset;      /* color可继承 -> 行为像 inherit, 变成 body 的 darkblue */
  border: unset;     /* border不可继承 -> 行为像 initial, 变成规范初始值 'none' */
  padding: unset;    /* padding不可继承 -> 行为像 initial, 变成规范初始值 0 */
  display: unset;    /* display不可继承 -> 行为像 initial, 变成规范初始值 'inline' */
  font-size: unset;  /* font-size可继承 -> 行为像 inherit, 变成 body 的 18px */
}
```

@tab HTML

```html
<div class="unset-example">这个div的样式被unset了！</div>
```

:::

::::

对元素应用 `.unset-example` 后，这个 `div` 变成:

* color: darkblue (继承自 body，因为 color 可继承)
* border: none (不可继承，回到初始值)
* padding: 0 (不可继承，回到初始值)
* display: inline (不可继承，回到初始值 `inline` - 不再是 `block`！)
* font-size: 18px (继承自 body，因为可继承)

**注意 `display` 又变成了 `inline`！`unset` 对不可继承属性也是回到规范初始值。**

## `revert`

`revert` 让属性 **回到浏览器默认的样式**。

它是层级最高的重置：

1. 首先： 移除所有作者样式表对该属性设置的影响。
2. 然后： 看浏览器默认样式表 (User Agent Stylesheet) 对这个特定元素有没有定义该属性的值。如果有，就用这个值。
3. 最后： 如果浏览器默认样式表也没定义，那就回退到该属性的规范初始值 (Initial Value)。

**这是唯一一个会回到浏览器默认样式表的值！**

举个例子：

:::: demo normal expanded
::: code-tabs

@tab CSS

```css
button {
  all: unset; /* 先粗暴地清掉浏览器默认button样式 */
  background: lightgray;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
}
.native-button {
  all: revert; /* 魔法！让这个按钮变回浏览器默认样式 */
}
```

@tab HTML

```html
<button>被自定义样式的按钮</button>

<button class="native-button">被 revert 还原的按钮</button>
```

:::
::::

在这个例子中：

* 第一个按钮被我们的自定义 CSS 改造成了灰色无边框圆角按钮。
* 第二个按钮应用了 `.native-button { all: revert; }`。`all: revert` 表示将这个元素所有 CSS 属性都重置到浏览器默认或规范初始值。
  * revert 会移除我们写的 `background`, `border`, `padding`, `border-radius`, `cursor` 等所有自定义样式。
  * 然后，它发现 `button` 在浏览器默认样式表里是有特定样式的（比如背景渐变、边框、字体、内边距、鼠标手型等），于是恢复这些浏览器默认样式。
  * 最终效果：第二个按钮又变回了你操作系统/浏览器原生的那个按钮样子！

**这才是我们通常理解的 “重置到默认” 。**

revert 让 div 的 `display` 变回 `block`，让 `li` 重新出现项目符号，让 `button` 变回原生按钮。

***

好的，这篇博客就来聊聊 CSS 里那几个看起来有点像、但用起来大不同的“魔法值”：`initial`、`unset` 和 `revert`。它们都是用来“重置”样式的，但重置的目标和范围可大不一样。搞懂它们，能让你在控制样式继承和重置时事半功倍！

## 比较

| 值            | 主要目标                        | 是否尊重继承性？           | 是否尊重浏览器默认样式？ | 典型用例                                       |
| :------------ | :------------------------------ | :------------------------- | :----------------------- | :--------------------------------------------- |
| **`initial`** | **规范初始值**                  | ❌ 强制设为初始值，无视继承 | ❌ 无视浏览器默认样式     | 需要彻底、绝对地重置到最原始状态               |
| **`unset`**   | **依赖继承性**                  | ✅ 根据属性是否可继承决定   | ❌ 无视浏览器默认样式     | 智能地撤销设置，让属性自然继承或回初始值       |
| **`revert`**  | **浏览器默认值 (或规范初始值)** | ✅ 最终效果由浏览器默认决定 | ✅ 首先尊重浏览器默认样式 | 真正地“重置到浏览器默认外观”，移除作者样式影响 |

## 使用建议

* 如果需要重置回浏览器默认样式，应该使用 `revert`。
  （特别是配合 `all: revert` 一起使用，可以直接将元素重置回浏览器默认样式）
  这是最符合直觉的重置到“默认” 。
* 如果需要撤销样式，让属性跟随其父元素（如果可继承），或回到初始值（如果不可继承），应该使用 `unset`。
* 如果需要彻底重置，让属性回到最原始状态（通常比较激进），应该使用 `initial`

::: tip `all` 属性
`all: initial` / `all: unset` / `all: revert` 可以一次性重置元素的所有（或几乎所有）CSS 属性到对应的状态，非常强力。常用于创建样式隔离区域或深度重置。
:::
