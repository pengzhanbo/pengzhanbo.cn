---
url: /defensive-css/image-distortion/index.md
---
## Image Distortion

当我们无法控制网页中的图像的横纵比时，最好提前考虑并提供 图像横纵比不一致 时的解决方案。

在下面的示例中，我们有一个带有照片的卡片组件。看起来不错。

:::demo-wrapper

当时，如果使用的图片的尺寸横纵比不一致，图片会被拉伸：

:::demo-wrapper

最简单的解决方法是使用 CSS `object-fit` 。

```css
.card__image {
  object-fit: cover;
}
```

## 示例

:::: demo title="object-fit: cover" desc="调整容器大小查看效果"
::: code-tabs

@tab HTML

```html
<div class="wrapper">
  <img id="image" src="/images/defensive-css/ratio.png" />
</div>
<div class="actions">
  <input type="checkbox" id="toggle" />
  <label for="toggle">启用 object-fit</label>
</div>
```

@tab CSS

```css
.wrapper {
  position: relative;
  width: 300px;
  max-width: 100%;
  display: flex;
  align-items: center;
  resize: horizontal;
  overflow: hidden;
  flex: 1;
  border-right: solid 2px var(--vp-c-border, #c2c2c4);
  padding-right: 3rem;
  padding-left: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background: var(--vp-c-bg-alt, #f0f0f0);
}
.wrapper::after {
  content: 'Resize me';
  position: absolute;
  right: 0;
  top: 50%;
  writing-mode: tb-rl;
  transform: translateY(-50%);
  font-size: 13px;
  line-height: 1.2;
}

#image {
  width: 100%;
  height: 140px;
}
```

@tab Javascript

```js
const image = document.querySelector('#image')
document.querySelector('#toggle').addEventListener('change', (e) => {
  image.style.objectFit = e.target.checked ? 'cover' : 'initial'
})
```

:::
::::
