---
url: /fe-oss/pino/index.md
---
&#x20;

## 概述

非常低开销的 Node.js 日志库。

[**pino** 官方文档](https://getpino.io/#/){.read-more}

## 使用场景

如果你正在进行、或有如下的需求的：

* 正在开发 Node.js 服务，比如 基于 `fastify` / `express` / `koa` 等框架。
* 需要在 Node.js 服务中进行日志记录，对输出格式有要求。
* 需要将日志输出到文件，或者输出到其他的远程日志服务中。
* 对日志输出有非常高的性能要求。
* 需要根据不同的模块区分日志，或者进行不同的日志级别的控制。

## 安装

:::npm-to

```sh
npm install pino
```

:::

## 使用

### 基础使用

```ts
import pino from 'pino'

const logger = pino()

logger.info('Hello, world!')
```

```console title="日志输出"
{"level":30,"time":1720260263252,"pid":76688,"hostname":"username-xxx.local","message":"Hello, world!"}
```

### 子模块日志

```ts
import pino from 'pino'

const logger = pino()

const childLogger = logger.child({ module: 'auth' })

childLogger.info('Hello, world!')
```

```console title="日志输出"
{"level":30,"time":1720260347150,"pid":76859,"hostname":"username-xxx.local","module":"auth","msg":"Hello, world!"}
```

### 输出到文件

```ts
// destination param may be in first position when no options:
const fileLogger = require('pino')(pino.destination('/log/path'))

// use the stderr file handle to log to stderr:
const opts = { name: 'my-logger' }
const stderrLogger = require('pino')(opts, pino.destination(2))

// automatic wrapping in pino.destination
const fileLogger = require('pino')('/log/path')

// Asynchronous logging
const fileLogger = pino(pino.destination({ dest: '/log/path', sync: false }))
```

## 美化输出

::: warning 建议只在开发模式下使用
:::

:::npm-to

```sh
npm install pino-pretty
```

:::

```ts
import pino from 'pino'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

logger.info('Hello, world!')
```

```console title="日志输出"
[22:33:41.351] INFO (77187): Hello World
```

## 框架集成

### fastify

Fastify 默认集成了Pino日志工具，只需将 Fastify 的 `logger` 选项设为 `true` ，
并通过 `request.log` 或 `reply.log` 记录与每个请求对应的日志信息：

```ts
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
  request.log.info('something')
  return { hello: 'world' }
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

### express

:::npm-to

```sh
npm install pino-http
```

:::

```ts
const app = require('express')()
const pino = require('pino-http')()

app.use(pino)

app.get('/', (req, res) => {
  req.log.info('something')
  res.send('hello world')
})

app.listen(3000)
```

### koa

:::npm-to

```sh
npm install koa-pino-logger
```

:::

```ts
const Koa = require('koa')
const app = new Koa()
const pino = require('koa-pino-logger')()

app.use(pino)

app.use((ctx) => {
  ctx.log.info('something else')
  ctx.body = 'hello world'
})

app.listen(3000)
```

### h3

:::npm-to

```sh
npm install pino-http
```

:::

```ts
import { createApp, createRouter, eventHandler, fromNodeMiddleware } from 'h3'
import pino from 'pino-http'

export const app = createApp()

const router = createRouter()
app.use(router)
app.use(fromNodeMiddleware(pino()))

app.use(eventHandler((event) => {
  event.node.req.log.info('something')
  return 'hello world'
}))

router.get(
  '/',
  eventHandler((event) => {
    return { path: event.path, message: 'Hello World!' }
  }),
)
```

### Nestjs

:::npm-to

```sh
npm install nestjs-pino
```

:::

```ts
import { Controller, Get, Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Logger, LoggerModule } from 'nestjs-pino'

@Controller()
export class AppController {
  constructor(private readonly logger: Logger) {}

  @Get()
  getHello() {
    this.logger.log('something')
    return `Hello world`
  }
}

@Module({
  controllers: [AppController],
  imports: [LoggerModule.forRoot()]
})
class MyModule {}

async function bootstrap() {
  const app = await NestFactory.create(MyModule)
  await app.listen(3000)
}
bootstrap()
```
