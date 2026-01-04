---
url: /defensive-css/sticky-with-grid/index.md
---
## Position Sticky With CSS Grid

你有没有试过与 网格布局的 子项 一起使用 `position: sticky`？
网格项的默认行为是拉伸。因此，以下示例中的 aside 元素等于 main 元素高度。

:::demo-wrapper

若要使其按预期工作，需要重置 `align-self` 属性。

```css
aside {
  align-self: start;
  position: sticky;
}
```

:::demo-wrapper
