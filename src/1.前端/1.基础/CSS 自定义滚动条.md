---
title: 一文读懂 CSS 自定义滚动条
author: 鹏展博
tags:
  - css
createTime: 2023/03/05 17:22:49
permalink: /article/4ef5e74b/
---

有时候，为了保持我们的应用程序 UI 交互体验在不同系统的一致性，需要覆盖默认的滚动条，
通过自定义滚动条的方式，获得更好的用户体验。

<!-- more -->

<style scoped>
.demo-wrapper .demo-container {
  padding: 0;
  overflow: hidden;
}
.demo-wrapper .demo-container img {
  display: block;
}
</style>

:::demo-wrapper
![](/images/scrollbar/scrollbar-intro.jpg)
:::


## 滚动条的组成

首先，需要了解 滚动条由哪些部分组成的。

滚动条主要包含两个部分： **滚动轨道 Track** 和 **滑块 Thumb**。

:::demo-wrapper
![](/images/scrollbar/scrollbar-parts.jpg)
:::

**Track** 是滚动条的底部， **Thumb** 是提供用户交互的， 当用户拖动它控制页面或容器的滚动内容。

滚动条可以出现在 **水平** 或者 **垂直** 方向，而且在 多语言环境下，也会随着 从左到右 `LTR` 和 从右到左 `RTL`  
而变化。

:::demo-wrapper
![](/images/scrollbar/scrollbar-places-dir.jpg)
:::

## 自定义滚动条

在过去，能够进行 自定义滚动条的， 只有 基于 `webkit` 内核的浏览器 得到了支持，而像 `Firefox` 和 `IE`
浏览器则不具备 自定义滚动条 的能力。但是，对于 `Firebox`，  CSS 有了新的语法帮助我们完成滚动条的自定义。

我将分别介绍 `webkit` 下的旧的语法，然后是 新的语法。

### 旧的语法

#### 滚动条宽度

首先，我们需要定义滚动条的大小，它可以是垂直滚动条的宽度，也可以是水平滚动条的高度。

```css
.container::-webkit-scrollbar {
  width: 10px;
}
```

然后，我们就可以开始自定义滚动条的样式了。

#### 滚动条 Track

Track 表示滚动条的底部，我们可以通过添加 `background-color`、`box-shadow`、 `border-radius` 和 `border` 来控制 Track 的样式。

```css
.container::-webkit-scrollbar-track {
  background-color: darkgrey;
}
```

#### 滚动条 Thumb

准备好 滚动条的底部后，我们还需要设置滚动条 `Thumb` 的样式。用户可以拖动 `Thumb` 来与滚动条进行交互。

```css
.container::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
```

#### 旧语法浏览器兼容

::: caniuse mdn-css__selectors__-webkit-scrollbar
:::

至此，我们已经介绍了 CSS 中设置 自定义滚动条的旧语法以及兼容性。
接下来，我们将介绍 CSS 中设置 自定义滚动条的新语法。

### 新语法

#### 滚动条宽度

这定义了滚动条宽度，我们需要关注的值是 `auto` 和 `thin` 。
需要注意的是，我们无法像 `webkit` 语法那样定义一个特定的数字。

```css
.section {
  scrollbar-width: thin;
}
```

#### 滚动条颜色

使用此属性，我们可以将滚动条 `Track` 和 `Thumb` 的颜色定义为成对的值。

```css
.section {
  scrollbar-color: #6969dd #e0e0e0;
}
```

尽管这种语法很简单，但是我们只能使用 纯色，无法添加 阴影、渐变、圆角边框 等其他相关的样式。

#### 滚动条装订线 Gutter

你有没有想过，当内容在滚动容器中增加时，我们如何避免布局变化？让我们以以下案例为例。

:::demo-wrapper
![](/images/scrollbar/scrollbar-gutter-1.jpg)
:::

```css
.box {
  padding: 1rem;
  max-height: 220px;
  overflow-y: auto;
}
```

我们有一个四周都有 1rem 的内边距的容器。到目前为止，内容很短，滚动条不会显示，因为使用了 `overflow-y: auto`。

> [!note]
> 当我们使用 `overflow-y: auto` ，当内容很短时不会显示滚动条，直到内容超过了容器的高度，滚动条才显示。

当内容增长时，将显示滚动条，从而减少内容的可用空间。

:::demo-wrapper
![](/images/scrollbar/scrollbar-gutter-2.jpg)
:::

可以看到，当内容过长出现滚动条时，内容会发生偏移。
这是由于浏览器为滚动条保留了一个空间，导致内容空间收到挤压变小。

但幸运的是，现在可以通过 [`scrollbar-gutter`](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter) 属性来解决这个问题。它帮助为滚动条提前预留足够的空间。
它的默认值为 `auto`，可选值有 `stable` 和 `both-edges` 。

```css
.box {
  padding: 1rem;
  max-height: 220px;
  overflow-y: auto;
  scrollbar-gutter: stable;
}
```

:::demo-wrapper
![](/images/scrollbar/scrollbar-gutter-3.jpg)
:::

当内容增加时，就不会影响布局的空间变化，因为浏览器已经为 滚动条预留了空间。

:::demo-wrapper
![](/images/scrollbar/scrollbar-gutter-4.jpg)
:::

好消息是，`scrollbar-gutter` 的兼容性，从 `Chrome@94` 就开始得到了支持。

#### 新语法浏览器兼容

::: caniuse mdn-css__properties__scrollbar-width
:::

## 自定义滚动条的使用范围

有一点需要考虑的，我们的 自定义滚动条，它应该在哪里生效。
是希望所有的 可滚动的元素都应用 自定义滚动条，还是只有特定的元素应用自定义滚动条呢。

### 所有可滚动元素

对于 旧的语法， 想要使所有 可滚动元素都 生效，我们可以直接编写 选择器，而无需将它们附加到元素。

```css
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: darkgrey;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
```

而对于新语法，只需要将它们 应用于 `<html>` 元素即可

```css
html {
  scrollbar-color: #6969dd #e0e0e0;
  scrollbar-width: thin;
}
```

### 特定可滚动元素

对于 旧的语法，想要使特定的 可滚动元素生效，我们在特定元素之后编写 选择器。

```css
.container::-webkit-scrollbar {
  width: 10px;
}

.container::-webkit-scrollbar-track {
  background-color: darkgrey;
}

.container::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
```

对于新语法，也是是相同的。

```css
.container {
  scrollbar-color: #6969dd #e0e0e0;
  scrollbar-width: thin;
}
```

## 设计自定义滚动条

在深入研究 自定义滚动条之前，首先需要了解 默认的滚动条的样式。

默认的滚动条在 不同的操作系统之中是不同的。

在 MacOS Safari 中， Track 两侧都有边框， 背景色为纯色，Thumb 是圆形的，左右两侧都有空间。
:::demo-wrapper
![](/images/scrollbar/use-case-1.jpg)
:::
而在 MacOS Chrome 中，Track 是透明的，`Thumb` 是原型的，而且整个滚动条只在滚动时才显示，且不占据空间。

在 Windows 中，Track 是 灰色背景，Thumb 是 矩形的。
::: demo-wrapper
![](/images/scrollbar/use-case-1-2.jpg)
:::

### 示例1

以下是根据上面的模型，自定义的滚动条
```css
.container::-webkit-scrollbar {
  width: 16px;
}

.container::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.container::-webkit-scrollbar-thumb {
  background-color: #d4aa70;
  border-radius: 100px;
}
```

为 `Track` 和 `Thumb` 添加 `border-radius` 是必要的，因为 `border-radius` 无法在 `::-webkit-scrollbar`
上生效。

:::demo-wrapper
<style scoped>
.container-demo-1 {
  height: 400px;
  overflow-y: auto;
}
.container-demo-1 .content {
  height: 1500px;
}
.container-demo-1::-webkit-scrollbar {
  width: 16px;
}

.container-demo-1::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.container-demo-1::-webkit-scrollbar-thumb {
  background-color: #d4aa70;
  border-radius: 100px;
}
</style>

<div class="container-demo-1"><div class="content"></div></div>
:::

如果是使用的 新的语法，我们不能调整 滚动条的宽度，能做的事情只有设置 `Track` 和 `Thumb` 的颜色：

```css
.container {
  scrollbar-color: #d4aa70 #e4e4e4;
}
```

----

> [!warning]
> 以下示例仅适用于 `webkit` 内核的浏览器。对于实际项目，你还可以同时添加新的语法支持 `Firefox`。

### 示例2：阴影+渐变

在这个示例中，我们给滚动条添加了 阴影 和 渐变。来看看效果如何：
```css
.container::-webkit-scrollbar-thumb {
  background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
  box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  border-radius: 100px;
}
```

:::demo-wrapper
<style scoped>
.container-demo-2 {
  height: 400px;
  overflow-y: auto;
}
.container-demo-2 .content {
  height: 1500px;
}
.container-demo-2::-webkit-scrollbar {
  width: 16px;
}

.container-demo-2::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.container-demo-2::-webkit-scrollbar-thumb {
  background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
  box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  border-radius: 100px;
}
</style>

<div class="container-demo-2"><div class="content"></div></div>
:::

### 示例3: 带边框

我们还可以为 `Track` 和 `Thumb` 添加 边框，这可以帮助我们解决一些棘手的设计。

```css
.container::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: #8070d4;
  border: 6px solid rgba(0, 0, 0, 0.2);
}
```

:::demo-wrapper
<style scoped>
.container-demo-3 {
  height: 400px;
  overflow-y: auto;
}
.container-demo-3 .content {
  height: 1500px;
}
.container-demo-3::-webkit-scrollbar {
  width: 16px;
}

.container-demo-3::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.container-demo-3::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: #8070d4;
  border: 6px solid rgba(0, 0, 0, 0.2);
}
.container-demo-3.border::-webkit-scrollbar-thumb {
  border-left: none;
  border-right: none;
}
</style>

<div class="container-demo-3"><div class="content"></div></div>
:::

基于相同的示例，我们还可以调整 `Thumb` 的 边框，获得一些有趣的效果。

```css
.container::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: #8070d4;
  border: 6px solid rgba(0, 0, 0, 0.2);
  border-left: none;
  border-right: none;
}
```

:::demo-wrapper
<div class="container-demo-3 border"><div class="content"></div></div>
:::

### 示例4：Thumb 带间隔

在此示例中，我们希望 `Thumb` 的四周与 `Track` 都带有一定的间隔。 由于它无法与 滚动条一起使用 `padding`。
因此我们需要使用 `border` 和 `background-clip` 实现效果。

```css
.container::-webkit-scrollbar-thumb {
  border: 5px solid transparent;
  border-radius: 100px;
  background-color: #8070d4;
  background-clip: content-box;
}
```

:::demo-wrapper
<style scoped>
.container-demo-4 {
  height: 400px;
  overflow-y: auto;
}
.container-demo-4 .content {
  height: 1500px;
}
.container-demo-4::-webkit-scrollbar {
  width: 20px;
}

.container-demo-4::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.container-demo-4::-webkit-scrollbar-thumb {
  border: 5px solid transparent;
  border-radius: 100px;
  background-color: #8070d4;
  background-clip: content-box;
}
</style>

<div class="container-demo-4"><div class="content"></div></div>
:::

## 增加 hover 效果

我们可以为 滚动条添加 `hover` 效果吗? 

是的, 可以。我们可以为 新旧的语法添加 `hover` 效果。

```css
/* 旧语法 */
.section::-webkit-scrollbar-thumb:hover {
  background-color: #5749d2;
}

/* 新语法 */
.section {
  scrollbar-color: #d4aa70 #e4e4e4;
  transition: scrollbar-color 0.3s ease-out;
}

.section:hover {
  scrollbar-color: #5749d2;
}
```

同时，在使用新语法上，我们还可以添加 过渡效果，但是在 旧语法 上则不支持。

:::demo-wrapper
<style scoped>
.container-demo-5 {
  height: 400px;
  overflow-y: auto;
}
.container-demo-5 .content {
  height: 1500px;
}
.container-demo-5::-webkit-scrollbar {
  width: 16px;
}

.container-demo-5::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.container-demo-5::-webkit-scrollbar-track:hover {
  background-color: #ccc;
}

.container-demo-5::-webkit-scrollbar-thumb {
  background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
  box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  border-radius: 100px;
}
.container-demo-5::-webkit-scrollbar-thumb:hover {
  background-image: linear-gradient(0deg, #d0368a 0%, #708ad4 99%);
}
</style>

<div class="container-demo-5"><div class="content"></div></div>
:::

## 在需要时显示滚动条

通过向 `overflow` 属性添加值以外的 `visible` 值，可以创建可滚动元素。
建议使用关键字， `auto` 因为它只会在内容超出其容器时显示滚动条。

```css
.container {
  overflow: auto;
}
```
