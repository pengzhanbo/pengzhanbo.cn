---
title: Vertical Media Queries
createTime: 2023/08/10 10:23:42
permalink: /defensive-css/vertical-media-queries/
---

## Vertical Media Queries

有时候，构建一个组件，并且通过调整浏览器的宽度的大小进行测试，是非常有用的。
但可能会经常的忽略针对 高度 进行测试。

一种常见的场景是，在一个 main 和 aside 布局的场景中，一些 辅助的导航链接位于 aside 的底部位置。

请看以下示例，辅助导航链接 通过 `position:sticky` 粘在 aside 的底部。在高度足够的情况下，看起来
还不错。

<style>
.flex-box-140 {
  display: flex;
  width: 100%;
}
.flex-box-140 aside {
  position: relative;
  width: 130px;
  height: 400px;
  margin-right: 20px;
  background: var(--vp-c-bg);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.flex-box-140 main {
  flex: 1;
  height: 400px;
  background: var(--vp-c-gray-3);
  border-radius: 5px;
  padding: 10px;
}
.flex-box-140.min main,
.flex-box-140.min aside {
  height: 250px;
}
.flex-box-140 .user-list > div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.flex-box-140 .user-list > div > span {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  background: var(--vp-c-gray-1);
}
.flex-box-140 .user-list > div > p {
  margin: 0;
  height: 16px;
  flex: 1;
  border-radius: 3px;
  background: var(--vp-c-gray-3);
}
.flex-box-140 .aside-nav {
  position: absolute;
  bottom: 10px;
}
.flex-box-140 .aside-nav div {
  font-size: 14px;
  font-weight: 500;
}
</style>

:::demo-wrapper

<div class="flex-box-140">
  <aside>
    <div class="user-list">
      <div><span></span><p></p></div>
      <div><span></span><p></p></div>
      <div><span></span><p></p></div>
      <div><span></span><p></p></div>
    </div>
    <div class="aside-nav">
      <div>Home</div>
      <div>Article</div>
      <div>About</div>
      <div>Contact</div>
    </div>
  </aside>
  <main></main>
</div>
:::

但是，如果浏览器窗口的高度较小，辅助导航链接会被挤压，与其他内容发生重叠。

:::demo-wrapper

<div class="flex-box-140 min">
  <aside>
    <div class="user-list">
      <div><span></span><p></p></div>
      <div><span></span><p></p></div>
      <div><span></span><p></p></div>
      <div><span></span><p></p></div>
    </div>
    <div class="aside-nav">
      <div>Home</div>
      <div>Article</div>
      <div>About</div>
      <div>Contact</div>
    </div>
  </aside>
  <main></main>
</div>
:::

通过使用 CSS 垂直媒体查询，我们可以避免这个问题。

```css
@media (min-height: 600px) {
  .aside__nav {
    position: sticky;
    bottom: 1rem;
  }
}
```

这样，只有当视口高度大于或等于 600px 时，辅助导航才会粘在底部。

可能有更好的方法来实现该行为（例如使用 margin-auto ），但在此示例中专注于 `vertical media queries`。
