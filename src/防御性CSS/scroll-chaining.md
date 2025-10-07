---
title: Scroll Chaining
createTime: 2023/08/08 20:59:44
permalink: /defensive-css/scroll-chaining/
---

## Scroll Chaining

我们可能会经常遇到， 当我们打开一个 modal 框并开始滚动，并滚动到底后继续滚动时，
modal 框的外部容器 `body` 元素还会继续滚动。

这被称之为 **滚动关联(scroll chaining)** 。

<style>
.body-scroll-110 {
  overflow-y: scroll;
  height: 260px;
  background: var(--vp-c-bg);
  padding: 20px;
}
.body-scroll-110 .modal {
  overflow-y: scroll;
  height: 150px;
  width: 200px;
  border-radius: 5px;
  margin: 0 auto 20px;
  padding: 10px;
  border: solid 1px var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
}
.body-scroll-110 .modal.overscroll {
  overscroll-behavior-y: contain;
}
</style>

:::demo-wrapper no-padding

<div class="body-scroll-110">
  <div class="modal">
    <p>關關雎鳩，在河之洲。<br/>窈窕淑女，君子好逑。</p>
    <p>參差荇菜，左右流之。<br/>窈窕淑女，寤寐求之。</p>
    <p>求之不得，寤寐思服。<br/>悠哉悠哉，輾轉反側。</p>
    <p>參差荇菜，左右采之。<br/>窈窕淑女，琴瑟友之。</p>
    <p>參差荇菜，左右芼之。<br/>窈窕淑女，鍾鼓樂之。</p>
  </div>
  <p>《诗经》，是中国古代诗歌的开端，最早的一部诗歌总集，收集了西周初年至春秋中叶（前11世纪至前6世纪）的诗歌，共311篇，其中6篇为笙诗，即只有标题，没有内容，称为笙诗六篇（《南陔》《白华》《华黍》《由庚》《崇丘》《由仪》），反映了周初至周晚期约五百年间的社会面貌。</p>
</div>
:::

在过去，我们需要一些技术方案（如，使用JavaScript事件）来解决这个问题。
但是现在，我们可以直接使用 CSS 属性 `overscroll-behavior` 来解决这个问题。

```css
.modal {
  overscroll-behavior-y: contain; /* [!code highlight] */
  overflow-y: auto;
}
```

:::demo-wrapper no-padding

<div class="body-scroll-110">
  <div class="modal overscroll">
    <p>關關雎鳩，在河之洲。<br/>窈窕淑女，君子好逑。</p>
    <p>參差荇菜，左右流之。<br/>窈窕淑女，寤寐求之。</p>
    <p>求之不得，寤寐思服。<br/>悠哉悠哉，輾轉反側。</p>
    <p>參差荇菜，左右采之。<br/>窈窕淑女，琴瑟友之。</p>
    <p>參差荇菜，左右芼之。<br/>窈窕淑女，鍾鼓樂之。</p>
  </div>
  <p>《诗经》，是中国古代诗歌的开端，最早的一部诗歌总集，收集了西周初年至春秋中叶（前11世纪至前6世纪）的诗歌，共311篇，其中6篇为笙诗，即只有标题，没有内容，称为笙诗六篇（《南陔》《白华》《华黍》《由庚》《崇丘》《由仪》），反映了周初至周晚期约五百年间的社会面貌。</p>
</div>
:::
