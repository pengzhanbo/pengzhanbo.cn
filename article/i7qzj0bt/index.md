---
url: /article/i7qzj0bt/index.md
---
> 让网页元素自动编号，告别手动维护的烦恼！

你是否曾经遇到过这样的场景：需要为页面上的多个元素添加连续的编号，比如商品列表、步骤说明、或者法律条款？传统做法可能是手动输入数字，但这样既繁琐又容易出错。今天，就让我们一起来探索 CSS 计数器的神奇世界！

## 什么是 CSS 计数器？

CSS 计数器本质上是一种 **由 CSS 维护的变量**，它可以自动递增，让我们能够实现各种复杂的编号效果。想象一下，你有一个魔法笔记本，每当你写下新的条目时，页码会自动更新——CSS 计数器就是这样的存在。

## 基础用法：从零开始

让我们通过一个简单的例子来理解计数器的工作原理：

:::: demo normal expanded
::: code-tabs

@tab HTML

```html
<div class="container">
  <p>CSS 入门</p>
  <p>选择器详解</p>
  <p>布局技巧</p>
</div>
```

@tab:active CSS

```css
.container {
  counter-reset: chapter;  /* 初始化计数器 */
}

.container p::before {
  counter-increment: chapter;  /* 递增计数器 */
  content: "第" counter(chapter) "章：";  /* 显示计数器值 */
}
```

:::
::::

### 核心概念解析

让我们拆解一下这个例子中的三个关键属性：

#### 1. `counter-reset` - 计数器初始化

```css
counter-reset: chapter;
```

这行代码创建了一个名为 `chapter` 的计数器，并将其初始值设为 0。你可以把它想象成给计数器"上发条"。

:::info
`counter-reset` 的默认初始值是 0，你也可以显式指定：

```css
counter-reset: chapter 5; /* 从第5章开始 */
```

:::

#### 2. `counter-increment` - 计数器递增

```css
counter-increment: chapter;
```

每次遇到 `h3` 元素时，`chapter` 计数器的值就会增加 1。这是计数器的"心跳"。

#### 3. `counter()` / `counters()` - 显示计数器值

```css
content: "第" counter(chapter) "章：";
```

`counter()` 函数用于在 `content` 属性中显示当前的计数器值。

## 进阶技巧：多级嵌套计数器

现实中的文档往往需要多级编号，比如：

```
1. 前端技术
  1.1 HTML
  1.2 CSS
    1.2.1 选择器
    1.2.2 布局
  1.3 JavaScript
2. 后端技术
```

使用嵌套计数器可以轻松实现：

:::: demo normal expanded title="多级嵌套示例"

::: code-tabs

@tab HTML

```html
<div class="outline">
  <div class="section">
    <h4>前端技术</h4>
    <div class="subsection">
      <h5>HTML</h5>
    </div>
    <div class="subsection">
      <h5>CSS</h5>
      <div class="subsubsection">
        <h6>选择器</h6>
      </div>
      <div class="subsubsection">
        <h6>布局</h6>
      </div>
    </div>
    <div class="subsection">
      <h5>JavaScript</h5>
    </div>
  </div>
  <div class="section">
    <h4>后端技术</h4>
  </div>
</div>
```

@tab:active CSS

```css
.outline {
  counter-reset: section;
}

.section,.subsection, .subsubsection {
  padding-left: 1em;
}

.section h4::before {
  counter-increment: section;
  content: counter(section) ". ";
  counter-reset: subsection; /* 重置下级计数器 */
}

.subsection h5::before {
  counter-increment: subsection;
  content: counter(section) "." counter(subsection) " ";
  counter-reset: subsubsection;
}

.subsubsection h6::before {
  counter-increment: subsubsection;
  content: counter(section) "." counter(subsection) "." counter(subsubsection) " ";
}
```

:::
::::

:::warning 注意层次关系
嵌套计数器的关键在于：**在父级元素中重置子级计数器**。这样每当开始新的父级章节时，子级编号都会重新开始。
:::

## 实用场景示例

### 1. 步骤说明列表

```css title="步骤计数器"
.steps {
  counter-reset: step;
  list-style: none;
  padding: 0;
}

.steps li::before {
  counter-increment: step;
  content: "步骤" counter(step) ": ";
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
```

### 2. 自定义列表样式

```css title="个性化列表编号"
.custom-list {
  counter-reset: custom;
}

.custom-list li {
  margin-bottom: 10px;
}

.custom-list li::before {
  counter-increment: custom;
  content: "[" counter(custom, lower-roman) "] ";
  font-weight: bold;
  color: #ff6b6b;
}
```

:::tip 数字格式选项
`counter()` 函数的第二个参数可以指定数字格式：

* `decimal` - 十进制数字（默认）
* `lower-roman` - 小写罗马数字
* `upper-roman` - 大写罗马数字
* `lower-alpha` - 小写字母
* `upper-alpha` - 大写字母
* 等等...
  :::

## 常见问题与解决方案

### 问题1：计数器不工作？

:::steps

* **检查计数器作用域**：确保 `counter-reset` 在正确的父元素上声明
* **验证选择器**：确认 `counter-increment` 和 `content` 的选择器能够匹配到目标元素
* **查看继承关系**：计数器值不会自动继承，需要在每个层级单独管理

:::

### 问题2：编号顺序错误？

\==记住这个顺序很重要=={.important}：**重置 → 递增 → 显示**。确保你的 CSS 规则按这个逻辑顺序应用。

## 浏览器兼容性

好消息！CSS 计数器在现代浏览器中得到了很好的支持：

@[caniuse](css-counters)

:::info
即使在不支持计数器的老旧浏览器中，你的内容仍然可以正常显示，只是缺少了自动编号——这就是渐进增强的魅力！
:::

## 总结

CSS 计数器是一个强大而实用的工具，它让我们能够：

* ✅ **自动管理编号**，减少手动维护
* ✅ **实现复杂嵌套**，支持多级目录结构
* ✅ **自定义显示格式**，满足不同设计需求
* ✅ **保持语义化**，不污染 HTML 结构

下次当你需要为元素添加序号时，不妨试试 CSS 计数器。它可能不会让你的网站变得"高大上"，但绝对能让你的开发工作变得更加优雅和高效！

## 延伸学习

想要深入了解？推荐阅读：

* [MDN Web Docs: Using CSS Counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Counter_Styles/Using_CSS_counters)
* [CSS Tricks: Automatic Numbering with CSS Counters](https://css-tricks.com/numbering-in-style/)

希望这篇文章能帮助你掌握 CSS 计数器的使用技巧！如果有任何问题，欢迎在评论区讨论～
