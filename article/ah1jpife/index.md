---
url: /article/ah1jpife/index.md
---
:::info 作者前言
今天我们来聊聊 CSS 中的一个"革命性"特性——`@layer` 规则。如果你曾经被样式冲突折磨得死去活来，或者为了覆盖第三方框架的样式而不得不使用 `!important`，那么这篇文章就是为你准备的！
:::

## 什么是 CSS @layer？

简单来说，`@layer` 就像是给你的 CSS 样式**建立了一个分层系统**。想象一下，你的样式表就像是一个多层蛋糕：

* 最底层：重置样式（reset）
* 中间层：基础样式（base）
* 上层：组件样式（components）
* 最上层：工具类样式（utilities）

`@layer` 让你能够明确定义这些层的**优先级顺序**，从而彻底告别"样式战争"！

## 为什么需要 @layer？

在传统的 CSS 中，我们经常会遇到这样的困境：

```css title="传统CSS的痛点"
/* 第三方框架的样式 */
.framework-button {
  background: blue !important; /* 不得不加 !important */
}

/* 我们自己的样式 */
.my-button {
  background: red; /* 这个样式被覆盖了！ */
}
```

\==有了 @layer，一切都变得简单了！=={.success}

## 基础语法：从零开始

### 1. 创建命名层

```css title="基础层定义"
@layer reset {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

@layer base {
  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
  }
}

@layer components {
  .button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
}
```

### 2. 定义层顺序

```css title="明确定义层优先级"
/* 定义层的优先级：从左到右，优先级递增 */
@layer reset, base, components, utilities;
```

:::tip
**重要提示**：层声明的顺序决定了优先级！先声明的层优先级低，后声明的层优先级高。
:::

## 实战演示：看 @layer 如何工作

:::: demo normal title="层优先级演示" desc="展示不同层之间的样式覆盖关系"
::: code-tabs
@tab HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <button class="btn-primary">点击我</button>
  </div>
</body>
</html>
```

@tab CSS

```css
/* 定义层顺序 */
@layer reset, base, components;

/* 重置层 */
@layer reset {
  button {
    margin: 0;
    padding: 8px 16px;
    background: gray;
  }
}

/* 基础层 */
@layer base {
  .btn-primary {
    background: blue;
    color: white;
  }
}

/* 组件层 - 这个会覆盖前面的样式 */
@layer components {
  .btn-primary {
    background: #007bff;
    padding: 12px 24px;
    border-radius: 6px;
  }
}
```

@tab 效果说明

```markdown
最终按钮会显示：
- 背景色：#007bff（来自components层）
- 内边距：12px 24px（来自components层）
- 圆角：6px（来自components层）

即使reset层和base层有相同的选择器，components层的样式仍然会生效！
```

:::
::::

## 匿名层 vs 命名层

### 匿名层

```css title="匿名层示例"
@layer {
  /* 这是一个匿名层 */
  body {
    background: #f5f5f5;
  }
}

@layer {
  /* 这是另一个匿名层 */
  body {
    background: white; /* 这个会生效！ */
  }
}
```

### 命名层

```css title="命名层示例"
@layer theme {
  .dark-mode {
    background: #1a1a1a;
    color: white;
  }
}

/* 稍后可以继续往这个层添加样式 */
@layer theme {
  .dark-mode .button {
    background: #333;
  }
}
```

:::warning
**注意**：匿名层不能被重复使用或引用，所以对于大型项目，建议使用命名层。
:::

## 高级用法：与 @import 结合

```css title="导入外部样式到指定层"
/* 将第三方框架导入到低优先级层 */
@import url('bootstrap.css') layer(framework);

/* 我们的自定义样式在高优先级层 */
@layer custom {
  .btn {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  }
}
```

:::steps

* **第一步**：导入第三方框架到 `framework` 层
* **第二步**：在 `custom` 层定义我们的样式
* **第三步**：`custom` 层的样式会自动覆盖 `framework` 层的样式

:::

## 处理 !important 的特殊情况

这里有个有趣的现象：

```css title="!important 在层中的行为"
@layer low-priority {
  button {
    color: blue !important;
  }
}

@layer high-priority {
  button {
    color: red; /* 这个不会生效！ */
  }
}
```

:::caution
**重要提醒**：在层中，`!important` 的行为有些特殊。低优先级层中的 `!important` 可以覆盖高优先级层的普通样式！
:::

## 实际项目中的层结构建议

:::file-tree

* styles
  * reset.css
  * base.css
  * components
    * button.css
    * card.css
    * form.css
  * utilities.css
* main.css

:::

```css title="项目层结构示例"
/* main.css */
@layer reset, base, components, utilities;

/* 重置样式 */
@layer reset {
  @import url('./styles/reset.css');
}

/* 基础样式 */
@layer base {
  @import url('./styles/base.css');
}

/* 组件样式 */
@layer components {
  @import url('./styles/components/button.css');
  @import url('./styles/components/card.css');
  @import url('./styles/components/form.css');
}

/* 工具类 */
@layer utilities {
  @import url('./styles/utilities.css');
}
```

## 浏览器支持和兼容性

@[caniuse](mdn-css_at-rules_layer)

## 最佳实践总结

1. **规划层结构**：在项目开始时就设计好层的组织结构
2. **统一命名**：使用有意义的层名称（reset、base、components、utilities）
3. **避免滥用 !important**：让层来处理优先级问题
4. **利用 DevTools**：现代浏览器开发者工具都支持层调试

## 常见问题解答

:::code-tabs
@tab Q: @layer 会影响选择器特异性吗？

```markdown
A: 不会！@layer 只影响层的优先级，选择器的特异性规则仍然适用。
在同一个层内，高特异性的选择器仍然会覆盖低特异性的选择器。
```

@tab Q: 可以动态改变层顺序吗？

```markdown
A: 不可以。层顺序在首次声明时就确定了，后续无法改变。
所以一定要在样式表开头就定义好层顺序！
```

@tab Q: 未分层的样式会怎样？

```markdown
A: 所有未分层的样式会被收集到一个"匿名层"中，
这个匿名层的优先级高于所有已命名的层！
```

:::

## 结语

CSS `@layer` 规则是近年来 CSS 生态中最实用的特性之一。它让我们能够：

* 🎯 **精确控制样式优先级**
* 🛡️ **避免特异性战争**
* 📚 **更好地组织大型项目**
* 🔧 **轻松集成第三方库**

现在就开始在你的项目中使用 `@layer` 吧！你会发现，管理 CSS 从未如此简单和愉快。

## 参考

* [MDN 的 @layer 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
* [CSS Cascade Layers 规范](https://www.w3.org/TR/css-cascade-5/)
