---
title: Image Inner Border
createTime: 2023/08/10 17:16:05
permalink: /defensive-css/image-inner-border/
---

## Image inner border

在处理用户头像时，以清晰的方式显示它们，并且与 视图 很好的保持统一性，可能具有一定的挑战性。
因为有些 头像的亮度很高，有些头像的亮度很低，又有可能有些是 jpg 格式，有些是 png 格式，
对透明度的支持不一，就很可能与背景色 混合 在一起。

<style>
.avatar-110 {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
}
.avatar-110 img {
  object-fit: cover;
  width: 100%;
}
.avatar-110.inner {
  position: relative;
}
.avatar-110.inner::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  display: block;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #000;
  opacity: 0.1;
}
</style>

::::demo-wrapper
:::center

<div class="avatar-110"><img src="/images/blogger-fav.png" alt=""></div>
<p>avatar.png</p>
<div class="avatar-110"><img src="/images/blogger-fav.png" style="background-color: #fff" alt=""></div>
<p>avatar.jpg</p>
:::
::::

由于头像存在透明部分，导致与背景色融合在一起，看不出来 头像的 UI 为 圆形，与其它的部分失去了整体性。

对此，我们可以增加 边框，可以让 UI 看起来更为舒服。

```css
.avatar {
  position: relative;
}
.avatar::after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  display: block;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #000;
  opacity: 0.1;
}
```

::::demo-wrapper
:::center

<div class="avatar-110 inner"><img src="/images/blogger-fav.png" alt=""></div>
<p>avatar.png</p>
<div class="avatar-110 inner"><img src="/images/blogger-fav.png" style="background-color: #fff" alt=""></div>
<p>avatar.jpg</p>
:::
::::
