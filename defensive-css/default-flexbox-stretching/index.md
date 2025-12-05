---
url: /defensive-css/default-flexbox-stretching/index.md
---
## Default FlexBox Stretching

在 flexbox 中，flex 项的默认行为是拉伸。如果子项的内容长于其同级项，则会导致其他项拉伸。

但这不容易被发现， 除非我们向 Flex 项中添加比预期更长的内容。

***

在这个示例中，我们有一个包含 图像、标题、介绍 的组件。

```html
<div class="food">
  <img class="food__img" src="image/food.jpg" alt="" />
  <div class="food__content">
    <h3>一份美食</h3>
    <p><!-- Description goes here.. --></p>
  </div>
</div>
```

```css
.food {
  display: flex;
}
```

:::demo-wrapper

可以发现，当内容长度过长时，搞过了图片的高度时，图片被拉伸了。

为了解决这个问题，我们需要覆盖默认的拉伸行为。

```css
.food__img {
  align-self: flex-start;
}
```

:::demo-wrapper
