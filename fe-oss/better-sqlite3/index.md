---
url: /fe-oss/better-sqlite3/index.md
---
## 概述

[**better-sqlite3** 官方文档](https://github.com/WiseLibs/better-sqlite3/blob/HEAD/docs/api.md){.read-more}

\==better-sqlite3== 是 Node.js 中一个高性能、同步操作的 SQLite3 数据库驱动库，
以其卓越的执行效率和简洁的 API 设计成为轻量级应用本地存储的首选

针对 Node.js 中原生 `sqlite3` 库的异步回调复杂性及性能瓶颈，`better-sqlite3` 通过 `C++` 扩展直接调用 `SQLite3 API`，规避了 JavaScript 异步模型带来的上下文切换开销，实现了同步API下的更高并发性能。

### 优势

* **性能**：基准测试显示，其查询速度可达原生 `sqlite3` 的 **11–24 倍**（如单行查询快 11.7 倍，事务写入快 15.6 倍）
* **同步**：同步 API 避免回调地狱，更适合 Koa 等中间件模型，提升代码可读性

## 安装

::: npm-to

```sh
npm install better-sqlite3
```

:::

## 使用

```ts
import db from 'better-sqlite3'

// 建表
db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)`)
// 插入数据
const insert = db.prepare('INSERT INTO users (name) VALUES (?)')
insert.run('Bob')
// 查询
const row = db.prepare('SELECT * FROM users WHERE id = ?').get(1)
console.log(row.name) // 输出: Bob
```

### 预编译语句

```ts
const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
stmt.run('Alice', 'alice@example.com') // 复用编译结果，防 SQL 注入
```

### 事务

```ts
const trans = db.transaction((users) => {
  for (const user of users) {
    db.prepare('INSERT ...').run(user)
  }
})
trans(users) // 自动提交或回滚
```

## 适用场景

* 轻量级应用（Electron 桌面应用、IoT 设备）
* 高读低写业务（如配置管理、日志存储）
* 需加密的本地数据（通过扩展 better-sqlite3-multiple-ciphers 支持 AES 等算法）
