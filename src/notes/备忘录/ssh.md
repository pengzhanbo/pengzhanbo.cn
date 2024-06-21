---
title: ssh
icon: mdi:ssh
author: 鹏展博
createTime: 2019/04/13 18:58:37
permalink: /memorandum/ssh/
---

## 配置位置

| 位置                     |           说明 |
| :----------------------- | -------------: |
| `/etc/ssh/ssh_config`    | 系统范围的配置 |
| `~/.ssh/config`          | 用户特定的配置 |
| `~/.ssh/id_{type}`       |           私钥 |
| `~/.ssh/id_{type}.pub`   |           公钥 |
| `~/.ssh/known_hosts`     |       登录主机 |
| `~/.ssh/authorized_keys` |   授权登录密钥 |

## 执行远程命令

```sh :no-line-numbers
ssh root@192.168.1.5 'ls -l'

# 调用本地脚本
ssh root@192.168.1.5 bash < script.sh

# 从服务器压缩和下载
ssh root@192.168.1.5 "tar cvzf - ~/source" > output.tgz
```

## SCP

| 命令          |                      说明 |
| :------------ | ------------------------: |
| `scp -r`      |          递归复制整个目录 |
| `scp -C`      |                  压缩数据 |
| `scp -v`      |              打印详细信息 |
| `scp -P 8080` |              使用特定端口 |
| `scp -B`      | 批处理模式 _（防止密码）_ |
| `scp -p`      |            保留时间和模式 |

从远程复制到本地

```sh :no-line-numbers
scp user@server:/dir/file.ext dest/
```

两台服务器之间的副本

```sh :no-line-numbers
scp user@server:/file user@server:/dir
```

从本地复制到远程

```sh :no-line-numbers
scp dest/file.ext user@server:/dir
```

复制整个文件夹

```sh :no-line-numbers
scp -r user@server:/dir dest/
```

复制文件夹中的所有文件

```sh :no-line-numbers
scp user@server:/dir/* dest/
```

从服务器文件夹复制到当前文件夹

```sh :no-line-numbers
scp user@server:/dir/* .
```

## keygen

```sh :no-line-numbers
ssh-keygen -t rsa -b 4096 -C "your@mail.com" 
```

- `-t` 指定密钥类型, `rsa | ed25519 | dsa | ecdsa`
- `-b` 指定密钥长度
- `-C` 指定注释

指定文件名

```sh :no-line-numbers
ssh-keygen -f ~/.ssh/filename
```

从私钥生成公钥

```sh :no-line-numbers
ssh-keygen -y -f private.key > public.pub
```

更改私钥密码

```sh :no-line-numbers
ssh-keygen -p -f ~/.ssh/id_rsa
```

从 known_hosts 搜索

```sh :no-line-numbers
ssh-keygen -F <ip/hostname>
```

从 known_hosts 中删除

```sh :no-line-numbers
ssh-keygen -R <ip/hostname>
```
