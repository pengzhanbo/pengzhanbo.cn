---
url: /learn-rust/install/index.md
---
## 在 Linux或 MacOS 上安装

终端中输入如下命令：

```sh
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

这个命令将会下载一个脚本，并开始安装最新版本的 `rustup` 工具。

安装成功，将有如下提示：

```sh
Rust is installed now. Great!
```

### 安装C编译器（非必须）

`rust` 依赖 `libc` 和 链接器 `linker` 。如果遇到提示链接器无法执行的错误，需要再手动安装一个C语言编译器：

**MacOS下**：

```sh
xcode-select --install
```

**Linux下**：

根据Linux的发行版来安装 GCC 或 Clang

## 在 windows上安装

windows 上安装需要 `C++` 环境：

1. 先安装 [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/) ，勾选 `C++` 环境即可；

2. 安装完成后，Rust 所需的 `msvc` 命令行程序需要手动添加到环境变量中，
   否则安装 Rust 时 `rustup-init` 会提示未安装 Microsoft C++ Build Tools，
   其位于：`%Visual Studio 安装位置%\VC\Tools\MSVC\%version%\bin\Hostx64\x64`（请自行替换其中的 `%Visual Studio 安装位置%`、`%version%` 字段）下。

   如果你不想这么做，可以选择安装 **Microsoft C++ Build Tools** 新增的“定制”终端
   `Developer Command Prompt for %Visual Studio version%` 或 `Developer PowerShell for %Visual Studio version%` ，在其中运行 `rustup-init.exe` 。

3. 在 [RUSTUP-INIT](https://www.rust-lang.org/learn/get-started) 下载系统相对应的 Rust 安装程序，一路默认即可

## 检查安装是否成功

在终端中输入以下命令：

```bash
rustc -V
# rustc 1.64.0 (a55dd71d5 2022-09-19)
cargo -V
# cargo 1.64.0 (387270bc7 2022-09-16)
```

## 卸载

在终端中执行以下命令：

```sh
rustup self uninstall
```
