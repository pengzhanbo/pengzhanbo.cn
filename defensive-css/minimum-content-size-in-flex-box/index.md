---
url: /defensive-css/minimum-content-size-in-flex-box/index.md
---
## Minimum Content Size In CSS FlexBox

CSS FlexBox 的 最小内容大小：
如果 flex 项的文本元素或图像大于项本身，则浏览器不会收缩它们。这是 flexbox 的默认行为。

:::demo-wrapper

可以看到内容发生了溢出，即使我们使用 `overflow-wrap: break-word` 来强制换行，也不会起作用。

```css
.card__title {
  overflow-wrap: break-word;
}
```

要改变 FlexBox 的默认行为，我们需要将 FlexBox 的子项 的 `min-width` 设置为 0。

```css
.card__title {
  overflow-wrap: break-word;
  min-width: 0;
}
```

:::demo-wrapper

***

同样的， 在 列方向上，也可以使用 `min-height` 来改变 FlexBox 的默认行为。
