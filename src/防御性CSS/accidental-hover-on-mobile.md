---
title: Accidental Hover On Mobile
createTime: 2023/08/10 14:18:47
permalink: /defensive-css/accidental-hover-on-mobile/
---

## Accidental Hover On Mobile

在应用中，我们会使用 `hover` 效果向用户提供 元素可点击或者出于活动状态的提示。
这在具有鼠标或触控面板的设备来说表现良好，但是这在移动端的设备上， `hover` 效果可能会令人困惑。

```css
.card:hover {
  background: blue;
}
```

<style>
.card-hover-123,
.card-hover-media-123 {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  box-shadow: var(--vp-shadow-2);
  background: var(--vp-c-bg);
  transition: background 0.3s;
}
.card-hover-123:hover {
  background: var(--vp-c-brand-1);
}
@media (hover:hover) {
  .card-hover-media-123:hover {
    background: var(--vp-c-brand-1);
  }
}
</style>

在页面中滚动时，手指可能会意外地轻点半下，这将触发特定元素的 `hover` 状态。

:::demo-wrapper
如果是桌面端浏览器，请打开 控制台，切换为 移动设备。在下面元素上点击，会看到 `hover` 效果。

<div class="card-hover-123"></div>
:::

这种意外的触发了 `hover` 状态，可能不是用户想看到的，毕竟在 移动设备上，并不需要 `hover` 。

对此，我们可以通过 `hover` 媒体查询，来解决这个问题。
检测到用户当前的设备是否可以将 鼠标指针 悬停在 元素上。

```css
@media (hover: hover) {
  .card:hover {
    /* Add hover styles.. */
  }
}
```

:::demo-wrapper
如果是桌面端浏览器，请打开 控制台，切换为 移动设备。在下面元素上点击。

<div class="card-hover-media-123"></div>
:::

可以看到，在 桌面端浏览器中，`hover` 效果被激活，在移动端浏览器中，不触发 `hover` 效果。
