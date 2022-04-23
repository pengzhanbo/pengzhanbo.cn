---
title: v-if和v-for优先级
createTime: 2022/04/23 01:58:57
author: pengzhanbo
permalink: /note/interview-question/w6mai9ic/
---

:::  tip 提问
1. `v-if` 和 `v-for` 哪个优先级高？
2. 当需要同时使用时，该如何进行优化？
:::

## 优先级

- 当两个指令位于同一个DOM时，`v-for` 的优先级总是 高于 `v-if`。

## 优化

同时使用时，由于优先级的原因， 每次渲染总会先执行循环再执行 `v-if`, 无论如何，循环都不可避免。
对于这类情况：

- 如果是需要控制 由 `v-for` 执行生成元素列表的判断，可在 `v-for` 的外层嵌套一个 `template` 标签，
  在 `template` 标签上进行 `v-if`的判断

- 如果是需要控制 由 `v-for` 执行生成的元素列表的特定子项的判断，可以先使用 计算属性提前过滤 不需要的 项。
