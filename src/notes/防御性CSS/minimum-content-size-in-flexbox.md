---
title: Minimum Content Size In CSS FlexBox
author: 鹏展博
createTime: 2023/08/06 23:20:23
permalink: /defensive-css/minimum-content-size-in-flex-box/
---

## Minimum Content Size In CSS FlexBox

CSS FlexBox 的 最小内容大小：
如果 flex 项的文本元素或图像大于项本身，则浏览器不会收缩它们。这是 flexbox 的默认行为。

<style>
.card-120 {
  display: flex;
  align-items: center;
  width: 250px;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: solid 1px var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-2);
}
.card-120__thumb {
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 50%;
  background-color: var(--vp-c-gray-soft);
  margin-right: 20px;
}
.break-word-120 {
  overflow-wrap: break-word;
}
.min-width-120 {
  min-width: 0;
}
</style>

:::demo-wrapper

<div class="card-120">
  <div class="card-120__thumb"></div>
  <p>I am a card</p>
</div>
<div class="card-120" style="margin-top:20px;">
  <div class="card-120__thumb"></div>
  <p>cardcardcardcardcardcard</p>
</div>
:::

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

<div class="card-120">
  <div class="card-120__thumb"></div>
  <p class="break-word-120 min-width-120">cardcardcardcardcardcard</p>
</div>
:::

---

同样的， 在 列方向上，也可以使用 `min-height` 来改变 FlexBox 的默认行为。
