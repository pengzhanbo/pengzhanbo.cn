---
title: Position Sticky With CSS Grid
author: 鹏展博
createTime: 2023/08/08 09:38:52
permalink: /defensive-css/sticky-with-grid/
---

## Position Sticky With CSS Grid

你有没有试过与 网格布局的 子项 一起使用 `position: sticky`？
网格项的默认行为是拉伸。因此，以下示例中的 aside 元素等于 main 元素高度。

<style scoped>
.grid-box {
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-gap: 20px;
  height: 400px;
}
.grid-box aside {
  position: sticky;
  top: calc(var(--vp-nav-height) + 20px);
  height: 250px;
  background: var(--vp-c-bg);
  border-radius: 5px;
  padding: 20px 0;
  text-align: center;
}
.grid-box aside.start {
  align-self: start;
  height: auto;
}
.grid-box main {
  height: 250px;
  background: var(--vp-c-gray-soft);
  border-radius: 5px;
  padding-top: 20px;
  text-align: center;
}
</style>

:::demo-wrapper
<div class="grid-box">
  <aside>aside</aside>
  <main>main</main>
</div>
:::

若要使其按预期工作，需要重置 `align-self` 属性。

```css
aside {
  align-self: start;
  position: sticky;
}
```

:::demo-wrapper
<div class="grid-box">
  <aside class="start">aside</aside>
  <main>main</main>
</div>
:::
