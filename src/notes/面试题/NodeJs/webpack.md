---
title: webpack
createTime: 2022/04/18 07:04:03
author: pengzhanbo
permalink: /note/interview-question/e2tpl1sq/
---

::: tip 提问
1. 对webpack的了解
2. webpack的工作原理
3. loader和plugin？ 有什么区别？
4. 做过哪些webpack优化？
:::

::: info 说明
一般来说， 面试中问及的webpack相关知识，如果是面向招写业务代码的，
能了解个webpack的原理和能做什么，就差不多够了。如果是面向招做基础设施的，
那么还需要了解 loader、 plugin等相关内容，以及如何写一个 loader/plugin，
还有就是如何做webpack优化这些，但做招基础设施又不仅仅只考擦webpack，更多还是对构建工具的整体理解。
:::

## webpack

webpack是一个用于 现代javascript应用程序的静态模块打包工具。

## 工作原理

- 项目中的每一个文件都是一个模块。模块之间通过引用，会形成依赖关系，多个依赖关系，形成了依赖关系图；
- 通过loader可以对模块进行解析或者其他操作；
- 在打包过程中，模块会被合并成chunk；
- 根据入口文件创建chunk组；
- 根据入口文件开始的模块依赖形成的依赖关系图，将这些模块添加到chunk中；
- 通过plugins可以在webpack的各个生命周期进行操作
- 根据chunk进行打包输出

## loader

loader用于对模块的源代码进行解析转换。

## plugin

plugin是webpack的核心功能，其目的是在于解决loader无法解决的其他事上。

plugin可以在webpack访问到webpack的整个生命周期，并且可以访问到compile对象，这使得plugin拥有非常强大的能力。

## loader和plugin的区别

loader仅能对其关联的模块类型进行解析转换，不能访问到webpack的整个生命周期

plugin是对webpack的扩展，可以访问到webpack整个生命周期。

（几乎loader能做到的事情，均可以通过plugin实现，但loader可以更关注于模块解析本身）
