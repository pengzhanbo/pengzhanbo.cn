---
title: Image Maximum Width
author: 鹏展博
createTime: 2023/08/7 19:16:30
permalink: /defensive-css/image-maximum-width/
---

## Image Maximum Width

作为一般规则， 请不要忘记为 所有图像设置 `max-width: 100%`。
这可以添加到你的 CSS 重置 规则中。

```css
img {
  max-width: 100%;
  object-fit: cover;
}
```
