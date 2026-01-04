---
url: /interview-question/5yfvcq8k/index.md
---
::: tip 提问

* 什么是 CSS 浮动？
* 浮动元素会带来哪些影响？
* 如何清除浮动？ 各自的优点？

:::

## 什么是 CSS 浮动（float）

一开始 引入 float 属性是为了让 开发人员实现简单的布局，在一列文本中浮动的图像，文字环绕在它的左边或者右边。

但 开发人员意识到，任何东西都可以浮动，而不仅仅是图像，所以浮动的使用范围扩大了。

在早期，浮动可以用来实现整个网站的页面布局， 因为浮动使得元素可以横向并列。

## 浮动元素带来哪些影响？

* 包裹性，自适应性；

  * 如果浮动元素父元素宽度为300px，浮动元素不声明宽度，浮动元素子元素是一个200px的图片，则此时浮动元素的宽度表现为包裹，
    宽度就是子元素图片的宽度200px；

  * 如果浮动元素子元素还包括大串文本内容，父元素不足以一行放下所有文本内容，则此时浮动元素则自适应父元素的宽度，宽度为父元素宽度。

* 块级化并格式化上下文

  * 当一个元素的float属性值不为node，则其display计算值就是block或者table。
  * 同时，该浮动元素也会产生一个格式化上下文

* 破坏文档

  浮动元素会让其父元素的高度塌陷。在大多数场景下，这个特性会影响到 正常的布局。

* 没有任何margin合并

## 清除浮动

### clear属性

clear 属性的官方解释是： 元素盒子的边不能和前面的浮动元素相邻。

用法：

```
clear: none | left | right | both;
```

使用：

* 在浮动元素后面插入空白块级元素，并声明 clear属性

  ```html
  <style>
    .float {
      float: left;
    }
    .clear {
      clear: both;
    }
  </style>
  <div>
    <div class="float">float</div>
    <div class="clear"></div>
  </div>
  ```

* 使用伪类元素，并声明clear属性

  ```html
  <style>
    .float {
      float: left;
    }
    .clear::after {
      content: '';
      display: block;
      clear: both;
    }
  </style>
  <div class="clear">
    <div class="float">float</div>
  </div>
  ```

### 创建BFC包裹浮动元素

创建BFC的方式比如：

* 浮动元素父元素设置 float 属性
* 浮动元素父元素设置 overflow 属性，且值为 auto、scroll 或 hidden
* 浮动元素父元素设置 position 属性，且值不为 relative或 static
* 浮动元素父元素设置 display 属性，且值为 inline-block、table-cell 或 table-caption

::: tip 说明
float 属性，一开始的设计目的，仅仅是为 文字和图片服务的， 是为了实现文字的环绕效果。
但是由于当年可用的布局手段很少，想要实现复杂的排版，大都依然`<table>`布局，后来发现给元素浮动后，
可以像垒房子一样，把元素变成一块块砖搭建页面，float也被开发人员变成了一种网页布局手段。

在当下，网页可用的布局方式已经越来越丰富，比如 `flex`布局、`Gird`布局等，都比用float属性进行布局要更加强大。
所以在当下，不推荐继续使用 float进行布局。
:::
