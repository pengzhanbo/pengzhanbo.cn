---
url: /defensive-css/long-content/index.md
---
## Long Content

这是常见的联系人列表，现在看起来很完美。

:::demo-wrapper

但是，由于 联系人名字是由用户输入的，因此我们需要注意如何在内容过长的情况下保护布局。

如：

:::demo-wrapper

在此类布局中，一致性很重要。为了实现这一点，我们可以简单地使用 `text-overflow` 来截断名称。

```css
.username {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

:::demo-wrapper

## 示例

在某些情况下，我们可能需要截断对用户不重要或不影响用户体验的文本。在这种情况下，截断文本是个好主意。

:::: demo title="text-overflow: ellipsis" desc="调整容器大小查看效果"
::: code-tabs

@tab HTML

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

@tab Javascript

```js
const til = document.querySelector('#title')
document.querySelector('#toggle').addEventListener('change', (e) => {
  til.classList.toggle('ellipsis', e.target.checked)
})
```

:::
::::
