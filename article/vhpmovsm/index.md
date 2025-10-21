---
url: /article/vhpmovsm/index.md
---
## 背景

移动端设备由于不同品牌、不同机型，不同设备中，使用的不同浏览器，带来的一系列适配问题。在这些设备中，如何实现展示效果、交互的一致性，是比较头疼的问题。

## 发展

早期的适配方案五花八门。

在2015年双十一左右， 阿里前端团队 AmFe 分享了 `flexiable` 的移动端适配方案，在往后的几年中， `flexiable`成为了主流的移动端适配方案在各大移动端应用中使用。

随着技术的发展，CSS3的`viewport`越来越得到了更多的设备支持， 逐渐的可以直接使用 viewport 来作为 移动端适配方案，2017年左右开始步入开发者的视野。

后来 AmFe 宣布 推荐使用 `viewport` 方案代替 `flexible`，`viewport`方案逐渐成为主流适配方案。

## lib-flexible 方案介绍

### viewport

viewport 即浏览器窗口，在移动端设备中，viewport太窄，为了更好的服务于CSS，提供了 `visual viewport` 和 `layout viewport`

### 物理像素（physical pixel）

物理像素即设备像素，是显示设备中最微小的物理部件。

### 设备独立像素（density-independent pixel）

设备独立像素也称为 密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素，然后由系统转换为物理像素

### CSS像素（CSS pixel）

css像素是一个抽象单位，主要用在浏览器上，用来精确的度量Web页面上的内容。

一般情况下， CSS像素称为设备无关的像素，简称 `DIPs`

### 屏幕密度

屏幕密度是指一个设备表面上存在的像素密度，它通常已每英寸有多少像素来计算（`PPI`）

### 设备像素比（device pixel ratio）

简称 `DPR`，定义了物理像素和设备独立像素的对应关系

```html
设备像素比 = 物理像素 / 设备独立像素
```

### 简要说明

`flexiable` 通过hack手段，根据设备的dpr值相应改变 `<meta>` 标签中viewport的值：

```html
<!-- dpr = 1-->
<meta name="viewport" content="initial-scale=scale,maximum-scale=scale,minimum-scale=scale,user-scalable=no" />
<!-- dpr = 2-->
<meta name="viewport" content="initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5,user-scalable=no" />
<!-- dpr = 3-->
<meta
  name="viewport"
  content="initial-scale=0.3333333333,maximum-scale=0.3333333333,minimum-scale=0.3333333333,user-scalable=no"
/>
```

从而让页面达到缩放的效果，变相的实现页面的适配功能。

主要的思想：

1. 根据 `dpr`的值来修改 `viewport` 实现1px的线
2. 根据 `dpr`的值来修改 `html`的 `font-size`，从而使用rem实现等比缩放
3. 使用 `hack` 手段用`rem`模拟 `vw`的特性

### 使用

> github: <https://github.com/amfe/lib-flexible>

> px-to-rem: <https://www.npmjs.com/package/postcss-pxtorem>

## px-to-viewport 适配方案

`Flexiable` 是通过javascript 模拟 `vw`的特性，到今天未知，`vw`已经得到了众多浏览器的支持，完全可以考虑直接将`vw`单位用于我们的适配布局中。

在css level3 中，定义了和 viewport相关的四个单位，分别是 `vw`、`vh`、`vmin`、`vmax`。

* `vw`: viewport width 简写，1vw等于 `window.innerWidth` 的 `1%`
* `vh`： viewport height简写，1vh 等于 `window.innerHeight` 的 `1%`
* `vmin`：vmin的值是当前 vw和vh中较小值
* `vmax`： vmax的值是当前 vw和vh中较大值

![viewport](/images/viewport.png)

在一张 750px的设计稿中， 100vw=750px， 1vw=7.5px，通过公式即可转换px单位为vw单位，实现适配。

可以通过 postcss-px-to-viewport 来帮助实现自动转换

> github: [https://github.com/evrone/postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)

### 适用vw适配页面的场景

1. 容器适配
2. 文本适配
3. 大于1px的边框、圆角、阴影
4. 内边距和外边距
