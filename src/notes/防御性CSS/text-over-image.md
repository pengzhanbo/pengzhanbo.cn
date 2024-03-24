---
title: Text Over Image
author: 鹏展博
createTime: 2023/08/09 17:59:42
permalink: /defensive-css/text-over-image/
---

## Text Over Image

在 图像 上显示文本时，需要考虑 图像 加载失败时的情况，文本会成什么样。

看下面的示例：

<style scoped>
.demo-wrapper .demo-container {
  background: var(--vp-c-bg);
}
.image-cover {
  position: relative;
  width: 200px;
  height: 133px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  box-shadow: var(--vp-shadow-2);
  margin: 20px auto;
}
.image-cover img {
  width: 200px;
  height: 133px;
  object-fit: cover;
}

.image-cover img.bg {
  background-color: var(--vp-c-gray-1);
}

.image-cover p {
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

:::demo-wrapper
<div class="image-cover">
  <img src="/images/defensive-css/ratio.png">
  <p>美食</p>
</div>
:::

但是，当图片加载失败时, 文本几乎看不见。

:::demo-wrapper
<div class="image-cover">
  <img src="">
  <p>美食</p>
</div>
:::

我们可以通过为 `<img>` 元素添加背景颜色来解决这个问题。
仅当图像加载失败时，此背景才可见。

:::demo-wrapper
<div class="image-cover">
  <img src="/images/defensive-css/ratio.png">
  <p>美食</p>
</div>

<div class="image-cover">
  <img src="" class="bg">
  <p>美食</p>
</div>
:::
