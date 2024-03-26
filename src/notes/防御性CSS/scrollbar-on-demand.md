---
title: Scrollbar On Demand
author: 鹏展博
createTime: 2023/08/08 22:54:46
permalink: /defensive-css/scrollbar-on-demand/
---

## Scrollbar On Demand

按需使用滚动条。当下，我们可以控制是否显示滚动条，或者仅在内容较长的时候显示滚动条。
但强烈建议在不确定内容的情况下使用 `auto` 作为 `overflow` 属性值。

<style>
.body-wrapper-112 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
}
.body-scroll-112 {
  width: 190px;
  height: 270px;
  margin: 0 auto;
  overflow-y: auto;
  background: var(--vp-c-bg);
  border-radius: 5px;
  border: solid 1px var(--vp-c-divider);
  padding: 10px;
  box-shadow: var(--vp-shadow-2);
  overflow-y: scroll;
}
.body-scroll-112.auto {
  overflow-y: auto;
}
.body-scroll-112::-webkit-scrollbar {
  width: 7px;
}
.body-scroll-112::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-gray-1);
}
.body-scroll-112::-webkit-scrollbar-track {
  background-color: var(--vp-c-gray-soft);
}
.body-scroll-112 p {
  margin: 8px 0;
}
</style>

:::demo-wrapper

<p align="center">overflow-y: scroll</p>

<div class="body-wrapper-112">
<div class="body-scroll-112" :class="{ show }">
  <p>關關雎鳩，在河之洲。<br/>窈窕淑女，君子好逑。</p>
  <p>參差荇菜，左右流之。<br/>窈窕淑女，寤寐求之。</p>
</div>
<div class="body-scroll-112" :class="{ show }">
  <p>關關雎鳩，在河之洲。<br/>窈窕淑女，君子好逑。</p>
  <p>參差荇菜，左右流之。<br/>窈窕淑女，寤寐求之。</p>
  <p>求之不得，寤寐思服。<br/>悠哉悠哉，輾轉反側。</p>
  <p>參差荇菜，左右采之。<br/>窈窕淑女，琴瑟友之。</p>
  <p>參差荇菜，左右芼之。<br/>窈窕淑女，鍾鼓樂之。</p>
</div>
</div>
:::

可以看到，即使内容很短，也能看到 滚动条，这对 UI 而言很不利。
在不需要 滚动条的时候看到滚动条是一件令人不快的事情。

使用 `overflow-y: auto` 时，滚动条只有在内容较长时才可见。
这是更好的 视觉交互体验。

:::demo-wrapper

<p align="center">overflow-y: auto</p>

<div class="body-wrapper-112">
<div class="body-scroll-112 auto" :class="{ show }">
  <p>關關雎鳩，在河之洲。<br/>窈窕淑女，君子好逑。</p>
  <p>參差荇菜，左右流之。<br/>窈窕淑女，寤寐求之。</p>
</div>
<div class="body-scroll-112 auto" :class="{ show }">
  <p>關關雎鳩，在河之洲。<br/>窈窕淑女，君子好逑。</p>
  <p>參差荇菜，左右流之。<br/>窈窕淑女，寤寐求之。</p>
  <p>求之不得，寤寐思服。<br/>悠哉悠哉，輾轉反側。</p>
  <p>參差荇菜，左右采之。<br/>窈窕淑女，琴瑟友之。</p>
  <p>參差荇菜，左右芼之。<br/>窈窕淑女，鍾鼓樂之。</p>
</div>
</div>
:::
