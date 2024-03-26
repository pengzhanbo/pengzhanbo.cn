---
title: Command-Line Interface
author: 鹏展博
createTime: 2019/08/14 11:27:06
permalink: /cli/
article: false
---

本篇仅收集记录 常用的命令行，及在具体场景中的使用，并不对它们进行详细介绍。

## 拷贝

### 拷贝一个文件

将 `file.txt` 拷贝到 `documents/` 目录下

```sh
cp file.txt documents/
```

### 拷贝一个目录

把 `music/` 整个目录拷贝到 `media/` 目录下

```sh
cp -a music media/
# 或者写成
cp -a music/ media/music/
```

### 创建文件副本

从 `file.txt` 创建副本 `file.bak.txt`

```sh
cp file.txt file.bak.txt
# 或者写成
cp file{,.bak}.txt
```

### 创建目录副本

从 `music/` 创建副本

```sh
cp -a music/ media/
# 如果 media 目录不存在
cp -a music media/
```

## 移动

### 移动文件

将 `file.txt` 移动到 `documents/` 目录下

```sh
mv file.txt documents/
# 不要忽略 document 后面的 `/`，不然会被当成重命名文件
```

### 重命名文件

将 `file.txt` 重命名为 `readme.md`

```sh
mv file.txt readme.md
```

### 移动目录

将 目录 `music/` 移动到 `media/` 目录下

```sh
mv music media/
# 或者写成
mv music/ media/music
```

### 重命名目录

将 目录 `music/` 重命名为 `media/`

```sh
mv music/ media/
```

## 合并目录文件

将 `images/` 目录合并到 `images2/` 目录中

```sh
# -a 相当于 -rlptgoD , 表示归档，同名文件会被覆盖
rsync -a images/ images2/
```

## 创建

### 创建文件

创建 `file.txt`

```sh
touch file.txt # 如果文件存在，则更新它的权限和修改时间
# 或者使用
> file.txt  # 如果文件存在，则会清空文件内容
```

### 创建目录

创建 `music/` 目录

```sh
mkdir music
# 创建一连串的文件夹
mkdir -p media/music/rock
```

## 查看信息

### 文件和目录大小

```sh
du -sh node_modules/
```

### 文件信息

```sh
stat -x file # MacOS
stat file    # Linux
```

### 文件内容

查看文件内容

```sh
cat file.txt
# 如果文件太大，可以使用 `less` 来一次查看一页内容
less file.txt
```

### 目录文件

查看目录中的文件

```sh
ls folder
# -l: 以列表格式显示. -a: 显示包括隐藏文件的所有文件. -la 结合以上两个选项.
ls -la folder
# -r: 倒序显示. -t: 按修改时间排序. -h: 以易读的格式显示大小.
ls -alrth folder
```

显示目录下所有文件和子目录的文件树

```sh
tree folder  # Linux
find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g' # MacOS
# 也可以在 MacOS 上使用 `brew install tree` 安装 `tree` 命令行工具
```

## 打开文件

使用默认程序打开文件

```sh
xdg-open file # Linux
open file     # MacOS
start file    # Windows
```

在任意程序中打开文件

```sh
open -a appName file
```

## 删除

### 删除一个文件

删除 `file.txt`

```sh
rm file.txt
```

### 删除一个目录

删除 `music/` 目录

```sh
rm -r music
```

## 解压缩

### 压缩整个目录

将 目录 `music/` 压缩到 `archive.zip`

```sh
zip -r archive.zip music
```

### 解压文件

将 `archive.zip` 解压

```sh
unzip archive.zip
```

### 速览压缩文件

速览压缩包中的文件

```sh
zipinfo archive.zip
# 或者
unzip -l archive.zip
```

## 搜索

### 找出陈旧文件

找出所有最近一次修改在 5 天之前的文件

```sh
find folder -mtime +5
```

### 检索文件内容

```sh
grep -i "music" file.txt
```

`grep` 能在文件中检索特定内容，一些常见的配套命令行参数:

- `-i`：大小写敏感
- `-A/-B/-C <N>`：顺带显示前后文，`-A`表示后面 N 行，-B表示前面 N 行，`-C`表示前后各 N 行
- `-E`：使用正则表达式来匹配
- `-v`：反选（输出不匹配的行）
- `-l`：只输出能匹配到内容的文件名
- `-F`：不要将检索内容视为正则表达式
- `-r`：递归匹配目录下所有文件的内容
- `-o`：只输出匹配上了的部分（而不是整行）
- `-a`：也对二进制文件进行检索，而不是忽略它们！

## 强制退出程序

```sh
killall program_name
```

## 网络

### 服务器响应

```sh
curl -i https://pengzhanbo.cn
```

### 检查域名/地址连接

检查域名或者地址某端口是否能够连接

```sh
nc -vz pengzhanbo.cn 443
nc -vz 1.1.1.1 443
```

### 域名DNS配置

```sh
dig pengzhanbo.cn
```

### 域名所有人和注册信息

```sh
whois pengzhanbo.cn
```

## 热键

- `Ctrl + A` 跳转到你当前编辑的命令行行首
- `Ctrl + E` 跳转到你当前编辑的命令行行尾
- `Ctrl + L` 清屏，和 clear 指令类似
- `Ctrl + U` 清除行中光标之前的内容（在行尾时即清除整行）
- `Ctrl + H` 和退格一样
- `Ctrl + R` 能让你搜索之前使用过的命令行记录
- `Ctrl + C` 强制停止当前的程序
- `Ctrl + D` 退出当前 shell （壳层/命令行界面）
- `Ctrl + Z` 将当下运行的程序挂起，使用 fg 来恢复运行
- `Ctrl + W` 删除光标前的一个词
- `Ctrl + K` 清除行中光标之后的内容
- `Ctrl + T` 交换光标前两个字符
- `Esc + T` 交换光标前两个词
- `Alt + F` 将光标移至行内下一个词处
- `Alt + B` 将光标移至行内上一个词处
- `Tab` 自动补全文件/目录的名称

### MacOS

```sh
!!                            # 再一次执行上一条指令
sudo !!                       # 以管理员身份执行上一条指令
!<word>                       # 加上特定命令行前缀再执行上一条指令
!<word>:p                     # 显示上一条指令加上前缀，但不要执行
<space>command                # 执行指令，但不要存到历史记录中
echo "ls -l" | at midnight    # 在特定时间执行指令
caffeinate -u -t 3600         # 接下来一小时内阻止你的mac休眠
ls -lhs                       # 将目录中文件按大小排序显示
qlmanage -p <file>            # 从命令行调用"速览"
top -o vsize                  # 查看是什么拖慢了你的mac
```
