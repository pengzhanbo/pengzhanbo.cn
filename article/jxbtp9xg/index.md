---
url: /article/jxbtp9xg/index.md
---
::: center
::logos:pm2 =200px::
:::

## 什么是 PM2？

PM2 是一款功能强大的 Node.js 进程管理器，专门用于管理和守护 Node.js 应用程序。无论是在开发环境还是生产环境中，它都能确保你的 Node 应用稳定运行，并提供丰富的监控与管理功能。

简单来说，PM2 就像是 Node.js 应用的“贴身管家”，负责启动、停止、重启应用，并在应用意外崩溃时自动恢复，从而保障服务的高可用性。

## 安装 PM2

### 全局安装（推荐）

```bash
npm install pm2 -g
# 或使用 yarn
yarn global add pm2
```

### 本地项目安装

```bash
npm install pm2 --save-dev
# 在项目中使用
npx pm2 start app.js
```

### 验证安装

```bash
pm2 --version
# 输出示例：5.3.0
```

## 主要用途

1. **进程守护**：保障 Node.js 应用持续运行，崩溃时自动重启
2. **负载均衡**：利用 Node.js 集群模式充分发挥多核 CPU 性能
3. **零停机部署**：实现应用无缝更新与部署
4. **性能监控**：实时监控应用性能及资源使用情况
5. **日志管理**：集中管理应用日志输出

## 核心功能

### 1. 进程管理

```bash
# 启动应用
pm2 start app.js

# 启动并指定应用名称
pm2 start app.js --name "my-api"

# 启动多个实例（集群模式）
pm2 start app.js -i 4

# 重启应用
pm2 restart app.js

# 停止应用
pm2 stop app.js

# 删除应用
pm2 delete app.js
```

### 2. 配置文件

创建 `ecosystem.config.js` 文件：

```javascript
module.exports = {
  apps: [{
    name: 'my-app',
    script: './app.js',
    instances: 'max', // 使用所有 CPU 核心
    exec_mode: 'cluster', // 集群模式
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 80
    },
    watch: true, // 开发时监听文件变化
    ignore_watch: ['node_modules', 'logs'],
    max_memory_restart: '1G', // 内存超过 1G 自动重启
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }],

  // 部署配置
  deploy: {
    production: {
      'user': 'node',
      'host': ['server1.com', 'server2.com'],
      'ref': 'origin/main',
      'repo': 'git@github.com:user/repo.git',
      'path': '/var/www/my-app',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
```

使用配置文件启动应用：

```bash
pm2 start ecosystem.config.js --env production
```

### 3. 监控和日志

```bash
# 查看所有进程状态
pm2 list

# 监控所有进程
pm2 monit

# 查看应用日志
pm2 logs
pm2 logs my-app --lines 100  # 查看最近 100 行

# 查看特定应用的监控信息
pm2 show my-app

# 生成启动脚本（服务器重启后 PM2 自动启动）
pm2 startup
pm2 save
```

## 常用命令速查表

| 命令          | 描述               | 示例               |
| ------------- | ------------------ | ------------------ |
| `pm2 start`   | 启动应用           | `pm2 start app.js` |
| `pm2 list`    | 列出所有应用       | `pm2 list`         |
| `pm2 stop`    | 停止应用           | `pm2 stop all`     |
| `pm2 restart` | 重启应用           | `pm2 restart app`  |
| `pm2 delete`  | 删除应用           | `pm2 delete app`   |
| `pm2 logs`    | 查看日志           | `pm2 logs app`     |
| `pm2 monit`   | 监控面板           | `pm2 monit`        |
| `pm2 reload`  | 重载应用（零停机） | `pm2 reload app`   |
| `pm2 scale`   | 扩展实例           | `pm2 scale app +1` |
| `pm2 startup` | 生成启动脚本       | `pm2 startup`      |

## PM2 的优缺点

### 优点

1. **强大的进程管理**：自动重启、集群模式、负载均衡
2. **零停机部署**：支持热重载，更新应用无需停机
3. **丰富的生态系统**：内置监控、日志管理、性能分析
4. **易于使用**：命令行接口简洁，学习成本低
5. **跨平台支持**：兼容 Linux、Windows、macOS
6. **活跃的社区**：持续更新，文档完善
7. **免费开源**：大部分功能免费使用

### 缺点

1. **内存占用**：相比简单方案，PM2 本身会占用额外内存
2. **配置复杂**：高级功能需较复杂配置
3. **Windows 支持有限**：部分功能在 Windows 上表现不如 Linux
4. **依赖 Node.js**：必须安装 Node.js 环境

## 替代品及对比

### 1. Forever

```bash
npm install forever -g
forever start app.js
```

**与 PM2 对比：**

* ✅ 更轻量，内存占用少
* ❌ 功能较少，不支持集群模式
* ❌ 监控和日志功能有限
* ❌ 社区活跃度较低

### 2. Docker + 进程管理

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]
```

**与 PM2 对比：**

* ✅ 更好的隔离性和可移植性
* ✅ 标准化部署流程
* ❌ 学习曲线更陡峭
* ❌ 资源消耗更大

### 3. Systemd (Linux)

```ini
# /etc/systemd/system/myapp.service
[Unit]
Description=My Node.js App
After=network.target

[Service]
Type=simple
User=node
WorkingDirectory=/var/www/myapp
ExecStart=/usr/bin/node app.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

**与 PM2 对比：**

* ✅ 系统级集成
* ✅ 无需额外依赖
* ❌ 配置复杂
* ❌ 功能有限

### 4. Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nodejs
  template:
    metadata:
      labels:
        app: nodejs
    spec:
      containers:
        - name: nodejs
          image: my-nodejs-app:latest
          ports:
            - containerPort: 3000
```

**与 PM2 对比：**

* ✅ 企业级容器编排
* ✅ 自动扩展和自愈能力
* ❌ 架构复杂，运维成本高
* ❌ 小型项目可能过度设计

## 选择建议

| 场景                | 推荐工具         | 理由                   |
| ------------------- | ---------------- | ---------------------- |
| 中小型 Node.js 项目 | **PM2**          | 功能全面，易于使用     |
| 需要容器化部署      | **Docker + PM2** | 结合容器优势和进程管理 |
| 企业级微服务        | **Kubernetes**   | 完善的容器编排能力     |
| 简单守护需求        | **Forever**      | 轻量级解决方案         |
| Linux 系统服务      | **Systemd**      | 系统原生集成           |

## 最佳实践

### 1. 生产环境配置

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'api-prod',
    script: './dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    node_args: '--max-old-space-size=1024',
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    max_memory_restart: '800M',
    error_file: '/var/log/pm2/api-error.log',
    out_file: '/var/log/pm2/api-out.log',
    combine_logs: true,
    time: true,
    wait_ready: true,
    listen_timeout: 3000
  }]
}
```

### 2. 部署脚本示例

```bash
#!/bin/bash
# deploy.sh

echo "开始部署..."

# 拉取最新代码
git pull origin main

# 安装依赖
npm install --production

# 构建应用
npm run build

# 使用 PM2 重载应用（零停机）
pm2 reload ecosystem.config.js --env production

echo "部署完成！"
```

## 总结

PM2 是 Node.js 开发者的得力助手，特别适用于需要高可用性和易维护性的生产环境。它提供从开发到部署的全套解决方案，虽然在特定场景下可能有更专业的替代方案，但对于大多数 Node.js 项目而言，PM2 仍是最实用、最全面的选择。

**核心价值：**

* 🚀 简化部署和维护流程
* 🔄 确保应用高可用性
* 📊 提供完善的监控能力
* ⚡ 支持性能优化和扩展

无论你是独立开发者还是团队协作，掌握 PM2 都能显著提升 Node.js 应用的管理与运维效率。

## 延伸资源

[PM2 官方文档](https://pm2.io/docs/){.read-more}
[PM2 GitHub 仓库](https://github.com/Unitech/pm2){.read-more}
[Node.js 最佳实践](https://github.com/goldbergyoni/nodebestpractices){.read-more}
