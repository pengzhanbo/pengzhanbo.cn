---
url: /defensive-css/text-over-image/index.md
---
## Text Over Image

在 图像 上显示文本时，需要考虑 图像 加载失败时的情况，文本会成什么样。

看下面的示例：

:::demo-wrapper no-padding

但是，当图片加载失败时, 文本几乎看不见。

:::demo-wrapper no-padding

我们可以通过为 `<img>` 元素添加背景颜色来解决这个问题。
仅当图像加载失败时，此背景才可见。

:::demo-wrapper no-padding
