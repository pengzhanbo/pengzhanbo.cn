---
title: git
createTime: 2022/04/17 10:47:34
author: pengzhanbo
permalink: /interview-question/ku3jvbnj/
---

::: tip 提问

1. git 是什么？
2. git和 svn 有什么区别？
3. git pull 和 git fetch有什么区别？
4. git merge 和 git rebase 有什么区别？
5. git-flow 是什么？

:::

## 什么是 git

git是目前使用最广泛的软件版本管理系统。

git是分布式版本管理工具。

## git和svn的区别

- git是分布式的，而svn是集中式的
- svn的分支是整个版本库的复制的一份完整目录，而git的分支是指针指向某次提交。因此git的分支创建更快，开销更小，
  并且分支上的变化不会影响到其他人。svn的分支变化会影响到所有人。

## git pull 和 git fetch 的区别

- git fetch 用于将远程仓库的变化下载到本地，但不与本地分支合并，主要用于同步远程仓库的变更到本地仓库
- git pull 用于将远程仓库的变下下载并和当前分支进行合并。

## git merge 和 git rebase 的区别

两个命令都是用于 分支合并，区别在于 commit 记录的处理有所不同

- git merge 会新建一个 合并 commit， 然后两个分支以前的commit记录都指向这个新的合并 commit 记录。
  这种方法会保留之前每个分支的commit历史

- git rebase 会先找到两个分支的第一个共同 commit 祖先记录，然后提取当前分支之后的所有commit记录，然后将
- 这个commit记录添加到目标分支的最新提交后面。经过合并后，两个分支合并后的commit记录就变为了线性记录。

如果想要一个干净的，没有 merge commit 的线性历史，那么可以选择 git rebase，
如果想要保留完整的历史记录，并且避免重写 commit history的风险，那么应该选择 git merge。

个人认为在团队协作中，如果团队成员对 git 的掌握一般，并不了解 rebase黄金法则，同时想要把控所有成员完整的提交历史，
建议选择使用 git merge，能够更好的追踪所有成员提交记录。

## git-flow

git-flow 是git的一种工作流，一种git分支管理方案。

git-flow 分支规范：

- master ：主分支，存储项目正式发布历史。
- develop: 开发分支，用作 feature 分支的 集合分支。
- feature/\*: 从开发分支拉取的 功能分支，开发完成后推送到 开发分支，不跟 主分支产生交互
- release： 发布分支，当开发分支累计了一定量的发布功能，就从开发分支分离一条 release分支，
  此时 develop分支不再添加新的功能，仅能做一些修复、文档相关的面向发布的任务。
- hotfix： 紧急修复分支，用于发布产品的补丁，从master分支分离，发布完成后应该马上合并回master分支，
  并合并到 develop或release分支。然后主分支马上被打上新版本的tag

团队是否使用 git-flow 的完整工作流程，见仁见智，对于项目比较大，涉及人数较多，git-flow 是个不错的选择；
如果人数较少，那么可以在这个基础上，选择简化工作流。
