---
title: netlify-functions
createTime: 2022/05/13 01:28:38
author: pengzhanbo
permalink: /note/vuepress-plugin/netlify-functions/
---

[![npm version](https://img.shields.io/npm/v/@vuepress-plume/plugin-netlify-functions?color=32A9C3&labelColor=1B3C4A&label=npm)](https://www.npmjs.com/package/@vuepress-plume/plugin-netlify-functions){style="margin-right:8px"}
[![npm beta download](https://img.shields.io/npm/dy/@vuepress-plume/vuepress-plugin-netlify-functions?color=32A9C3&labelColor=1B3C4A&label=beta%20downloads)](https://www.npmjs.com/package/@vuepress-plume/plugin-netlify-functions){style="margin-right:8px"}
[![npm download](https://img.shields.io/npm/dy/vuepress-plugin-netlify-functions?color=32A9C3&labelColor=1B3C4A&label=downloads)](https://www.npmjs.com/package/vuepress-plugin-netlify-functions){style="margin-right:8px"}
[![github source](https://img.shields.io/badge/source-a?logo=github&color=1B3C4A)](https://github.com/pengzhanbo/vuepress-theme-plume/tree/main/plugins/plugin-netlify-functions)


如果你的 vuepress 站点是部署在 netlify 的，而且希望能够使用netlify functions 来做 serverless。

那么你可能需要本插件提供支持。

本插件仅 提供 `Netlify Functions` 开发环境和 打包构建 支持，不提供具体的 `functions` 函数。

- 你可以基于此插件 在你的 vuepress 项目中 自定义 `functions` 
- 也可以基于此插件作为你的 vuepress plugin 依赖，开发自定义 `functions` 提供给其他 vuepress项目使用。

## 安装

::: code-tabs
@tab npm
``` sh
npm install vuepress-plugin-netlify-functions
```

@tab:active yarn
``` sh
yarn add vuepress-plugin-netlify-functions
```

@tab pnpm
``` sh
pnpm add vuepress-plugin-netlify-functions
```
:::
