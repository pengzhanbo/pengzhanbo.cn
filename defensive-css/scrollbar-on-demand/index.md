---
url: /defensive-css/scrollbar-on-demand/index.md
---
## Scrollbar On Demand

按需使用滚动条。当下，我们可以控制是否显示滚动条，或者仅在内容较长的时候显示滚动条。
但强烈建议在不确定内容的情况下使用 `auto` 作为 `overflow` 属性值。

:::demo-wrapper

可以看到，即使内容很短，也能看到 滚动条，这对 UI 而言很不利。
在不需要 滚动条的时候看到滚动条是一件令人不快的事情。

使用 `overflow-y: auto` 时，滚动条只有在内容较长时才可见。
这是更好的 视觉交互体验。

:::demo-wrapper
