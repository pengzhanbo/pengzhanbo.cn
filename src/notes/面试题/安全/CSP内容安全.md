---
title: CSP内容安全策略
createTime: 2022/04/20 05:32:01
permalink: /interview-question/cl8r03ok/
---

::: tip 提问
什么是 CSP？
:::

CSP 指的是内容安全策略，它的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行。

我们只需要配置规则，如何拦截由浏览器自己来实现。

通常有两种方式来开启 CSP，一种是设置 HTTP 首部中的 Content-Security-Policy，一种是设置 meta 标签的方式

```html
<meta http-equiv="Content-Security-Policy" />
```
