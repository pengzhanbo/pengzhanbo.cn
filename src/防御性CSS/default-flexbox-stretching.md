---
title: Default FlexBox Stretching
createTime: 2023/08/11 10:23:19
permalink: /defensive-css/default-flexbox-stretching/
---

## Default FlexBox Stretching

在 flexbox 中，flex 项的默认行为是拉伸。如果子项的内容长于其同级项，则会导致其他项拉伸。

但这不容易被发现， 除非我们向 Flex 项中添加比预期更长的内容。

---

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

<style>
.food-wrapper-110 {
  display: flex;
  padding: 12px 20px;
  background: var(--vp-c-bg);
  border-radius: 5px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--vp-shadow-2);
}
.food-wrapper-110 .food__img {
  width: 200px;
}
.food-wrapper-110 .food__img.start {
  align-self: flex-start;
}
.food-wrapper-110 .food__content {
  padding: 0 20px;
}
.food-wrapper-110 .food__content h3 {
  margin-top: 0;
}
</style>

:::demo-wrapper

<p>内容长度合适时：</p>
<div class="food-wrapper-110">
  <img class="food__img" src="/images/defensive-css/ratio.png" alt="" />
  <div class="food__content">
    <h3>一份美食</h3>
    <p>这是一份看起来美味的食物</p>
  </div>
</div>

<p>内容长度过长时：</p>
<div class="food-wrapper-110">
  <img class="food__img" src="/images/defensive-css/ratio.png" alt="" />
  <div class="food__content">
    <h3>一份美食</h3>
    <p>这是一份看起来美味的食物</p>
    <p>这是一份看起来美味的食物</p>
    <p>这是一份看起来美味的食物</p>
    <p>这是一份看起来美味的食物</p>
    <p>这是一份看起来美味的食物</p>
  </div>
</div>
:::

可以发现，当内容长度过长时，搞过了图片的高度时，图片被拉伸了。

为了解决这个问题，我们需要覆盖默认的拉伸行为。

```css
.food__img {
  align-self: flex-start;
}
```

:::demo-wrapper

<p>内容长度合适时：</p>
<div class="food-wrapper-110">
  <img class="food__img start" src="/images/defensive-css/ratio.png" alt="" />
  <div class="food__content">
    <h3>一份美食</h3>
    <p>这是一份看起来美味的食物</p>
  </div>
</div>

<p>内容长度过长时：</p>
<div class="food-wrapper-110">
  <img class="food__img start" src="/images/defensive-css/ratio.png" alt="" />
  <div class="food__content">
    <h3>一份美食</h3>
    <p>这是一份看起来美味的食物</p>
    <p>这是一份看起来美味的食物</p>
    <p>这是一份看起来美味的食物</p>
    <p>这是一份看起来美味的食物</p>
    <p>这是一份看起来美味的食物</p>
  </div>
</div>
:::
