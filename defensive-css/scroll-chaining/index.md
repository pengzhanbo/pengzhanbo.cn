---
url: /defensive-css/scroll-chaining/index.md
---
## Scroll Chaining

我们可能会经常遇到， 当我们打开一个 modal 框并开始滚动，并滚动到底后继续滚动时，
modal 框的外部容器 `body` 元素还会继续滚动。

这被称之为 **滚动关联(scroll chaining)** 。

:::demo-wrapper no-padding

在过去，我们需要一些技术方案（如，使用JavaScript事件）来解决这个问题。
但是现在，我们可以直接使用 CSS 属性 `overscroll-behavior` 来解决这个问题。

```css
.modal {
  overscroll-behavior-y: contain; /* [!code highlight] */
  overflow-y: auto;
}
```

:::demo-wrapper no-padding
