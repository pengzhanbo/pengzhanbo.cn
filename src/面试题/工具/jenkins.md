---
title: jenkins
createTime: 2022/04/18 07:02:27
permalink: /interview-question/8hujc044/
---

::: tip 提问
简单介绍一下 jenkins
:::

jenkins 是一个基于java开发的 持续集成工具。提供了大量的插件来支持软件的构建、部署、自动化等。

jenkins 提供了多种方式用于 CI&CD 。

其中比较常用的是 流水线 pipeline。

pipeline将软件的版本迭代时所需要经历的各个阶段，抽象为一个个 stage， 而每个stag有多个step步骤。
软件变更，通过启动流水线，自动按顺序执行每个stage。

stage 比如，build、test、deploy等。

step 比如 一段shell命令等。
