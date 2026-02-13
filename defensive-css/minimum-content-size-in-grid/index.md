---
url: /defensive-css/minimum-content-size-in-grid/index.md
---
## Minimum Content Size In CSS Grid

网格布局的最小内容大小：
CSS 网格的子项具有默认的最小内容大小，即 `auto` 。
这意味着，如果存在大于网格项的元素，它将溢出。

```css
.wrapper {
  width: 250px;
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-gap: 20px;
}
```

:::demo-wrapper

由于 左侧栏中的内容长度过宽，大于剩余的内容空间，导致了 内容溢出。

为了解决这个问题，我们有三种不同的解决方案：

1. 在 网格项中使用 `min-width: 0`
2. 使用 `minmax()`
3. 在 网格项中使用 `overflow: hidden`

作为 防御性 CSS 策略，选择使用 哪种方案并不重要，只要能够解决问题即可。

在这里，我们选择 `min-width: 0`

:::demo-wrapper
