---
title: Button Minimum Width
createTime: 2023/08/12 10:00:16
permalink: /defensive-css/button-minimum-width/
---

## Button Minimum Width

一个常见的错误是假设按钮宽度应等于其内容加水平填充。
这对于单语言网站（例如：英语）可能如预期般工作，但对于多语言网站很容易出现意外的问题。

请看以下示例：

<style>
.btn-width-1339 {
  padding: 3px 8px;
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-weight: 500;
  border-radius: 4px;
}
.btn-width-1339.min {
  min-width: 90px;
}
</style>

:::demo-wrapper
英语：
<button type="button" class="btn-width-1339">Done</button>

中文：
<button type="button" class="btn-width-1339">完成</button>

阿拉伯语：
<button type="button" class="btn-width-1339">تم</button>
:::

可以看到， 在 英语 和 中文 下， 按钮的宽度表现很好，因为其内容足够长。
但是在 阿拉伯语 中， 按钮的宽度就很窄，从拥护体验来说，这很不友好，
因为对一个主要的按钮来说，它的表现应该足够的直观，方便用户操作。

为避免这种情况，我们可以提前设置按钮的最小宽度。

```css
button {
  min-width: 90px;
}
```

:::demo-wrapper
英语：
<button type="button" class="btn-width-1339 min">Done</button>

中文：
<button type="button" class="btn-width-1339 min">完成</button>

阿拉伯语：
<button type="button" class="btn-width-1339 min">تم</button>
:::
