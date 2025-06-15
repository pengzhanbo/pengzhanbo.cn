---
title: pm2
icon: logos:pm2-icon
createTime: 2021/09/20 22:02:09
permalink: /memorandum/pm2/
---

## 启动

启动 node 进程

```sh :no-line-numbers
pm2 start app.js

pm2 ping # 确保 pm2 守护进程已经启动
```

启动其它应用程序

```sh :no-line-numbers
pm2 start bash.sh
pm2 start python-app.py --watch
pm2 start binary-file -- --port 1520
```

## 流程管理

```sh :no-line-numbers
pm2 restart app_name # 重启 app_name
pm2 reload app_name  # 重载 app_name
pm2 stop app_name    # 停止 app_name
pm2 delete app_name  # 删除 app_name
```

可以将 `app_name` 替换为：

- `all`: 表示所有进程
- `id`: 指定特定 id 的进程

## 检查状态

列出 PM2 的所有应用状态

```sh :no-line-numbers
pm2 [list|ls|status]

pm2 list        # 显示所有进程状态
pm2 jlist       # 以原始 JSON 格式打印进程列表
pm2 prettylist  # 以美化JSON打印进程列表
pm2 describe 0  # 显示有关特定进程的所有信息
```

## 日志

```sh :no-line-numbers
pm2 logs
pm2 logs --lines 200 # 旧日志
pm2 flush         # 清空所有日志文件
pm2 reloadLogs    # 重新加载所有日志
```

终端仪表板

```sh :no-line-numbers
pm2 monit
```

Web 的仪表板

```sh :no-line-numbers
pm2 plus
```

## 集群模式

```sh :no-line-numbers
# 0 / max 表示根据 CPU 数量启动多个进程
pm2 start app.js -i 0
pm2 start app.js -i max # 等同 0 ，已弃用
```

## 常用命令行参数

```sh :no-line-numbers
--name <app_name> # 指定应用名称
--watch # 监听文件更新并重启应用
--max-memory-restart <200MB> # 设置应用重新加载的最大内存阈值
--log <log_path> # 指定日志路径
--restart-delay <delay in ms> # 自动重启之间的延迟
--time # 带时间前缀的日志
--no-autorestart # 不自动重启
--cron <cron_pattern> # 指定 cron 强制重启
```

## 更新 PM2

```sh :no-line-numbers
npm install pm2@latest -g
pm2 update  # 更新内存中的 pm2
```
