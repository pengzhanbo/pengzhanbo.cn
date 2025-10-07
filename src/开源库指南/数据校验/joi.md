---
title: joi
createTime: 2024/06/15 22:40:56
permalink: /fe-oss/joi/
---

<Badge text="NodeJS" /> <Badge text="Browser" />

<RepoCard repo="hapijs/joi" />

## 概述

[**Joi** 官方文档](https://joi.dev){.read-more}

==Joi== 由 **Hapi.js** 团队开发，是一个强大的 JavaScript 数据验证库，专注于为 Node.js 和浏览器环境提供声明式的对象模式描述与验证能力。

## 特性

- 声明式 Schema 定义

  Joi 通过链式 API 定义数据模式（Schema），以简洁的语法描述数据结构与规则。例如：

  ```ts
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    birthdate: Joi.date().min('1900-01-01').max('now'),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required()
    })
  })
  ```

  - **类型支持**：覆盖 `string`, `number`, `boolean`, `date`, `array`, `object`, `binary` 等基础与复合类型
  - **链式规则**：如 `.min()`, `.max()`, `.regex()`, `.email()`, `.required()` 等，可组合使用

- 嵌套结构与复杂验证

  - 支持多级对象嵌套（如 `address.city`）
  - 条件验证：通过 `Joi.when()` 实现动态规则（如当性别为男性时要求填写 `maleSpecificField`）

    ```ts
    const schema = Joi.object({
      sex: Joi.number().valid(0, 1),
      name2: Joi.when('sex', { is: 1, then: Joi.string().required() })
    })
    ```

- 字段依赖与互斥

  - `.with('fieldA', 'fieldB')`：若 `fieldA` 存在，则 `fieldB` 必填。
  - `.without('fieldA', 'fieldB')`：`fieldA` 和 `fieldB` 不能同时存在

- 数据清洗与转换

  - 自动格式化数据（如字符串转日期、数字转字符串）
  - 移除非法字段（`strip()`）或设置默认值（`.default('value')`）

- 错误处理

  - 返回详细错误信息（包括错误字段、类型及原因），支持自定义错误消息（`.error(new Error('自定义消息'))`）
  - 控制错误报告策略：`abortEarly: false` 可收集所有错误而非在首次失败时终止

## 安装

::: npm-to

```sh
npm install joi
```

:::

## 使用

```ts
import joi from 'joi'

// 定义 Schema
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  age: Joi.number().integer().min(18).default(20),
  hobbies: Joi.array().items(Joi.string()).min(1)
})

// 验证数据
const data = { username: 'Tom', age: 25 }
const { error, value } = schema.validate(data, { abortEarly: false })

if (error) {
  console.error(error.details) // 输出所有错误详情
}
else {
  console.log(value) // 输出清洗后数据（包含默认值）
}
```

## 使用场景

- API 请求验证
- 配置文件校验
- 表单与用户输入
- 数据库模型验证
