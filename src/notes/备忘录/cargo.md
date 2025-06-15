---
title: cargo
icon: logos:rust
createTime: 2022/06/21 17:40:42
permalink: /memorandum/cargo/
---

```sh :no-line-numbers
# 显示版本信息以确认 Cargo 已安装
cargo version
# 创建新项目 二进制程序

cargo new --bin
# 创建新项目 库
cargo new --lib

# 在项目中运行单元测试
cargo test
# 快速编译项目，无需生成二进制文件来检查错误
cargo check
# 自动格式化代码
cargo fmt
# 编译一个项目
cargo build
# 一步编译和运行项目
cargo run
# Linter 检查错误
cargo clippy --all-targets -- --D warnings
# 检查代码覆盖率
cargo tarpaulin --ignore-tests
```

## 安装/升级

适用于 Linux 和  MacOS

``` sh :no-line-numbers
curl -sSf https://static.rust-lang.org/rustup.sh | sh
```

在 Windows 中，下载 [rustup-init.exe](https://win.rustup.rs/) 并运行。

## 切换源

配置文件： `~/.cargo/config`

```toml
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'tuna' # 👈 如果需要提交包注释配置源

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
# registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```

切换源需要删除缓存目录

``` sh :no-line-numbers
rm -rf ~/.cargo/.package-cache   # ⚠️ 删除缓存目录内容
```
