# 个人博客

[![Author: pengzhanbo](https://img.shields.io/badge/Author-pengzhanbo-blue.svg?style=for-the-badge)](https://pengzhanbo.cn)
[![License](https://img.shields.io/github/license/pengzhanbo/pengzhanbo.cn?style=for-the-badge)](https://github.com/pengzhanbo/pengzhanbo.cn/blob/master/LICENSE)

使用 [VuePress2](https://vuejs.press/zh/) 与 [VuePress Theme Plume](https://theme-plume.vuejs.press/) 搭建的个人博客

[https://pengzhanbo.cn](https://pengzhanbo.cn)

[![Netlify Status](https://api.netlify.com/api/v1/badges/2d58513b-ff0d-45b2-ad45-21f7eb21eb27/deploy-status)](https://app.netlify.com/sites/pengzhanbo-blog/deploys)

---

如果你正在参考 这个仓库 搭建个人博客，需要注意以下几点：

- `package.json` 中，`devDependencies` 中，除了 `http-server` 之外均不是必须的，可以忽略。
  `http-server` 仅提供了站点构建完成后在本地启动一个服务进行浏览，使用 `pnpm preview` 命令进行预览，`http-server` 也是可选的。

- `docsearch` 配置 和 `comments` 配置需要修改为 你的个人站点对应的配置，尽量不要使用我的配置进行测试，
  这会对我造成一些困扰。

- 请尽量避免直接复制 src 目录中的 markdown 文章到你的博客中，本仓库所有文章遵循 [GPL-3.0](/LICENSE) 协议。
  如果您复制了这些内容，请声明为 转载并注明来源。您可以随意参考部分内容，但尽量避免直接复制。

建议你直接使用 [VuePress Theme Plume](https://theme-plume.vuejs.press/) 提供的 [CLI 工具](https://theme-plume.vuejs.press/guide/quick-start/) 搭建博客站点:

```sh
pnpm create vuepress-theme-plume@latest
```
