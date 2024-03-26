---
title: CSS Variable Fallback
author: 鹏展博
createTime: 2023/08/06 16:10:58
permalink: /defensive-css/variable-fallback/
---

## CSS Variable Fallback

CSS 变量越来越多的应用于前端开发中。
但我们可能在使用 CSS 变量的过程中，可能由于某些原因导致 CSS 变量值为空，特别是，如果这个 CSS 变量
的值是通过 JavaScript 控制的。

下面有一个例子：

```css
.message__bubble {
  max-width: calc(100% - var(--actions-width));
}
```

变量 `--actions-width` 在 CSS 函数 `calc()` 中使用， 它的值通过 JavaScript 控制的。
假设 JavaScript 由于某些原因，设置 `--actions-width` 的值失败了。
这会导致 `calc()` 计算的 `max-width` 值为 无效的，这可能导致 意外的布局问题。

我们可以提前避免这种情况，给 `--actions-width` 设置一个 回退值。

```css
.message__bubble {
  max-width: calc(100% - var(--actions-width, 70px));
}
```

如果未定义变量，将使用回退 `70px` 。
可以使用这种方法避免设置变量可能失败（例如：来自 Javascript）。
