---
url: /defensive-css/fixed-sizes/index.md
---
## Fixed sizes

破坏布局的常见情况之一是， 具有固定宽度或固定高度的容器，填充了长度不一的内容，
当内容过长时，就会发生 内容溢出的情况，导致 布局被破坏。

### 固定高度

一种常见的情况是， 一个卡片容器的高度是固定的，但是 它的内容 却大于 容器的高度，
导致了布局被破坏。

```css
.card {
  height: 100px;
}
```

:::demo-wrapper

为了避免内容从 卡片 中溢出，我们需要使用 `min-height` 而不是 `height` 。

```css
.card {
  min-height: 100px;
}
```

:::demo-wrapper

这样就可以避免内容从 卡片 中溢出。

### 固定宽度

另一种常见的情况是，一个标签的内容太靠近左右边缘，发生溢出。
这是由于使用了 固定宽度。

```css
.tag {
  width: 100%;
}
```

:::demo-wrapper

要解决这个问题，我们可以使用 `min-width` 替代 `width`

```css
.tag {
  min-width: 100px;
}
```

:::demo-wrapper
