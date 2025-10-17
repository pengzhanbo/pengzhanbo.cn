---
title: Git Squash Merge 详解
createTime: 2023/12/02 20:28:15
permalink: /article/73ybcbmj/
tags:
  - git
---

在团队协作开发中，Git 分支合并策略的选择直接影响代码库的整洁度和可维护性。本文将深入解析 **Git Squash Merge**，并与普通 Merge 和 Rebase Merge 进行详细对比，帮助你选择最适合项目的合并策略。

## 什么是 Git Squash Merge？

Git Squash Merge 是一种特殊的合并方式，它将**多个提交压缩成一个提交**后再合并到目标分支。这种策略特别适用于功能分支开发完成后，希望保持主分支历史线性整洁的场景。

### 基本语法

```bash
# 切换到目标分支（如 main）
git checkout main

# 执行 squash merge
git merge --squash feature-branch

# 提交压缩后的更改
git commit -m "feat: 添加用户认证功能"
```

### 实际工作流程示例

:::steps

- **创建功能分支并开发**

  ```bash
  git checkout -b feature-auth
  # 进行多次提交
  git commit -m "feat: 添加登录表单"
  git commit -m "feat: 实现 JWT 认证"
  git commit -m "fix: 修复登录状态持久化问题"
  ```

- **准备合并到主分支**

  ```bash
  git checkout main
  git merge --squash feature-auth
  ```

- **查看状态并提交**

  ```bash
  git status  # 显示所有更改已暂存
  git commit -m "feat: 完整用户认证功能"
  ```

:::

## 三种合并策略的深度对比

### 1. 普通 Merge（`git merge`）

普通 Merge 是最直接的合并方式，会创建一个**新的合并提交**，保留分支的完整历史。

```bash
git checkout main
git merge feature-branch
```

**历史记录效果：**

```bash
*   a1b2c3d (main) Merge branch 'feature-branch'
|\
| * d4e5f6g feat: 功能C
| * e7f8h9i feat: 功能B
| * f0g1h2j feat: 功能A
|/
* k3l4m5n 之前的提交
```

**优点：**

- 完整保留开发历史
- 便于追踪每个功能的详细演进过程
- 合并冲突处理相对简单

**缺点：**

- 主分支历史可能变得冗长复杂
- 对于小型功能，多个提交可能显得冗余

:::info 适用场景

- 需要完整审计轨迹的大型项目
- 长期存在的功能分支
- 开源项目，需要透明展示贡献者的工作流程
:::

### 2. Rebase Merge（`git rebase`）

Rebase 通过重新应用提交来重写历史，创建线性的提交序列。

```bash
git checkout feature-branch
git rebase main
git checkout main
git merge feature-branch  # 快进合并
```

**历史记录效果：**

```bash
* m8n9o0p (main) feat: 功能C
* l5m6n7o feat: 功能B
* j2k3l4m feat: 功能A
* k3l4m5n 之前的提交
```

**优点：**

- 创建干净、线性的历史
- 避免不必要的合并提交
- 更容易使用 `git bisect` 进行问题定位

**缺点：**

- 重写历史，可能影响团队协作
- 冲突解决可能更复杂（需要在每个重放提交时解决）
- 不适合已推送到远程的分支

:::warning 注意事项
Rebase 会重写提交历史，==不要对已共享的分支使用 rebase=={.warning}，这会给协作者带来严重困扰。
:::

### 3. Squash Merge（`git merge --squash`）

Squash Merge 结合了两者的优点：保留功能分支的详细开发历史，同时在主分支上保持整洁。

**历史记录效果：**

```bash
* x9y0z1a (main) feat: 完整用户认证功能
* k3l4m5n 之前的提交

# 功能分支仍然保留完整历史
* d4e5f6g (feature-auth) fix: 修复登录状态持久化问题
* e7f8h9i feat: 实现 JWT 认证
* f0g1h2j feat: 添加登录表单
* k3l4m5n 之前的提交
```

**优点：**

- 主分支历史保持简洁清晰
- 功能分支仍保留完整开发过程
- 便于代码审查和问题追踪

**缺点：**

- 丢失了主分支上的详细开发步骤
- 需要手动编写有意义的提交信息
- `git blame` 可能不够精确

:::tips 最佳实践
为压缩后的提交编写==描述性的提交信息=={.success}，概括整个功能的变化，便于后续维护和理解。
:::

## 详细对比表格

| 特性 | 普通 Merge | Rebase Merge | Squash Merge |
|------|------------|--------------|--------------|
| **历史保留** | 完整保留 | 重写历史 | 主分支压缩，功能分支保留 |
| **提交图** | 有合并节点 | 线性 | 线性 |
| **冲突解决** | 一次解决 | 可能多次解决 | 一次解决 |
| **适用分支** | 所有分支 | 本地/私有分支 | 功能分支 |
| **审计能力** | 优秀 | 良好 | 主分支一般，功能分支优秀 |
| **团队影响** | 无 | 可能影响他人 | 无 |

## 实际场景选择指南

### 场景 1：短期功能开发

```bash
# 推荐使用 Squash Merge
git checkout -b feature-payment
# ... 开发过程，多次提交
git checkout main
git merge --squash feature-payment
git commit -m "feat: 集成支付网关（Stripe）"
```

### 场景 2：长期功能分支

```bash
# 推荐使用普通 Merge
git checkout -b refactor-architecture
# ... 数周开发，多人协作
git checkout main
git merge refactor-architecture
```

### 场景 3：个人功能分支，保持线性历史

```bash
# 推荐使用 Rebase
git checkout feature-ui-improvement
git rebase main
git checkout main
git merge feature-ui-improvement
```

## 高级技巧与注意事项

### 1. 配置 Git 默认使用 Squash Merge

```bash title="设置全局配置"
git config --global merge.ff false
git config --global pull.rebase true
```

### 2. 在 GitHub/GitLab 中启用 Squash Merge

:::steps

- 进入仓库设置
- 找到 "Merge requests" 或 "Pull requests" 设置
- 启用 "Squash commits when merging" 选项
- 保存设置

:::

### 3. 处理 Squash Merge 后的分支清理

```bash
# 合并后删除本地分支
git branch -d feature-branch

# 删除远程分支
git push origin --delete feature-branch
```

## 总结

选择合适的 Git 合并策略是团队协作中的重要决策：

- **Squash Merge**：==功能分支开发的黄金标准=={.success}，平衡了历史整洁性和开发过程可追踪性
- **普通 Merge**：适合需要完整审计轨迹的重要功能
- **Rebase Merge**：个人分支整理历史的利器，但需谨慎使用

:::important 核心建议
对于大多数团队项目，推荐采用 **Squash Merge** 作为默认策略，它为代码审查、问题追踪和发布管理提供了最佳平衡点。
:::

通过理解每种策略的特点和适用场景，你的团队可以建立更高效、更规范的 Git 工作流程，提升整体的开发体验和代码质量。
