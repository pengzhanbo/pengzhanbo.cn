---
url: /article/0ed6asz0/index.md
---
`Docker` 是一个开源的应用容器引擎，它可以将应用打包到一个可移植的镜像中，
使得应用可以更轻便的部署在任意 Linux 或 Windows 的操作系统的机器上。
同时还提供了环境隔离，很大程度上避免了不同环境不一致带来的各种问题。
`Docker`可轻便移植的特性，也极大的促进了 `CI/CD` 的发展。

**`Docker`架构图**

![architecture](https://docs.docker.com/engine/images/architecture.svg)

从图中可以看出， `Docker` 的组成部分包括：

* `docker client`: `docker` 命令行工具
* `docker host`: 宿主机，即 `docker daemon` 的运行环境服务器
* `docker daemon`: `docker` 的守护进程，`docker client` 通过命令行与 `docker daemon` 进行交互
* `container`: 最小型的一个操作系统环境，可以对各种服务和应用容器化
* `image`: 镜像，可以理解为一个容器的模板配置，通过一个镜像可以启动多个容器
* `registry`: 镜像仓库，存储各种镜像，可以从镜像仓库拉取或推送镜像。

## 安装

> [官方安装文档](https://docs.docker.com/engine/install/)

以下仅说明在 `CentOS` 服务器上的安装过程

### CentOS 安装

1. 安装依赖

```sh
yum install -y yum-utils device-mapper-persistent-data lvm2
```

2. 添加 docker 的yum镜像源，如果在国内，添加阿里云的镜像源

```sh
# 安装 docker 官方的镜像源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 如果在国内，安装阿里云的镜像
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

3. 安装 docker

```sh
# 安装 docker
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

4. 启动服务

```sh
systemctl enable docker

systemctl start docker
```

当 `docker` 安装成功后，可以使用以下命令查看 `docker` 信息

```sh
# 查看版本信息
docker --version

# 查看详细版本信息
docker version

# 查看详细配置信息
docker info
```

### 守护进程配置

`dockerd` 是 `docker` 的守护进程，`dockerd` 可以通过配置文件进行配置，在 `linux` 下的配置文件位置在 `/etc/docker/daemon.json`，更详细内容可以参考 [官方文档](https://docs.docker.com/engine/reference/commandline/dockerd/)。

日志引擎为 `json-file`，对日志结构化，结合合适的日志系统，方便定位日志。 存储引擎为 `overrlay2`。

```sh
mkdir /etc/docker

# 设置 docker daemon
cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ]
}
EOF

# 重启 docker
systemctl daemon-reload
systemctl restart docker
```

## 镜像

镜像是用于创建容器的配置文件。 容器可以视为是一个最小型的操作系统。

`docker` 的镜像和和容器都使用了 `unionFS` 做分层存储，镜像作为只读层是共享的，容器在镜像之上附加了一层可写层，最大程度的减少了空间的浪费。

![sharing layers](https://docs.docker.com/storage/storagedriver/images/sharing-layers.jpg)

::: info Union file systems
`UnionFS` 是一种分层、轻量级并且高性能的文件系统，支持对文件系统的修改作为一次提交来一层层的叠加。`docker` 的镜像与容器就是分层存储，可用的存储引擎有 `aufs`，`overlay` 等。

关于分层存储的详细内容可以查看官方文档 [docker: About storage drivers](https://docs.docker.com/storage/storagedriver/)
:::

### 镜像仓库与拉取

> [官方镜像仓库](https://hub.docker.com/explore/)

多数情况下，我们不需要自己构建镜像，可以直接从 官方镜像仓库拉取。

使用命令 `docker pull` 进行镜像拉取。 通过 `docker inspect` 查看镜像信息：

```sh
# 加入拉取一个 node:alpine 的镜像
docker pull node:alpine

# 查看镜像信息
docker inspect node:alpine
```

### 构建镜像与发布

使用命令 `docker build` 构建镜像。`docker build` 会使用当前目录的 `dockerfile` 构建镜像。

使用 `-t` 指定标签

```sh
# -t node-base:10: 镜像以及版本号
# .: 指当前路径
docker build -t node-base:10 .
```

当镜像构建成功，使用 `docker push` 推送镜像到仓库。

## Dockerfile

在使用 `docker` 部署自己应用时，往往需要自己构建镜像。

`docker` 使用 `Dockerfile` 作为配置文件构建镜像：

```dockerfile
FROM node:alpine

ADD package.json package-lock.json /code/
WORKDIR /code

RUN npm install --production

ADD . /code

CMD npm start
```

### FROM

基于一个旧有的镜像，格式如下

```dockerfile
FROM <image> [AS <name>]

# 在多阶段构建时会用到
FROM <image>[:<tag>] [AS <name>]
```

### ADD

把目录，或者 url 地址文件加入到镜像的文件系统中

```dockerfile
ADD [--chown=<user>:<group>] <src>... <dest>
```

### RUN

执行命令，由于 ufs 的文件系统，它会在当前镜像的顶层新增一层

```dockerfile
RUN <command>
```

### CMD

指定容器如何启动

一个 `Dockerfile` 中只允许有一个 `CMD`

```dockerfile
# exec form, this is the preferred form
CMD ["executable","param1","param2"]

# as default parameters to ENTRYPOINT
CMD ["param1","param2"]

# shell form
CMD command param1 param2
```

## 容器

镜像与容器的关系，类似于代码与进程的关系。

* `docker run` 创建容器
* `docker stop` 停止容器
* `docker rm` 删除容器

### 创建容器

基于 `nginx` 镜像创建一个最简单的容器：启动一个最简单的 http 服务

使用 `docker run` 来启动容器，`docker ps` 查看容器启动状态

```sh
docker run -d --name nginx -p 8888:80 nginx:alpine

docker ps -l
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
404e88f0d90c        nginx:alpine         "nginx -g 'daemon of…"   4 minutes ago       Up 4 minutes        0.0.0.0:8888->80/tcp     nginx
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
```

其中:

* `-d`: 启动一个 daemon 进程
* `--name`: 为容器指定名称
* `-p host-port:container-port`: 宿主机与容器端口映射，方便容器对外提供服务
* `nginx:alpine`: 基于该镜像创建容器

此时在宿主机使用 curl 测试容器提供的服务是否正常

```sh
curl localhost:8888
```

进入容器环境中，使用 `docker exec -it container-name` 命令

```sh
docker exec -it nginx sh
/ #
/ #
/ #
```

### 容器管理

* `docker ps` 列出所有容器

```sh
docker ps

CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
404e88f0d90c        nginx:alpine         "nginx -g 'daemon of…"   4 minutes ago       Up 4 minutes        0.0.0.0:8888->80/tcp     nginx
498e7d74fb4f        nginx:alpine         "nginx -g 'daemon of…"   7 minutes ago       Up 7 minutes        80/tcp                   lucid_mirzakhani
2ce10556dc8f        redis:4.0.6-alpine   "docker-entrypoint.s…"   2 months ago        Up 2 months         0.0.0.0:6379->6379/tcp   apolloserverstarter_redis_1
```

* `docker port` 查看容器端口映射

```sh
docker port nginx

80/tcp -> 0.0.0.0:8888
```

* `docker stats` 查看容器资源占用

```sh
docker stats nginx
CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS
404e88f0d90c        nginx               0.00%               1.395MiB / 1.796GiB   0.08%               632B / 1.27kB       0B / 0B             2
```
