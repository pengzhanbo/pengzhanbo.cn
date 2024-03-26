---
title: v-model
createTime: 2022/04/23 11:00:21
author: pengzhanbo
permalink: /interview-question/3y2a3ptn/
---

[![vue@3](https://img.shields.io/badge/vue-%403-brightgreen)](https://staging-cn.vuejs.org/)

::: tip 提问
v-model 的原理
:::

## v-model

`v-model` 本质是一个语法糖，可以看成是 input + value 的语法糖。

可以通过 model属性的 prop 和 event 属性来进行自定义。

默认的 `v-model` ，会根据标签的不同生成不同的事件和和属性。

- `input[type="text"]` 和 `textarea` 元素 使用 value 属性 和 input 事件
- `checkbox` 和 `radio` 元素 使用 check 属性 和 change 事件
- `select` 元素 使用 value 属性 和 change 事件

```vue
<template>
  <input type="text" v-model="value" />
</template>
<!-- 等价于 -->
<template>
  <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
}
</script>
```
