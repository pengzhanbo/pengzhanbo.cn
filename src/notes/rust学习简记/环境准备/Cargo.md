---
title: Cargo
author: 鹏展博
createTime: 2022/06/02 05:14:57
permalink: /learn-rust/cargo/
---

## 包管理器

`cargo` 是 `rust` 的包管理工具。在安装 `rustup` 时已经一并安装完成，可直接使用。
`cargo` 提供了一系列的工具，从项目的建立、构建、测试、运行、到部署，为 `rust` 项目提供了尽可能完善的工具。

## Cargo.toml

`Cargo.toml` 是 `cargo` 特有的项目数据描述文件。它存储了项目的所有元配置信息，如果 `Rust` 开发者希望 `Rust` 项目能够按照期望的方式进行构建、测试和运行，那么，必须按照合理的方式构建 `Cargo.toml`。

### package 配置

package 中记录了项目的描述信息

```toml
[package]
name = "package_name" # 项目名称
version = "0.1.0" # 版本号
edition = "2021" # rust 版本
```

### 项目依赖

在 `Cargo.toml` 中，主要通过各种依赖段落来描述该项目的各种依赖项：
基于 Rust 官方仓库 [crates.io](https://crates.io)，通过版本说明来描述
基于项目源代码的 git 仓库地址，通过 URL 来描述
基于本地项目的绝对路径或者相对路径，通过类 Unix 模式的路径来描述

```toml
[dependencies]
rand = "0.3"
hammer = { version = "0.5.0"}
color = { git = "https://github.com/bjz/color-rs" }
geometry = { path = "crates/geometry" }
```

## Cargo.lock

`Cargo.lock` 文件是 `cargo` 工具根据同一项目的 toml文件生成的项目依赖详细清单，因此我们一般不用修改它

## 常用命令

[官方文档](https://doc.rust-lang.org/stable/cargo/commands/index.html)

### `cargo new <package-name>  [options]`

创建一个新的 rust 项目。

`package-name` ： 包名

`options`:

- `--bin` 创建一个 bin 类型的可运行的项目，默认类型
- `--lib` 创建一个 lib 类型的依赖库项目
- `--edition [eidtion]` 指定要使用的 rust 版本，默认为 2021。可选值包括：2015, 2018, 2021
- `--name [name]` 设置项目名称。默认为 目录名
- `--vcs [vcs]` 设置使用的版本管理工具，默认为 git。可选值为：git, hg, pijul, fossil
- `--registory [registory]` 设置源

**示例:**

```sh
cargo new new_package
```

### `cargo init [options]`

与 `cargo new` 命令类似，但是是在当前目录中初始化创建一个 `rust` 项目。

`options` 与 `cargo new` 命令相同。

### `cargo run [options] [— args]`

运行一个 `bin` 类型或 `example` 的本地 `rust package`。

`run` 命令是编译速度优先，不会对代码进行优化，牺牲了运行速度，换取 package 尽快编译完成然后启动，适合在开发时进行调试时使用。

`--` ： 分隔命令行参数，`—` 后面的参数会传递给当前运行的  `package`

`options` (常用):

- `--release, -r` 编译为`release`版本
- `--profile [name]` 获取调试信息

### `cargo build`

编译 当前 `package，以及它的所有依赖库` 。

### `cargo check`

快速检查当前代码是否能够编译通过

### cargo add

添加新的 依赖库 到 `Cargo.toml manifest file`

- `cargo add [options] crate...` 从 [crate.io](https://crate.io) 安装指定的依赖库
- `crate@version`  添加指定版本的 依赖库
- `cargo add [options] --path path` 从指定的 `path` 安装依赖库
- `cargo add [options] --git git` 从 指定的 `git` 地址 安装依赖库
