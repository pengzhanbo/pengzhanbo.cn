---
url: /defensive-css/background-repeat/index.md
---
## Background repeat

通常，当使用大图像作为背景时，我们往往会忘记考虑在大屏幕上查看时的情况。
默认情况下，该背景将重复。

这在笔记本电脑屏幕上大多不可见，但在较大的屏幕上可以清楚地看到。
::::demo-wrapper
:::center
小屏幕

大屏幕

:::
::::

为提前避免该行为，请确保重置 `background-repeat` 。

```css
.hero {
  background-image: url('..');
  background-repeat: no-repeat;
}
```
