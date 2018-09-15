---
title: Jenkins 使用
time: 2018-9-16
lang: zh-CN
---

[Jenkins](https://jenkins.io/) 是一款功能强大的应用程序，允许持续集成和持续交付项目。这里记录一些 Jenkins 使用的方法。

<!-- more -->

_以下基于 `CentOS` 系统。_

### 安装
安装详见 官网 [Jenkins 安装](https://jenkins.io/download/) 流程，各个系统如何安装均有说明。

环境依赖： `java`

CentOS 下安装：
``` bash
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
yum install jenkins
```

- __默认安装目录__ : `/var/lib/jenkins`
- __默认日志目录__ ：`/var/log/jenkins`
- __默认缓存目录__ : `/var/cache/jenkins`
- __默认admin密码目录__ : `/var/lib/jenkins/secrets/initialAdminPassword`
- __配置文件__ : `/etc/sysconfig/jenkins`

### 运行
``` bash
# 启动 Jenkins
service jenkins start
# 重启 Jenkins
service jenkins restart
# 停止 Jenkins
service jenkins stop
```
默认运行在 `8080` 端口， 本机可通过 `localhost:8080` 访问。

### 卸载
``` bash
service jenkiins stop
yum clean all
yum remove jenkins
rm -rf /var/lib/jenkins
rm -rf /var/cache/jenkins
rm -rf /var/log/jenkins
```

### 修改端口
1. 打开`Jenkins` 配置文件
``` bash
vim /etc/sysconfig/jenkins
```
2. 修改 `$HTTP_PORT`
``` bash
$HTTP_PORT="8080"
```

### 获取root用户权限
1. 打开`Jenkins` 配置文件
``` bash
vim /etc/sysconfig/jenkins
```
2. 修改 `HTTP_PORT`
``` bash
$JENKINS_USER="root"
```
3. 修改`Jenkins` 相关目录权限
``` bash
chown -R root:root /var/lib/jenkins
chown -R root:root /var/log/jenkins
chown -R root:root /var/cache/jenkins
```
4. 重启`Jenkins`并验证
``` bash
service jenkins restart
ps -ef|grep jenkins
# 若显示为root用户，则表示修改完成
```

### 开机自启
``` bash
chkconfig jenkins on
```

### 其他
相关工具以及项目配置，都只是小问题而已...
