---
title: DOCTYPE
createTime: 2022/04/13 11:26:59
author: pengzhanbo
permalink: /note/interview-question/2whxs493/
---

::: tip 提问
1. 什么是DOCTYPE？
2. DOCTYPE的作用是什么？
3. 标准模式和兼容模式
4. HTML5 `<!DOCTYPE HTML>`
5. 什么是 DTD？
:::

## 什么是DOCTYPE

`DOCTYPE` 是 文档类型， 用于声明当前文档使用哪种文档模式进行解析和渲染。

## DOCTYPE的作用是什么？

`<!DOCTYPE>` 声明一般位于文档的第一行，它的作用是告知浏览器以哪种模式进行解析文档。
一般指定之后，会使用标准模式进行文档解析，否则就以兼容模式进行解析。

## 标准模式和兼容模式

- 标准模式 是指 浏览器以该浏览器支持的最高标准进行文档解析和渲染，包括JS引擎。
- 兼容模式 是指 文档以宽松的向后兼容的方式渲染，模拟老式浏览器的行为以防止站点无法工作。

## HTML5的DOCTYPE声明

HTML5的 不需要对 DTD 进行引用。但是需要 DOCTYPE 来规范浏览器的行为。
所以HTML的DOCTYPE 声明为
``` html
<!DOCTYPE html>
```

## 什么是 DTD？

DTD 全称： `Document Type Definition (文档类型定义)`，是一组机器可读的规则。

DTD 定义了 XML 或者 HTML 的特定版本中所有允许元素和它们的属性和层级关系的定义。
解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。
