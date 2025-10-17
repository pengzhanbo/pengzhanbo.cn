---
url: /defensive-css/scroll-gutter/index.md
---
## Scroll Gutter

与滚动相关的另一件事是滚动条装订线。
以前面的 [例子](/defensive-css/scroll-chaining/) 为例，当内容变长时，添加滚动条将导致布局偏移。
发生布局偏移的原因是为滚动条保留空间。

:::demo-wrapper
\<button type="button" class="add-btn-120" @click="toggle">
{{ show ? '重置内容' : '添加内容' }}


请注意，当内容因显示滚动条而变长时，内容是如何移动的。
我们可以通过使用属性 `scrollbar-gutter` 来避免这种行为。

```css
.body {
  scrollbar-gutter: stable;
}
```

:::demo-wrapper
\<button type="button" class="add-btn-120" @click="toggle2">
{{ show2 ? '重置内容' : '添加内容' }}


`scrollbar-gutter: stable` 将会预先为 滚动条保留空间。
因此，在计算 内填充 `padding` 时，应考虑滚动条的宽度，从而适配 UI 效果。
