---
url: /interview-question/bvx4d2u5/index.md
---
::: tip 提问

1. 如何用css画一个 三角形
2. 原理是什么？

:::

## 原理

由于 CSS 对于元素的边框，其相邻的边框的连接处，采用的是均分的处理方式，我们可以利用这个特性，
使用元素的边框，画一个三角形。

* 将元素的display属性设置为 block 或 inline-block；
* 宽高均设置为0；
* 设置border-width为大于 1px 的值，border-style为 solid；
* 设置 border-color， 仅保留一条边的颜色，其他边的颜色为透明

```css
.demo {
  display: block;
  width: 0;
  height: 0;
  border-width: 30px;
  border-style: solid;
  border-color: transparent transparent blue transparent;
}
```

:::: demo title="CSS三角形"
::: code-tabs

@tab HTML

```html
<div class="triangle-demo"></div>
```

@tab CSS

```css
.triangle-demo {
  display: block;
  width: 0;
  height: 0;
  border-width: 30px;
  border-style: solid;
  border-color: transparent transparent cyan transparent;
}
```

:::
::::
