---
url: /interview-question/6tzvt9fs/index.md
---
::: tip 提问

1. IFC
2. GFC
3. FFC

:::

::: details 不用看
很少会在面试中问这几个问题就是了。大多数时候 BFC 才是关注点。
这几个有了解就行，实际情况存在感挺低的...
:::

## IFC

`IFC` 即 `(Inline Formatting Context)` 内联格式上下文。

* 行级上下文内部的盒子会在水平方向，一个接一个地放置。
* 当一行不够的时候会自动切换到下一行。
* 行级上下文的高度由内部最高的内联盒子的高度决定。

## GFC

`GFC` 即 `(GrideLayout Formatting Context)` 网格布局格式上下文

* `display` 属性声明为 `gird` 的元素会获得一个独立的渲染区域。
* 元素内的子元素会以网格的形式进行布局，元素称为 网格容器。

## FFC

`FFC` 即 `(Flex Formatting Context)` 弹性格式上下文

* `display` 属性声明为 `flex` 的元素会获得一个弹性盒子。
* 盒子内的子元素称为项目
* 项目以一条主轴方向进行排列
* 每个项目都可根据规则进行弹性缩放。
