---
title: 在 Chrome 中模拟请求和Web内容
author: 鹏展博
tags: 
  - development
createTime: 2024/01/21 15:22:45
permalink: /article/hdx2maf6/
---

在 **Chrome 117** 中，发布了一项极为实用的新功能，这项功能允许 我们在 **本地替换Web内容** 
（包括 XHR 和 提取请求数据）

## 概述

在我们的日常开发中，在进行调试时经常需要模拟各种数据场景。
通常情况下，我们可以借助一些开发工具，或者根据项目所使用的脚手架相关的工具进行模拟。

> [!tip]
> 如果你正在使用 `vite`，推荐使用 [`vite-plugin-mock-dev-server`](https://vite-plugin-mock-dev-server.netlify.app/) 插件为你的项目开启 mock 支持。能够满足绝大多数的需求场景，不仅支持 http 请求，还支持 websocket。


从 `Chrome 117` 开始，为我们提供了 `overrides content` 功能，它带来的功能包括：

- 替换 HTTP 响应头
- 替换 HTTP 响应内容
- 替换 网页资源

同时，它还将替换的内容保存 为 本地的文件夹中形成副本。当重新加载网页时，开发者工具会使用这些 本地的副本，
而不是真实的网络资源。


## 限制

本地替换适用于网络响应标头和大多数文件类型（包括 XHR 和提取请求），但有一些例外情况：

- 开发者工具不会保存对 `Elements` 面板的 DOM 树所做的更改。
- 如果你在 `Styles` 窗格中修改 CSS，且该 CSS 的来源是 HTML 文件，则开发者工具不会保存更改。

不过，你可以在 `Sources` 面板中修改 HTML 文件。

## 设置本地替换项

### 启用

1. 首先打开 `Networks` 面板，首先选择你想要 替换的请求，
   从下拉菜单中选择 `override header`(替换响应头) 或者 `override content` （替换内容）。

   ::: center
   ![](/images/chrome-override/open-menu.png){style="width:275px;max-width:100%;"}
   :::

2. 如果你还未设置过 本地替换项，则开发者工具会在顶部的的操作栏中，提示你 选择一个 本地文件夹，
用于将 替换的文件保存到 本地的文件夹中作为副本。

   ::: center
   ![](/images/chrome-override/select-folder.png)
   :::

   选择文件夹后，开发者工具 会提示你 进行 文件夹授权，点击 `Allow / 允许` 即可：

   ::: center
   ![](/images/chrome-override/allow.png)
   :::

3. 授权完毕后，开发者工具将会跳转到 `Sources` 面板。在这里，你可以看到 新生成的 Mock 文件，
   该文件与你想要替换的 请求内容 相对应， 你可以直接在这里对其进行修改：

   ::: center
   ![](/images/chrome-override/mock-file.png)
   :::

### 停用

在 `Sources > overrides` 面板中， 取消选中 `Enable local override` 即可 停用 本地替换。

::: center
![](/images/chrome-override/disable.png){style="width:375px;max-width:100%;"}
:::

## 替换响应内容

使用 替换响应内容 时，我们可以不必等待后端，获得后端支持，即可在本地 实时模拟我们需要的数据进行调试。

在 `Networks` 面板中，右键点击你想要修改的接口，在弹出咋菜单中，选择 `Override content` 选项：

::: center
![](/images/chrome-override/override-res-1.png){style="width:375px;max-width:100%;"}
:::

开发者工具将会跳转到 `Sources > Overrides` 面板中，并打开对应的 mock 文件：

::: center
![](/images/chrome-override/mock-file.png)
:::

你可以直接在这里修改 响应内容，然后按 `Command /Ctrl + S` 保存文件, 然后刷新页面


## 替换响应头

### 修改单个请求响应头

在 `Networks` 面板中，选择想要修改的接口，并右键点击，然后在 右键菜单中，选择 `Override header`选项：

::: center
![](/images/chrome-override/override-header-1.png){style="width:375px;max-width:100%;"}
:::

此时，面板 `Header` 将会进入 可编辑状态：

::: center
![](/images/chrome-override/override-header-2.png)
:::

你可以点击 `Add Header` 添加新的响应头， 也可以直接点击想要修改的值即可修改响应头。

另外，如果你只需要简单的修改某个值，还可以直接鼠标悬停在 想要修改的 `Header` 值上，然后点击 `Edit` 图标 来修改响应头。

::: center
![](/images/chrome-override/override-header-3.png)
:::

请看一个示例，添加一个 允许跨域请求的头，删除一个响应头并修改响应头：

::: center
![](/images/chrome-override/override-header-4.png)
:::

### 修改所有请求响应头

如果需要在修改所有请求的响应头时，点击 `Response Headers` 面板右侧的 `.headers` 按钮：

::: center
![](/images/chrome-override/override-header-5.png){style="width:425px;max-width:100%;"}
:::

开发者工具将会条状到对应的 `Sources > Overrides > .headers` 文件中：

::: center
![](/images/chrome-override/override-header-6.png)
:::

在这里，你可以点击 `Add override rule` 按钮，添加新的响应头。

其中 `Apply to` 表示该规则匹配的 请求接口地址， 你可以使用 `*` 通配符 匹配所有的接口， 使用 `?` 指定单个字符。

修改完成后，别忘了 使用 `Commands/Ctrl + S` 保存 `.headers` 文件。

然后，你就可以刷新页面以应用所有的更改。


## 替换Web内容

你可以直接在 `Sources > Page` 查看 当前页面的 所有资源内容，然后找到你想要修改的资源内容，
右键点击，在菜单中选择 `Override content`。

:::center
![](/images/chrome-override/override-content.png){style="width:425px;max-width:100%;"}
:::

开发者工具将会跳转到 `Sources > Overrides` 面板，并建立 该资源内容的 Mock 副本，
你可以直接对其进行修改， `Command /Ctrl + S` 保存文件，然后刷新页面。
