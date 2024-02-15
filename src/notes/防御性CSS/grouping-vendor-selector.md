---
title: Grouping Vendor Selector
author: 鹏展博
createTime: 2024/01/17 18:55:35
permalink: /note/defensive-css/grouping-vendor-selector/
---

## Grouping Vendor Selector

不建议对带有不同浏览器前缀的选择器进行分组。

例如，设置输入占位符的样式需要每个浏览器有多个选择器。

这是由于， 根据 [W3C](https://www.w3.org/TR/selectors/#grouping) ，如果选择器分组中，有某一个
选择器 无效，则会使整个分组的所有选择器都无效。

```css
/* 请不要这样做 */
input::-webkit-input-placeholder,  /* [!code warning] */
input:-moz-placeholder {           /* [!code warning] */
    color: #222;
}
```

相反，请这样做：

```css
input::-webkit-input-placeholder {
    color: #222;
}

input:-moz-placeholder {
    color: #222;
}
```
