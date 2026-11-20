---
url: /fe-oss/dotenv/index.md
---
## 概述

\==dotenv== 是 Node.js 生态中广泛使用的环境变量管理工具，旨在通过 .env 文件安全、灵活地管理配置信息。

## 安装

::: npm-to

```sh
npm install dotenv
```

:::

## 使用

`dotenv` 读取项目根目录下的 `.env` 文件，并将其加载到 `process.env` 对象中。

```sh title=".env"
API_KEY=abcdefg
DB_HOST=localhost
```

在代码中调用：

```ts title="index.ts"
import dotenv from 'dotenv'

dotenv.config()
```

### 自定义路径

```ts title="index.ts"
import dotenv from 'dotenv'

dotenv.config({ path: '.env.production' })
```

### 加载多个文件

```ts title="index.ts"
import dotenv from 'dotenv'

// 加载 .env.local 和 .env
// 默认优先加载 `.env.local` 中的值，`.env` 中的同名变量不会生效
// 此时的优先级顺序是数组从左到右
dotenv.config({ path: ['.env.local', '.env'] })

// 设置 `override` 为 `true` 时，会覆盖已存在的环境变量
// 此时的优先级顺序是数组从右到左
dotenv.config({ path: ['.env.local', '.env'], override: true })
```

## 最佳实践

* 使用 `.env.local` 存储本地配置，并将其添加到 `.gitignore` 中
* 根据不同的环境加载不同的配置文件 `.env.development` / `.env.production` 等，根据情况决定是否添加至 `.gitignore`

```ts
import dotenv from 'dotenv'

dotenv.config({ path: ['.env.local', `.env.${process.env.NODE_ENV}`] })
```
