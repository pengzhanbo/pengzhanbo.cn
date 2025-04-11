---
title: git emoji
icon: twemoji:airplane
createTime: 2025/04/09 10:54:23
permalink: /memorandum/git/emoji/
---

## 概述

在 git 提交信息中受支持的 emoji 。

## 使用

__输入：__

```sh
git commit -m "feat: :rocket: add new feature"
```

__输出：__

```txt
feat: 🚀 add new feature
```

## emoji 列表

:::important 数据源 [gitmoji](https://github.com/carloscuesta/gitmoji)
:::

<script setup>
import Gitmoji from '~theme/components/Gitmoji.vue'
</script>

<Gitmoji />
