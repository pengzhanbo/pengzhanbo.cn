---
title: 从 tsup 到 tsdown
createTime: 2025/06/02 15:58:36
permalink: /article/675ocjcc/
---

## 前言

最近，==VoidZero== 推出了一个 基于 [rolldown](https://rolldown.rs/) 的全新的构建工具 [tsdown](https://tsdown.dev/)。
本着尝鲜的态度，我把我在开发维护中的一部分开源项目，将构建工具从 [tsup](https://tsup.egoist.dev/) 切换到 [tsdown](https://tsdown.dev/)。

<!-- more -->

<CardGrid>
  <RepoCard repo="pengzhanbo/vite-plugin-mock-dev-server" />
  <RepoCard repo="pengzhanbo/vuepress-theme-plume" />
</CardGrid>

## 迁移过程

### 自动迁移

`tsdown` 提供了迁移脚本，可以直接运行以下命令完成迁移:

:::npm-to

```sh
npx tsdown migrate
```

:::

### 手动迁移

::::steps

- 卸载 tsup，安装 tsdown

  ::: npm-to

  ```sh
  npm uninstall -D tsup
  npm install -D tsdown
  ```

  :::

- 重命名 `tsup.config.{js,ts}` 为 `tsdown.config.{js.ts}`

- 修改 `tsdown.config.{js,ts}` 文件，将 `tsup` 的配置替换为 `tsdown` 的配置

  ```ts title="tsdown.config.ts"
  import { defineConfig } from 'tsdown' // [!code ++]
  import { defineConfig } from 'tsup' // [!code --]

  export default defineConfig({
    entry: 'src/index.ts',
    shims: true,
    dts: true,
    format: ['esm', 'cjs'],
  })
  ```

- 修改 `package.json` 中的 `scripts` 字段

  ```json title="package.json"
  {
    "scripts": {
      // "build": "tsup", // [!code --]
      "build": "tsdown" // [!code ++]
    }
  }
  ```

- 完成

::::

迁移过程很简单，`tsdown` 几乎完全兼容 `tsup` 的所有配置项。

完成以上步骤后就可以直接运行 `build` 命令检查构建结果了。

## 收益

以 [pengzhanbo/vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume) 为例，
在迁移前，使用 `tsup` 进行构建的时间开销大约在 **7s** 左右，而使用 `tsdown` 进行构建，时间开销缩短到了
**0.3s** ！！！ 这收益无疑是巨大的！

### 为什么快这么多？

事实上锅并不在于 tsup，而是在于 `typescript` 的 `slow types` 的存在。最主要的时间开销是在构建 `dts` 时。
由于 `slow types` 的存在，`typescript` 需要进行大量的类型推断才能确定导出的类型，这导致了构建 `dts` 的时间开销大大增加。

实际上我在做这次迁移时，我在 `tsconfig.json` 中新增了一项配置：`isolatedDeclarations: true`，这项配置要求我们
对于代码中的每一个 `export` ，都需要进行显式的类型声明：

```ts
export const foo = 1 // ❌ Bad
export const foo: number = 1 // ✅ Good

export function foo(a: number, b: number) { // ❌ Bad
  return a + b
}

export function foo(a: number, b: number): number { // ✅ Good
  return a + b
}
```

当每一个 `export` 都有明确的类型声明时，`typescript` 就可以在构建 `dts` 时快速的完成类型推断，从而大大缩短了构建 `dts` 的时间开销。

同时，`tsdown` 使用 `oxc-transform` 生成 `d.ts` 文件，它比 `typescript` 编译器要更快一些。

二者的结合，使得构建时间极大的缩短了。

## 为什么选择 tsdown ？

从目前 `tsdown` 的更新进度而言，说实话我选择它的原因主要是 **秉着尝鲜的态度**。

`tsdown` 基于 `rolldown` 实现，而 `rolldown` 是下一代 `vite` 的底层构建工具，它使用 `rust` 编写，
得益于 `vite` 团队的优秀实践，全新的构建工具 `rolldown` 的性能表现非常出色，它比 `esbuild` 和 `swc` 要更快，
更小的内存开销。
