---
url: /defensive-css/using-space-between/index.md
---
## Using Space Between

在 Flex 容器中， 我们可以使用 `space-between` 来定义项目之间的间距。
当子项的数量 符合我们的 布局预期时，在 UI 效果上来看还不错。
但是，如果 项目的数量过多或过少时，布局就会看起来很糟糕。

请看下面示例：

```css
.wrapper {
  display: flex;
  justify-content: space-between;
}
```

:::demo-wrapper

项目为 4 个时，看起来还不错。

项目为 3 个时，间隔就过大了。

对此，我们有不同的解决方案：

* 使用 `margin` 设置外边距作为间隔
* 使用 flexbox `gap` 设置间隔
* 在父元素上使用 `padding` 作为 子元素 间隔
* 添加空白元素作为间隔

比如，我们使用 `gap` 设置 间隔

```css
.wrapper {
  display: flex;
  gap: 1rem;
}
```

:::demo-wrapper
