---
url: /fe-oss/keyv/index.md
---
## 概述

\==keyv== 通过存储适配器为多种后端提供了一个统一的键值存储接口。
它支持基于TTL（生存时间）的过期机制，因此非常适合用作缓存或持久化的键值存储系统。

## 安装

::: npm-to

```sh
npm install keyv
```

:::

各种适配器支持：

::: npm-to

```sh
npm install @keyv/redis
npm install @keyv/valkey
npm install @keyv/mongo
npm install @keyv/sqlite
npm install @keyv/postgres
npm install @keyv/mysql
npm install @keyv/etcd
npm install @keyv/memcache
```

:::

## 使用

```ts
import Keyv from 'keyv'

const keyv = new Keyv()
```

```ts
// Redis
import KeyvRedis from '@keyv/redis'
import Keyv from 'keyv'

const keyvRedis = new KeyvRedis('redis://user:pass@localhost:6379')
const keyv = new Keyv({ store: keyvRedis })
```

```ts
// sqlite
import KeyvSqlite from '@keyv/sqlite'
import Keyv from 'keyv'

const keyvSqlite = new KeyvSqlite('sqlite://path/to/database.sqlite')
const keyv = new Keyv({ store: keyvSqlite, ttl: 5000 })
```

### 命名空间隔离

```ts
import KeyvRedis from '@keyv/redis'
import Keyv from 'keyv'

const users = new Keyv(new KeyvRedis('redis://user:pass@localhost:6379'), { namespace: 'users' })
const cache = new Keyv(new KeyvRedis('redis://user:pass@localhost:6379'), { namespace: 'cache' })
```

### Method

```ts
const Keyv = require('keyv')
const keyv = new Keyv() // 默认使用内存存储

// 写入数据（含 TTL）
await keyv.set('config', { theme: 'dark', lang: 'zh' }, 5000)

// 读取数据
const config = await keyv.get('config')
console.log(config) // { theme: 'dark', lang: 'zh' }

// 删除数据
await keyv.delete('config')

// 清空当前命名空间数据
await keyv.clear()
```

## 适用场景

* API 响应缓存

  缓存外部接口，减少重复请求，提升响应速度。

* 会话状态管理（Session）

  结合 Redis 适配器实现多服务实例共享会话数据6。

* 分布式任务队列

  存储任务状态，通过 Redis 保证多节点一致性。

* 配置参数存储

  使用 SQLite 适配器持久化应用配置，支持动态更新。
