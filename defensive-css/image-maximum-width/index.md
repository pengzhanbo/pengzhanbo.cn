---
url: /defensive-css/image-maximum-width/index.md
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
