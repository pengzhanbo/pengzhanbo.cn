---
title: Scroll Gutter
author: 鹏展博
createTime: 2023/08/08 21:58:55
permalink: /defensive-css/scroll-gutter/
---

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const toggle = () => {
  show.value = !show.value
}

const show2 = ref(false)
const toggle2 = () => {
  show2.value = !show2.value
}
</script>

## Scroll Gutter

与滚动相关的另一件事是滚动条装订线。
以前面的 [例子](/defensive-css/scroll-chaining/) 为例，当内容变长时，添加滚动条将导致布局偏移。
发生布局偏移的原因是为滚动条保留空间。

<style>
.body-scroll-120 {
  width: 168px;
  height: 270px;
  margin: 0 auto;
  overflow-y: auto;
  background: var(--vp-c-bg);
  border-radius: 5px;
  border: solid 1px var(--vp-c-divider);
  padding: 10px;
  box-shadow: var(--vp-shadow-2);
}
.body-scroll-120::-webkit-scrollbar {
  width: 7px;
}
.body-scroll-120::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-gray-1);
}
.body-scroll-120::-webkit-scrollbar-track {
  background-color: var(--vp-c-gray-soft);
}

.body-scroll-120.stable {
  scrollbar-gutter: stable;
  padding-right: 8px;
}

.body-scroll-120 p {
  margin: 8px 0;
}

.body-scroll-120 p:nth-child(n+3) {
  display: none;
}
.body-scroll-120.show p:nth-child(n+3) {
  display: block;
}
.add-btn-120 {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  padding: 0 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>

:::demo-wrapper
<button type="button" class="add-btn-120" @click="toggle">
{{ show ? '重置内容' : '添加内容' }}
</button>

<div class="body-scroll-120" :class="{ show }">
  <p>關關雎鳩，在河之洲。<br/>窈窕淑女，君子好逑。</p>
  <p>參差荇菜，左右流之。<br/>窈窕淑女，寤寐求之。</p>
  <p>求之不得，寤寐思服。<br/>悠哉悠哉，輾轉反側。</p>
  <p>參差荇菜，左右采之。<br/>窈窕淑女，琴瑟友之。</p>
  <p>參差荇菜，左右芼之。<br/>窈窕淑女，鍾鼓樂之。</p>
</div>
:::

请注意，当内容因显示滚动条而变长时，内容是如何移动的。
我们可以通过使用属性 `scrollbar-gutter` 来避免这种行为。

```css
.body {
  scrollbar-gutter: stable;
}
```

:::demo-wrapper
<button type="button" class="add-btn-120" @click="toggle2">
{{ show2 ? '重置内容' : '添加内容' }}
</button>

<div class="body-scroll-120 stable" :class="{ show: show2 }">
  <p>關關雎鳩，在河之洲。<br/>窈窕淑女，君子好逑。</p>
  <p>參差荇菜，左右流之。<br/>窈窕淑女，寤寐求之。</p>
  <p>求之不得，寤寐思服。<br/>悠哉悠哉，輾轉反側。</p>
  <p>參差荇菜，左右采之。<br/>窈窕淑女，琴瑟友之。</p>
  <p>參差荇菜，左右芼之。<br/>窈窕淑女，鍾鼓樂之。</p>
</div>
:::

`scrollbar-gutter: stable` 将会预先为 滚动条保留空间。
因此，在计算 内填充 `padding` 时，应考虑滚动条的宽度，从而适配 UI 效果。
