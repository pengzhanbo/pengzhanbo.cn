---
title: FlexBox Wrapping
author: 鹏展博
createTime: 2023/08/03 19:06:31
permalink: /defensive-css/flex-box-wrapping/
---

## FlexBox Wrapping

当下 `CSS FlexBox` 是用途最宽泛，最有用的 CSS 布局功能之一。
它只需要给 容器添加一个 `display: flex` 就可以使 容器内的 子项 一个个并排排序，简单强大，十分诱人。

但是有一个问题，如果容器没有足够的空间时，在默认情况下，这些子项不会被换行到新行中。
因此，我们需要使用 `flex-wrap: wrap` 来改变这个行为。

下面是一个 典型例子，我们有一组选项，应该彼此相邻：

<style scoped>
.flexbox {
  display: flex;
  width: 230px;
  margin: auto;
  padding: 10px;
  gap: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  box-shadow: var(--vp-shadow-2);

}
.flexbox.small {
  width: 140px;
}
.flexbox.wrap {
  flex-wrap: wrap;
}
.flexbox .item {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: var(--vp-c-gray-soft);
}
</style>

:::demo-wrapper
<p align="center">容器空间足够</p>

<div class="flexbox">
  <div class="item">opts1</div>
  <div class="item">opts2</div>
  <div class="item">opts3</div>
  <div class="item">opts4</div>
</div>
:::

当容器空间较小时，容器内的子项将被挤压，甚至溢出容器。这应该是意料之中的，实际上并不是一个“问题”。

:::demo-wrapper
<p align="center">容器空间不足</p>
<div class="flexbox small">
  <div class="item">opts1</div>
  <div class="item">opts2</div>
  <div class="item">opts3</div>
  <div class="item">opts4</div>
</div>
:::

请注意，这些子项仍然彼此相邻。为了解决这个问题，我们需要使用 `flex-wrap: wrap`：

:::demo-wrapper
<div class="flexbox small wrap">
  <div class="item">opts1</div>
  <div class="item">opts2</div>
  <div class="item">opts3</div>
  <div class="item">opts4</div>
</div>
:::

## 示例：面包屑导航

:::normal-demo 面包屑导航
```html
<p>调整容器大小查看效果：</p>
<div class="wrapper">
  <ul class="breadcrumbs" id="breadcrumbs">
    <li class="item"><a href="#">Home</a></li>
    <li class="item"><a href="#">Article</a></li>
    <li class="item"><a href="#">Defensive CSS</a></li>
  </ul>
</div>
<div class="actions">
  <input type="checkbox" id="toggle">
  <label for="toggle">启用 Flex Wrap</label>
</div>
```
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
  content: "Resize me";
  position: absolute;
  right: 0;
  top: 50%;
  writing-mode: tb-rl;
  transform: translateY(-50%);
  font-size: 13px;
  line-height: 1.2;
}
.breadcrumbs {
  display: flex;
  list-style: none;
  padding-left: 0;
}
.item:not(:last-child):after {
    content: ">";
    margin-left: 0.5rem;
    margin-right: 1rem;
}
.item a {
  color: var(--vp-c-brand, #5086a1);
}
```
```js
const breadcrumbs = document.querySelector('#breadcrumbs');
document.querySelector('#toggle').addEventListener('change', (e) => {
  breadcrumbs.style.flexWrap = e.target.checked ? 'wrap' : 'nowrap';
})
```
:::


