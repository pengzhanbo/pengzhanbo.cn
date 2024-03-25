---
title: vite插件推荐
author: 鹏展博
createTime: 2023/01/10 02:45:06
tags:
  - node
  - vite
permalink: /article/8vac55c7/
---

本文列出了一些在工作中常会用到的、比较好用的 `vite` 插件。

<!-- more -->

## Framework

### Vue

- [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue) - `vue3` 官方支持。
- [@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx) - `vue3` JSX 语法插件，官方支持
- [@vitejs/plugin-vue2](https://github.com/vitejs/vite-plugin-vue2) - vue2 支持
- [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) - 基于文件系统自动创建路由。
- [unplugin-vue-i18n](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n) - `vue-i18n` 国际化方案的配套插件

### React

- [@vitejs/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react) - `React` 官方支持
- [vite-plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - 使用 `swc` 编译 `React`，速度更快

### Preact

- [@preact/preset-vite](https://github.com/preactjs/preset-vite) - `preact` 支持

### Electron

- [electron-vite](https://github.com/alex8088/electron-vite) - `electron` 支持

### Tauri

- [vite-plugin-tauri](https://github.com/amrbashir/vite-plugin-tauri) - `Tauri` 支持

## 常用

- [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) - 支持 `tsconfig.json`的 `paths` mapping
- [vite-plugin-inspect](https://github.com/antfu/vite-plugin-inspect) - 审查`vite-plugin`中间状态
- [vite-plugin-mock-dev-server](https://github.com/pengzhanbo/vite-plugin-mock-dev-server) - 在 vite
  开发服务中注入 `mock-server` ，提供 `API Mock data` 支持
- [unplugin-icons](https://github.com/antfu/unplugin-icons) - 将 icons 资源转化为组件
- [vite-plugin-windicss](https://github.com/windicss/vite-plugin-windicss) - widicss 支持
- [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) - 低版本浏览器支持
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - 自动导入模块
- [vite-plugin-remove-console](https://github.com/xiaoxian521/vite-plugin-remove-console) - 可配置的删除代码中的 `console`

## 其他

### WASM

- [vite-plugin-wasm-pack](https://github.com/nshen/vite-plugin-wasm-pack) - rust `wasm-pack` 支持

### Federation

- [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation) - 提供模块联邦支持

### PWA

- [vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa) - 提供 PWA 支持
