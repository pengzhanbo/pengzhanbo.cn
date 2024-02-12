---
title: Fixed sizes
author: 鹏展博
createTime: 2023/08/07 09:25:43
permalink: /note/defensive-css/fixed-sizes/
---

## Fixed sizes

破坏布局的常见情况之一是， 具有固定宽度或固定高度的容器，填充了长度不一的内容，
当内容过长时，就会发生 内容溢出的情况，导致 布局被破坏。

### 固定高度

一种常见的情况是， 一个卡片容器的高度是固定的，但是 它的内容 却大于 容器的高度，
导致了布局被破坏。

<style scoped>
.card-1 {
  height: 100px;
  width: 250px;
  margin: 0 auto;
  padding: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 5px;
  box-shadow: var(--vp-shadow-2);
}

.card-2 {
  min-height: 100px;
  width: 250px;
  margin: 0 auto ;
  padding: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 5px;
  box-shadow: var(--vp-shadow-2);
}

.card-mask {
  height: 50px;
}
</style>

```css
.card {
  height: 100px;
}
```

:::demo-wrapper
<div class="card-1">
一个卡片容器的高度是固定的，但是 它的内容 却大于 容器的高度， 导致了布局被破坏。
一个卡片容器的高度是固定的，但是 它的内容 却大于 容器的高度， 导致了布局被破坏。
</div>
<div class="card-mask"></div>
:::


为了避免内容从 卡片 中溢出，我们需要使用 `min-height` 而不是 `height` 。

```css
.card {
  min-height: 100px;
}
```

:::demo-wrapper
<div class="card-2">
一个卡片容器的高度是固定的，但是 它的内容 却大于 容器的高度， 导致了布局被破坏。
一个卡片容器的高度是固定的，但是 它的内容 却大于 容器的高度， 导致了布局被破坏。
</div>
:::

这样就可以避免内容从 卡片 中溢出。

### 固定宽度

另一种常见的情况是，一个标签的内容太靠近左右边缘，发生溢出。
这是由于使用了 固定宽度。

```css
.tag {
  width: 100%;
}
```

<style scoped>
.tag {
  display: inline-block;
  width: 100px;
  text-align: center;
  padding: 4px 10px;
  margin-right: 10px;
  color: var(--vp-c-brand-1);
  border: solid 1px var(--vp-c-brand-1);
  border-radius: 5px;
  text-wrap: nowrap;
  background: var(--vp-c-bg);
}
.tag:last-of-type {
  margin-right: 0;
}
.tag-min {
  width: unset;
  min-width: 100px;
}
</style>

:::demo-wrapper
  <div class="tag">标签内容</div>
  <div class="tag">标签内容比较长</div>
:::

要解决这个问题，我们可以使用 `min-width` 替代 `width`

```css
.tag {
  min-width: 100px;
}
```

:::demo-wrapper
  <div class="tag tag-min">标签内容</div>
  <div class="tag tag-min">标签内容比较长</div>
:::
