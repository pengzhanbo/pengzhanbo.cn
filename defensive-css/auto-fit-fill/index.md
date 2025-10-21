---
url: /defensive-css/auto-fit-fill/index.md
---
## Auto-fit Vs Auto-fill

当我们在使用 `CSS Grid` 网格布局时，会经常使用到 `minmax()` 函数。
在使用 `minmax()` 函数时，决策使用 `auto-fit` 还是 `auto-fill` 关键词非常重要，
如果使用不当，可能会导致意想不到的后果。

使用 `minmax()` 函数 时：

* `auto-fit`： 将展开网格项以填充可用空间。
* `auto-fill`： 将保留可用空间，而不改变网格项的宽度。

![auto fit fill](/images/defensive-css/auto-fit-fill.png){style="border:var(--vp-c-divider) 1px solid;border-radius:5px;box-shadow:var(--vp-shadow-2)"}

尽管如此，使用 `auto-fit` 可能会导致网格项太宽，尤其是当它们小于预期时。请看以下示例。

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
}
```

如果只有一个网格项并且使用 `auto-fit` ，则该项目将展开以填充容器宽度。

:::demo-wrapper
四个子项：

一个子项：

***

在大多数情况下，不需要 这样的行为。所以在我看来，使用 `auto-fill` 会更好。

:::demo-wrapper
四个子项：

一个子项：

## 示例

```css
.wrapper {
  --sizing: auto-fit;
  display: grid;
  grid-template-columns: repeat(var(--sizing), minmax(100px, 1fr));
  grid-gap: 1rem;
}
```

:::: demo title="auto-fit-fill" desc="调整容器大小查看效果"
::: code-tabs

@tab HTML

```html
<div class="demo-wrapper">
  <div class="wrapper" id="gridWrapper">
    <div class="card">
      <div class="card__thumb"></div>
      <p>css grid 布局</p>
    </div>
    <div class="card">
      <div class="card__thumb"></div>
      <p>css grid 布局</p>
    </div>
    <div class="card-outline"></div>
    <div class="card-outline"></div>
  </div>
</div>
<div class="actions">
  <input type="checkbox" id="toggle" />
  <label for="toggle">启用 auto-fill</label>
</div>
```

@tab CSS

```css
.demo-wrapper {
  position: relative;
  width: 300px;
  max-width: 100%;
  resize: horizontal;
  overflow: hidden;
  border-right: solid 2px var(--vp-c-border, #c2c2c4);
  padding-right: 3rem;
  padding-left: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background: var(--vp-c-bg-alt, #f0f0f0);
}
.demo-wrapper::after {
  content: 'Resize me';
  position: absolute;
  right: 0;
  top: 50%;
  writing-mode: tb-rl;
  transform: translateY(-50%);
  font-size: 13px;
  line-height: 1.2;
}
.wrapper {
  --sizing: auto-fit;
  display: grid;
  grid-template-columns: repeat(var(--sizing), minmax(100px, 1fr));
  grid-gap: 1rem;
  width: 100%;
}
.wrapper .card {
  border-radius: 5px;
  overflow: hidden;
}
.wrapper .card__thumb {
  height: 90px;
  background: var(--vp-c-brand-1, #f0f0f0);
}
.wrapper .card p {
  margin: 0;
  padding: 5px 10px;
  background: var(--vp-c-brand-3, #f0f0f0);
}
.wrapper .card-outline {
  display: none;
  border: 1px dashed;
  border-radius: 5px;
  min-height: 20px;
}

.wrapper.checked {
  --sizing: auto-fill;
}

.wrapper.checked .card-outline {
  display: block;
}
```

@tab Javascript

```js
const wrapper = document.querySelector('#gridWrapper')
document.querySelector('#toggle').addEventListener('change', (e) => {
  wrapper.classList.toggle('checked', e.target.checked)
})
```

:::
::::
