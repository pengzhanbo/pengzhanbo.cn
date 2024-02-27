---
title: netlify-functions
createTime: 2022/05/13 01:28:38
author: pengzhanbo
permalink: /vuepress-plugin/netlify-functions/
---

<Stamps
  :stamps="['nv', { type: 'ndt', label: 'beta downloads', package: '@vuepress-plume/vuepress-plugin-netlify-functions' }, 'ndy', 'g']"
  repo="pengzhanbo/vuepress-theme-plume"
  subpath="plugins/plugin-netlify-functions"
  package="vuepress-plugin-netlify-functions"
/>


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
