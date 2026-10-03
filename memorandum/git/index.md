---
url: /memorandum/git/index.md
---
## 分支

```sh :no-line-numbers
# 删除本地存在远程不存在的分支
git remote prune origin

# 删除已经合并到 master 的分支
git branch --merged master | grep -v '^\*\|  master' | xargs -n 1 git branch -d

# 查看远程分支和本地分支的对应关系
git remote show origin
```

## 提交

```sh :no-line-numbers
# 重写最后一次提交信息
git commit --amend -m "new message"

# 修改最新的提交而不更改提交消息
git commit --amend --no-edit
```

## 配置

```sh :no-line-numbers
# 获取配置帮助信息
git help config
# 配置全局用户名
git config --global user.name "name"
# 配置全局邮箱
git config --global user.email "email"
# 配置全局颜色，对 git 输出进行美化
git config --global color.ui auto
# 在文本编辑器中编辑全局配置文件
git config --global --edit
# 删除全局配置
git config --global --unset <entry-name>
# 查看本地 repo 配置
git config --list
```

### 解决中文乱码

```sh :no-line-numbers
git config --global core.quotepath false
```

不再将 文件权限变更 作为改动

```sh :no-line-numbers
git config core.fileMode false
```

### 设置大小写敏感

```sh :no-line-numbers
# 大小写敏感
git config --get core.ignorecase
# 远程有俩相同目录，通过这种方式清除掉，然后提交记录
git rm -r --cached <dirOrFile>
```

### 代理

```sh :no-line-numbers
# 查看代理
git config --global http.proxy
git config --global https.proxy
git config --global socks.proxy

# 设置代理
# 适用于 privoxy 将 socks 协议转为 http 协议的 http 端口
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080
git config --global socks.proxy 127.0.0.1:1080

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
git config --global --unset socks.proxy

# 只对 github.com 设置代理
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
git config --global https.https://github.com.proxy socks5://127.0.0.1:1080

# 取消 github.com 代理
git config --global --unset http.https://github.com.proxy
git config --global --unset https.https://github.com.proxy
```

## 统计查询

```sh :no-line-numbers
# 提交数统计
git log --oneline | wc -l
# 查看文件内容的提交者
git blame <file-name>
# 仓库总大小
git count-objects -vH
# 仓库大小
git ls-files | xargs -r du -hs
# 在 commit log 中查找内容
git log --all --grep='<given-text>'
```

### 查看 个人代码量

```sh :no-line-numbers
# username 需要修改为 个人用户名
git log --author="username" --pretty=tformat: --numstat | awk \
'{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

### 每人增删行数

```sh :no-line-numbers
git log --format='%aN' | sort -u |\
  while read name; do echo -en "$name\t";\
  git log --author="$name" --pretty=tformat: --numstat | awk \
  '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

### 查看提交者排名

```sh :no-line-numbers
# 取前十个的排名
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 10
```

## submodule 子模块

```sh :no-line-numbers
# 添加包含子模块的仓库
git clone <repo_url> --recursive
# 查看当前仓库中的子模块
git submodule status

# 添加子模块
git submodule add <repo_url> <submodule_path>

# 初始化子模块
git submodule init

# 更新子模块
git submodule update --remote

# 删除子模块
git submodule deinit <path_to_submodule>
git rm <path_to_submodule>
```

切换到子模块的特定提交

```sh :no-line-numbers
cd <path_to_submodule>
git checkout <commit_hash>
```

切换到父仓库的特定提交，并更新子模块

```sh :no-line-numbers
git submodule update --remote
git checkout <commit_hash>
```

获取并切换子模块的最新标签

```sh :no-line-numbers
cd <path_to_submodule>
git fetch --tags
git checkout $(git describe --tags $(git rev-list --tags --max-count=1))
```

子模块递归

```sh :no-line-numbers
# 添加所有已存在的子模块
git submodule foreach --recursive git submodule add <repo_url>

# 更新所有子模块到最新提交
git submodule foreach --recursive git pull origin master

# 检出特定的子模块路径
git submodule foreach --recursive git checkout <branch_name>

# 获取仓库中的所有子模块变化
git submodule foreach --recursive git fetch

# 获取并合并子模块的远程分支
git submodule foreach --recursive git pull origin <branch_name>

# 将子模块还原到父仓库中的初始提交
git submodule foreach --recursive git checkout .

# 获取子模块的更新并忽略本地修改
git submodule foreach --recursive git fetch --all
git submodule foreach --recursive git reset --hard origin/master
```
