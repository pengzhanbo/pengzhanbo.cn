---
title: Text Over Image
author: 鹏展博
createTime: 2023/08/09 17:59:42
permalink: /defensive-css/text-over-image/
---

## Text Over Image

在 图像 上显示文本时，需要考虑 图像 加载失败时的情况，文本会成什么样。

看下面的示例：

<style>
.image-wrapper-113 {
  background-color: var(--vp-c-bg);
  padding: 20px;
}
.image-cover-113 {
  position: relative;
  width: 200px;
  height: 133px;
  overflow: hidden;
  border-radius: 5px;
  margin: 20px auto;
}
.image-cover-113 img {
  width: 200px;
  height: 133px;
  object-fit: cover;
}

.image-cover-113 img.bg {
  background-color: var(--vp-c-gray-1);
}

.image-cover-113 p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: var(--vp-c-bg);
  font-size: 24px;
  font-weight: bold;
  text-shadow: var(--vp-shadow-1);
}
</style>

:::demo-wrapper no-padding

<div class="image-wrapper-113">
<div class="image-cover-113">
  <img src="/images/defensive-css/ratio.png" alt="">
  <p>美食</p>
</div>
</div>
:::

但是，当图片加载失败时, 文本几乎看不见。

:::demo-wrapper no-padding

<div class="image-wrapper-113">
<div class="image-cover-113">
  <img src="" alt="">
  <p>美食</p>
</div>
</div>
:::

我们可以通过为 `<img>` 元素添加背景颜色来解决这个问题。
仅当图像加载失败时，此背景才可见。

:::demo-wrapper no-padding

<div class="image-wrapper-113">
<div class="image-cover-113">
  <img src="/images/defensive-css/ratio.png" alt="">
  <p>美食</p>
</div>

<div class="image-cover-113">
  <img src="" class="bg" alt="">
  <p>美食</p>
</div>
</div>
:::
