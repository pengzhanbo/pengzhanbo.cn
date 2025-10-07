---
title: Background repeat
createTime: 2023/08/05 22:56:46
permalink: /defensive-css/background-repeat/
---

## Background repeat

通常，当使用大图像作为背景时，我们往往会忘记考虑在大屏幕上查看时的情况。
默认情况下，该背景将重复。

这在笔记本电脑屏幕上大多不可见，但在较大的屏幕上可以清楚地看到。
::::demo-wrapper
:::center
小屏幕

<div style="width:200px;height:134px" class="bg-repeat-1339">
</div>

大屏幕

<div style="width:300px;height:133px;" class="bg-repeat-1339">
</div>

<style>
.bg-repeat-1339 {
  background:url(/images/defensive-css/ratio.png);
  background-size:auto 100%;
  margin:0 auto;
  box-shadow:var(--vp-shadow-2);
  border-radius:5px;
  border:1px solid var(--vp-c-divider);
}
</style>

:::
::::

为提前避免该行为，请确保重置 `background-repeat` 。

```css
.hero {
  background-image: url('..');
  background-repeat: no-repeat;
}
```
