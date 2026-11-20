---
url: /fe-oss/lowdb/index.md
---
&#x20;&#x20;

## 概述

lowdb 是一个轻量级的本地 JSON 数据库。

利用 JSON 文件作为持久化存储介质，通过 JavaScript 原生 API 操作数据，无需依赖外部数据库服务。

## 安装

::: npm-to

```sh
npm install lowdb
```

:::

## 使用

```ts
import { JSONFilePreset } from 'lowdb/node'

// 读取或创建 db.json
const defaultData = { posts: [] }
const db = await JSONFilePreset('db.json', defaultData)

// 更新 db.json
await db.update(({ posts }) => posts.push('hello world'))

// 也可以稍后显式调用 db.write()
// 将数据写入 db.json
db.data.posts.push('hello world')
await db.write()
```

### Lodash

通过 `Lodash` 实现链式调用

```ts
import lodash from 'lodash'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

interface Post {
  id: number
  title: string
}

interface Data {
  posts: Post[]
}

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

const defaultData: Data = {
  posts: [],
}
const adapter = new JSONFile<Data>('db.json', defaultData)

const db = new LowWithLodash(adapter)
await db.read()

// 使用 db.chain 而非 db.data 来访问 lodash API
const post = db.chain.get('posts').find({ id: 1 }).value() // 重要提示：必须调用value()以执行链式操作
```

## 适用场景

* **小型工具/CLI**：配置文件、临时数据存储
* **Electron 桌面应用**：本地数据持久化（如用户设置）

## 缺点

* **性能瓶颈**：数据量 >10MB 时，全量读写导致延迟显著上升。
* **并发能力弱**：无锁机制，不适用高并发场景。
* **功能简化**：缺乏事务、索引、关联查询等高级数据库特性。
