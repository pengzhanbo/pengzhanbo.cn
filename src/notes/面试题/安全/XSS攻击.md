---
title: XSS攻击
createTime: 2022/04/20 05:31:09
author: pengzhanbo
permalink: /interview-question/mvcgg9uz/
---

::: tip 提问

1. 什么是XSS攻击？
2. 如何防范 XSS攻击？
:::

## XSS攻击

XSS 攻击指的是跨站脚本攻击，是一种代码注入攻击。
攻击者通过在网站注入恶意脚本，使之在用户的浏览器上运行，从而盗取用户的信息如 cookie 等。

XSS 的本质是因为网站没有对恶意代码进行过滤，与正常的代码混合在一起了，
浏览器没有办法分辨哪些脚本是可信的，从而导致了恶意代码的执行。

## 防范XSS攻击

- 对存入数据库的数据都进行的转义处理
- 对需要插入到 HTML 中的代码做好充分的转义
- 使用 CSP
- cookie 使用 http-only
