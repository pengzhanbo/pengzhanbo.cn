---
title: validator
createTime: 2024/06/10 22:40:37
permalink: /fe-oss/validator/
---

<Badge text="NodeJS" /> <Badge text="Browser" />

<RepoCard repo="validatorjs/validator.js" />

## 概述

[**validator** 官方文档](https://github.com/validatorjs/validator.js){.read-more}

`validator` 是一个功能强大的 JavaScript 字符串验证库和过滤工具，专为 Node.js 和浏览器环境设计。
它提供了超过 100 种验证器和清理器（sanitizers），用于处理表单数据、API输入等字符串验证场景。

::: important 此库仅验证并清理字符串。
:::

## 安装

::: npm-to

```sh
npm install validator
```

:::

## 使用

```ts
import { isEmail, /* ... */ } from 'validator'
```

### 基础示例

```ts
// 验证邮箱
isEmail('test@example.com') // true

// 清理邮箱格式
normalizeEmail('TEST@GMAIL.COM') // 输出：'test@gmail.com'
```

## 表单验证

```ts
function validateUser(data) {
  const errors = []
  if (isEmpty(data.username))
    errors.push('用户名不能为空')
  if (!isEmail(data.email))
    errors.push('邮箱无效')
  return errors.length ? { errors } : data
}
```

## 使用场景

- **后端验证**：在 Node.js 中校验API请求参数。
- **前端表单**：结合 React/Vue 实时验证用户输入。
- **数据清洗**：过滤用户输入的 XSS 风险字符（如 `escape()`）。
- **自动化测试**：验证数据格式是否符合预期。
