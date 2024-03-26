---
title: Input Zoom On iOS Safari
author: 鹏展博
createTime: 2023/08/11 17:18:20
permalink: /defensive-css/input-zoom-on-ios-safari/
---

## Input Zoom On iOS Safari

在 iOS Safari 中， 当我们 聚焦 一个 `input` 元素进行输入时，默认情况整个网页都会进行缩放。
这是 Safari 的默认行为。虽然在输入时方法 `input` 输入框，可以让用户看到 更大的文字，
但是，不再聚焦 `input` 元素，离开输入框后，整个网页并不会缩小复原，这就很让人恼了。

:::demo-wrapper img no-padding
<img src="/images/defensive-css/input-zoom-ios.png" alt="input-zoom-on-ios-safari" />
:::

解决方法很简单，只需要添加 `font-size` 属性到 `input` 元素即可。

```css
input {
  font-size: 16px;
}
```

:::demo-wrapper img no-padding
<img src="/images/defensive-css/input-zoom-ios-fix.png" alt="input-zoom-on-ios-safari" />
:::
