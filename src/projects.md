---
title: Projects
author: 鹏展博
createTime: 2023/02/15 04:07:11
permalink: /projects/
article: false
---

## 开源项目

### vite-plugin-mock-dev-server

<NpmBadgeGroup repo="pengzhanbo/vite-plugin-mock-dev-server">
  <NpmBadge type="stars" />
  <NpmBadge type="version" label="npm" />
  <NpmBadge type="dm" />
  <NpmBadge type="dt" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

`vite-plugin-mock-dev-server` 专注于在 `Vite` 开发环境下 提供 Mock 服务。
通过 vite 内置的 `http` 和 `http-proxy` 服务，以 `middleware` 的方式，对 `server.proxy` 配置的代理路径
进行二次拦截，命中规则后，返回配置的 `mock data` 。

你可以在 mock配置文件中使用`node` 任意第三方模块。 这表示，你可以使用如 `mockjs` / `faker-js` 等库帮助生成 `mock data`。

插件支持响应多种数据类型包括 `text/json/Buffer/ReadStream`等，还支持设置 headers、cookies。

插件还支持模拟 `WebSocket`，可以轻松的实现在本地开发环境调试 `WebSocket` 服务。

[使用文档](https://vite-plugin-mock-dev-server.netlify.app/)

---

### vuepress-theme-plume

<NpmBadgeGroup repo="pengzhanbo/vuepress-theme-plume">
  <NpmBadge type="stars" />
  <NpmBadge type="version" label="npm" />
  <NpmBadge type="dy" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

vuepress-theme-plume 是一个基于 VuePress 的主题。适用于 博客、文档 和 知识笔记 。

与 vuepress 默认主题相比：

- 大幅度优化了界面、交互，更具美观度，更好的用户体验。
- 同时，还添加了大量的丰富实用的功能，如 代码分组、提示容器、任务列表、数学公式、代码演示、 内容搜索、文章评论、加密 等。
- 大幅度简化了配置，更易于使用，同时还保留了丰富灵活的配置项，满足个性化的需求。

plume 主题尽可能的内置你可能需要的功能，以及搭建站点所需要的一般性配置，您无需关注这些细节。 目的是，让您更专注于 内容的创作，更好的表达你的想法，享受 Markdown 增强语法带来的便利。

[使用文档](https://plume.pengzhanbo.cn/)

---

### vite-plugin-image-placeholder

<NpmBadgeGroup repo="pengzhanbo/vite-plugin-image-placeholder">
  <NpmBadge type="stars" />
  <NpmBadge type="version" label="npm" />
  <NpmBadge type="dt" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

在项目开发过程中，为未准备好图片资源的内容区域，生成占位图片。

---

### rspack-plugin-mock

<NpmBadgeGroup repo="pengzhanbo/rspack-plugin-mock">
  <NpmBadge type="stars" />
  <NpmBadge type="version" label="npm" />
  <NpmBadge type="dm" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

`vite-plugin-mock-dev-server` 对标 `vite-plugin-mock-dev-server` 在 `rspack/rsbuild` 上的实现， 专注于在 `rspack / rsbuild` 开发环境下 提供 Mock 服务。

[使用文档](https://github.com/pengzhanbo/rspack-plugin-mock)

---

### vulcan

<NpmBadgeGroup repo="pengzhanbo/vulcan">
  <NpmBadge type="stars" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

<Stamps stamps="gs,gl,g" repo="pengzhanbo/vulcan" />

**说明：**

基于 vite + vue3 的项目模板，帮助快速创建 Mobile Web 应用。

---

### @any-hooks/solid

<NpmBadgeGroup repo="any-hooks/solid-hooks" name="@any-hooks/solid">
  <NpmBadge type="stars" />
  <NpmBadge type="version" label="npm" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

一套高质量可靠的 Solidjs Hooks 库。

[使用文档](https://solid-hooks.netlify.app/en-US)

---

### stylelint-define-config

<NpmBadgeGroup repo="stylelint-types/stylelint-define-config">
  <NpmBadge type="stars" />
  <NpmBadge type="version" label="npm" />
  <NpmBadge type="dt" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

为 `stylelint` 提供 `defineConfig` 配置类型帮助，可以在 `stylelint.config.js` 中配置自定义配置。

---

### @pengzhanbo/utils

<NpmBadgeGroup repo="pengzhanbo/utils" name="@pengzhanbo/utils">
  <NpmBadge type="stars" />
  <NpmBadge type="version" label="npm" />
  <NpmBadge type="dm" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

一个常用的工具类库, 无依赖， 任何运行时。

[使用文档](jsr.io/@pengzhanbo/utils)

---

### geo-pattern-ts

<NpmBadgeGroup repo="pengzhanbo/geo-pattern-ts">
  <NpmBadge type="stars" />
  <NpmBadge type="version" label="npm" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

生成漂亮的SVG图案。

[使用文档](https://github.com/pengzhanbo/geo-pattern-ts) | [在线演示](geo-pattern.netlify.app)

---

### chinese-simple2traditional

<NpmBadgeGroup repo="pengzhanbo/chinese-simple2traditional">
  <NpmBadge type="stars" />
  <NpmBadge type="version" label="npm" />
  <NpmBadge type="dt" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

中文繁简体转换。

- 内置字库，零依赖，支持任何运行环境。
- 支持 3077+ 常用简体字 和 4919+ 繁体字/异体字。
- 支持 3577+ 简体短语转繁体的特殊情况。
- 支持 117+ 繁体短语/异体短语 转简体的特殊情况。

[使用文档](https://github.com/pengzhanbo/chinese-simple2traditional) | [在线演示](https://han-convert.netlify.app/)

---

### caniuse-embed

<NpmBadgeGroup repo="pengzhanbo/caniuse-embed">
  <NpmBadge type="stars" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

基于 `Astro` 开发的 `caniuse-embed` 组件。

从 [caniuse.com](https://caniuse.com/) 和 [mozilla's browser compat data](https://github.com/mdn/browser-compat-data) 嵌入最新数据。

显示10个主要浏览器多个版本的功能支持数据。可配置、可靠且完全响应。

[使用文档](https://caniuse-embed.vercel.app/zh-CN)

---

### spearjs

<NpmBadgeGroup repo="pengzhanbo/spearjs">
  <NpmBadge type="stars" />
  <NpmBadge type="license" />
  <NpmBadge type="source" />
</NpmBadgeGroup>

**说明：**

一个 低代码平台。使用 vite 构建。前端基于 vue， 后端基于 nestjs。
