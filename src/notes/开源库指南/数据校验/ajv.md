---
title: ajv
createTime: 2024/06/12 22:40:50
permalink: /fe-oss/ajv/
---

<Badge text="NodeJS" /> <Badge text="Browser" />

<RepoCard repo="ajv-validator/ajv" />

## 概述

[**Ajv** 官方文档](https://ajv.js.org){.read-more}

==Ajv（Another JSON Schema Validator）== 是一个高性能的 Node.js JSON Schema 验证库，支持 **JSON Schema 草案（Draft-06/07/2019-09）** 和 **JSON Type Definition（JTD）**。
它以编译模式将 Schema 转换为高效的 JavaScript 验证函数，显著提升验证速度。

## 安装

::: npm-to

```sh
npm install ajv ajv-formats ajv-i18n  # 核心库及常用插件
```

:::

## 使用

### 基础验证

```ts
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true }) // 返回所有错误
ajv.addFormat('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/) // 自定义格式

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    age: { type: 'integer', minimum: 18 },
    email: { type: 'string', format: 'email' }
  },
  required: ['name', 'age']
}
const data = { name: 'Alice', age: 20, email: 'alice@example.com' }
const valid = ajv.validate(schema, data)
if (!valid)
  console.log(ajv.errors)
```

### 扩展验证

```ts
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
// 添加内置格式验证
addFormats(ajv)

// 自定义格式验证
ajv.addFormat('identifier', /^a-z\$_[a-zA-Z$_0-9]*$/)
```

### 预编译

```ts
import fs from 'node:fs'
import path from 'node:path'
import Ajv from 'ajv'
import standaloneCode from 'ajv/dist/standalone'

const schemaFoo = {
  $id: '#/definitions/Foo',
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    foo: { $ref: '#/definitions/Bar' }
  }
}
const schemaBar = {
  $id: '#/definitions/Bar',
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    bar: { type: 'string' },
  },
  required: ['bar']
}

// For ESM, the export name needs to be a valid export name, it can not be `export const #/definitions/Foo = ...;` so we
// need to provide a mapping between a valid name and the $id field. Below will generate
// `export const Foo = ...;export const Bar = ...;`
// This mapping would not have been needed if the `$ids` was just `Bar` and `Foo` instead of `#/definitions/Foo`
// and `#/definitions/Bar` respectfully
const ajv = new Ajv({ schemas: [schemaFoo, schemaBar], code: { source: true, esm: true } })
let moduleCode = standaloneCode(ajv, {
  Foo: '#/definitions/Foo',
  Bar: '#/definitions/Bar'
})

// Now you can write the module code to file
fs.writeFileSync(path.join(__dirname, './validate-esm.mjs'), moduleCode)
```

```ts
import { Bar, Foo } from './validate-esm.mjs'

const fooPass = {
  foo: {
    bar: 'something'
  }
}

const fooFail = {
  foo: {
    // bar: "something" // bar: "something" <= empty properties
  }
}

let validateFoo = Foo
if (!validateFoo(fooPass))
  console.log('ERRORS 1:', validateFoo.errors) // Never reaches here because valid

if (!validateFoo(fooFail))
  console.log('ERRORS 2:', validateFoo.errors) // Errors array gets logged
```

## 使用场景

- API 请求验证

  在 Koa/Express 中间件中校验请求体：

  ```ts
  app.post('/user', (ctx) => {
    if (!validate(ctx.request.body))
      ctx.throw(400, { errors: validate.errors })
  })
  ```

- 配置文件校验

  确保 JSON/YAML 配置文件符合预期结构。

- 表单数据处理

  结合前端框架验证表单字段（需配合浏览器打包）。
