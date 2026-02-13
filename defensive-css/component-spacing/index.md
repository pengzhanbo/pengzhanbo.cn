---
url: /defensive-css/component-spacing/index.md
---
## Component Spacing

在一些布局场景中， 我们应该考虑不同的内容长度对布局的影响。
这意味着，我们需要将 **间距** 添加到组件中，即使它看起来不需要。

:::demo-wrapper

在此示例中，右侧有一个部分标题和一个操作按钮。
目前，它看起来还不错。但是，让我们看看当标题更长时会发生什么。

:::demo-wrapper

可以看到， 文本距离操作按钮太近了。也许我们可以考虑换行，但在我们将在其它章节讨论。
现在我们关注 **间距** 。

如果标题有 间距 和 文本截断 ，我们不会看到这样的问题。

```css
.section__title {
  margin-right: 1rem;
}
```

:::demo-wrapper
