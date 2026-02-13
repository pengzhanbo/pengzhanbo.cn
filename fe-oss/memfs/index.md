---
url: /fe-oss/memfs/index.md
---
&#x20;

## 概述

`memfs` 是一个在 Node.js 和浏览器环境中模拟内存文件系统的开源库，它完整实现了 Node.js 原生 fs 模块的 API，但所有操作均在内存中完成，无需物理磁盘交互。

## 特性

1. **完整文件系统模拟**
   * 支持基础操作：文件/目录的创建（`writeFileSync`）、读取（`readFileSync`）、删除（`unlink`）、重命名（`rename`）等。
   * 路径兼容性：无缝处理 Windows 和 Unix 风格的路径格式（如 `/data/file.txt` 或 `C:\data\file.txt`）。
   * 数据存储机制：使用 JavaScript 对象树结构管理文件数据，响应速度极快，但需注意内存占用量。

2. **Node.js API 兼容性**
   * 与 `fs` 模块接口一致，可直接替换现有代码中的文件操作模块，无需重写逻辑。
   * 同时提供同步（如 `writeFileSync`）和异步（如 `fs.promises.writeFile`）方法。

3. **跨环境支持**
   * **Node.js 环境**：通过 npm 安装即可使用。
   * **浏览器环境**：支持 Origin Private File System (OPFS)，允许在浏览器中操作“虚拟文件”，并可持久化到本地存储。

4. **高级扩展能力**
   * **unionfs**：合并多个文件系统实例（如 memfs + 物理磁盘），构建分层存储结构。
   * **crudfs/casfs**：实现 CRUD 风格抽象和内容寻址存储，适合版本控制、增量备份等场景。

## 安装

::: npm-to

```sh
npm install memfs
```

:::

## 使用

```ts
const { fs, vol } = require('memfs')

// 写入文件
fs.writeFileSync('/demo.txt', 'Hello memfs!')

// 读取文件
console.log(fs.readFileSync('/demo.txt', 'utf8')) // 输出: Hello memfs!

// 初始化预置文件结构
vol.fromJSON({
  '/config/settings.json': '{"theme": "dark"}',
  '/data/logs.txt': 'Log entry...'
}, '/virtual-root')
```

## 应用场景

1. **单元测试（避免污染真实磁盘）**

   ```ts
   import { fs, vol } from 'memfs'

   vol.fromJSON({ '/test/file.txt': 'mock data' })

   // 测试函数：检查文件是否存在
   test('check file existence', () => {
     expect(fs.existsSync('/test/file.txt')).toBe(true)
   })
   vol.reset() // 清理状态
   ```

2. **前端工具链优化**
   * 用于 Webpack 等构建工具，将编译产物暂存内存，避免磁盘 I/O 瓶颈，提速构建过程。

3. **临时数据沙盒**

   ```ts
   // 安全处理用户上传的临时文件
   fs.writeFileSync('/tmp/user-upload.jpg', buffer)
   processImage('/tmp/user-upload.jpg')
   // 进程退出后自动清除，无残留
   ```

## 生态系统与集成

1. **与测试框架结合**

   * **Jest/Vitest**：通过 `vi.mock` 替换 `fs` 模块，精准控制测试环境：

     ```ts
     vi.mock('fs', () => ({ default: memfs.fs }))
     vi.mock('fs/promises', () => memfs.fs.promises)
     ```

2. **扩展工具链**
   * **unionfs**：合并物理磁盘与内存文件系统，实现混合存储策略。
   * **fs-monkey**：动态劫持 Node.js 原生 `fs` 调用，重定向到 memfs（慎用于生产环境）。

## 注意事项

1. **内存管理**
   * 避免操作超大文件（如 GB 级），防止内存溢出（OOM）。
   * 使用 `vol.reset()` 及时清理测试残留数据。

2. **测试覆盖率提升技巧**

   * 使用 `vol.toJSON()` 导出内存文件结构，验证复杂操作结果：

     ```js
     expect(vol.toJSON()).toEqual({ '/result.json': '{"status": "success"}' })
     ```

3. **生产环境适用性**
   * 适用于**短期数据处理**（如请求级临时文件），但**不可替代持久化存储**。
