---
title: Flex弹性布局
createTime: 2022/04/17 06:57:51
author: pengzhanbo
permalink: /note/interview-question/w4yx9kq0/
---

::: tip 提问
描述一下 Flex box
:::

## Flex Box

Flex Box 即 弹性盒布局模型。

任何一个容器都可以指定为Flex布局。

采用Flex布局的元素，称为Flex容器，简称容器。它的所有子元素自动成为容器成员。

在容器上，可以设置以下属性：

- `flex-direction`: 主轴的方向， 默认值是 row
- `flex-wrap` : 一条轴线排不下时，如何换行，默认值是 nowrap
- `flex-flow` : flex-direction 和 flex-wrap 的简写形式，默认值是 row nowrap
- `justify-content` 定义容器成员在主轴上的对齐方式
- `align-items` 定义项目成员在交叉轴上的对齐方式
- `align-content` 定义多跟轴线的对齐方式，如果容器成员只有一根轴线，该属性不起作用

在项目成员上，可以设置以下属性：

- `order` 定义成员的排列顺序。数值越小，排列越靠前，默认为 0
- `flex-grow` 定义成员的放大比例，默认为 0
- `flex-shrink` 定义成员的缩小比例，默认为 1
- `flex-basis` 定义在分配多余空间之前，成员占据的主轴空间，默认为 auto
- `flex` flex-grow, flex-shrink , flex-basis 的简写，默认为 0 1 auto
- `align-self` 定义单个成员的对齐方式

## 总结

flex布局是css3新增的布局方式，可以通过将一个元素的display属性声明为 flex 从而使元素成为 flex容器。

一个容器默认有两条轴，一个是水平的主轴，一个是与主轴垂直的交叉轴，可以声明主轴的方向、定义容器成员的主轴上的对齐方式，
交叉轴的对齐方式、换行方式等。对容器成员，可以定义排列顺序、空间利用方式、对齐方式等。
