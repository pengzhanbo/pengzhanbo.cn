---
title: Long Content
author: 鹏展博
createTime: 2023/08/03 19:15:44
permalink: /defensive-css/long-content/
---

## Long Content

这是常见的联系人列表，现在看起来很完美。

:::demo-wrapper

<div class="demo1-user-list">
  <div class="demo1-user-list__item"><span></span><p>老王</p></div>
  <div class="demo1-user-list__item"><span></span><p>老张</p></div>
  <div class="demo1-user-list__item"><span></span><p>老李</p></div>
  <div class="demo1-user-list__item"><span></span><p>老赵</p></div>
</div>
:::

<style>
.demo1-user-list {
  margin:20px auto;
  padding:10px;
  width:170px;
  border-radius:5px;
  background: var(--vp-c-bg);
}
.demo1-user-list__item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.demo1-user-list__item:last-of-type {
  margin-bottom: 0;
}
.demo1-user-list__item span {
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--vp-c-bg-alt);
}
.demo1-user-list__item p {
  margin: 0 10px;
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}
.demo1-user-list__item p.username {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

但是，由于 联系人名字是由用户输入的，因此我们需要注意如何在内容过长的情况下保护布局。

如：

:::demo-wrapper

<div class="demo1-user-list">
  <div class="demo1-user-list__item"><span></span><p>隔壁家的老王</p></div>
  <div class="demo1-user-list__item"><span></span><p>东大街的老张</p></div>
  <div class="demo1-user-list__item"><span></span><p>老李</p></div>
  <div class="demo1-user-list__item"><span></span><p>老赵</p></div>
</div>
:::

在此类布局中，一致性很重要。为了实现这一点，我们可以简单地使用 `text-overflow` 来截断名称。

```css
.username {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

:::demo-wrapper

<div class="demo1-user-list">
  <div class="demo1-user-list__item"><span></span><p class="username">隔壁家的老王</p></div>
  <div class="demo1-user-list__item"><span></span><p class="username">东大街的老张</p></div>
  <div class="demo1-user-list__item"><span></span><p class="username">老李</p></div>
  <div class="demo1-user-list__item"><span></span><p class="username">老赵</p></div>
</div>
:::

## 示例

在某些情况下，我们可能需要截断对用户不重要或不影响用户体验的文本。在这种情况下，截断文本是个好主意。

:::normal-demo text-overflow: ellipsis

```html
<p>调整容器大小查看效果：</p>
<div class="wrapper">
  <div class="container">
    <h3 id="title">编写防御性CSS 是避免样式混乱的好方法</h3>
    <div class="more">more</div>
  </div>
</div>
<div class="actions">
  <input type="checkbox" id="toggle" />
  <label for="toggle">启用 text-overflow</label>
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
  content: 'Resize me';
  position: absolute;
  right: 0;
  top: 50%;
  writing-mode: tb-rl;
  transform: translateY(-50%);
  font-size: 13px;
  line-height: 1.2;
}

.container {
  width: 100%;
  display: flex;
  align-items: center;
}
.container h3 {
  padding-right: 20px;
  min-width: 0;
}
.container h3.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

```js
const til = document.querySelector('#title')
document.querySelector('#toggle').addEventListener('change', (e) => {
  til.classList.toggle('ellipsis', e.target.checked)
})
```

:::
