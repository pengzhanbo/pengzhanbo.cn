---
title: git-hook
createTime: 2022/04/18 09:17:44
permalink: /interview-question/3hdch7z2/
---

::: tip 提问

1. 有用过 git hooks吗？
2. 有哪些 git hooks？
3. 如何在前端项目中使用 git hooks？

:::

## git-hook

git-hook 是 git 提供的，能够在git的某些动作发生时触发的钩子，这些钩子可以通过脚本进行自定义。

默认所有的 hook 都在 当前项目根目录的 `.git/hooks` 目录下。

git 提供了 包括客户端的、服务端的各种钩子。常用的有如下：

- pre-commit 在执行 git commit 前 执行
- commit-msg 在执行 git commit 前 执行，晚于 pre-commit, 可以对 commit msg 进行校验
- pre-merge-commit 在执行 git merge 前执行
- pre-rebase-commit 在执行 git rebase 前执行
- pre-push 在执行 git push 前执行

## 在前端项目中使用

在前端项目中可以 安装 `husky`库，以及 `lint-staged` 库，来进行适合于 前端开发人员配置的 git hook配置。
