---
title: nginx
icon: logos:nginx
author: 鹏展博
createTime: 2019/07/02 11:15:28
permalink: /memorandum/nginx/
---

## 服务管理

```sh :no-line-numbers
sudo systemctl status nginx  # nginx当前状态
sudo systemctl reload nginx  # 重新加载 nginx
sudo systemctl restart nginx # 重启nginx

sudo nginx -t   # 检查语法
nginx           # 启动
nginx -s reload # 重启
nginx -s stop   # 关闭进程
nginx -s quit   # 平滑关闭nginx
nginx -V        # 查看nginx的安装状态
```

## 全局变量

| 变量                | 说明                                                            |
| ------------------- | --------------------------------------------------------------- |
| `$args`             | 这个变量等于请求行中的参数，同 `$query_string`                  |
| `$remote_port`      | 客户端的端口                                                    |
| `$content_length`   | 请求头中的 `Content-length` 字段                                |
| `$remote_user`      | 已经经过 `Auth Basic Module` 验证的用户名                       |
| `$content_type`     | 请求头中的 `Content-Type` 字段                                  |
| `$request_filename` | 当前请求的文件路径，由 `root` 或alias指令与URI请求生成          |
| `$document_root`    | 当前请求在 `root` 指令中指定的值                                |
| `$scheme`           | HTTP方法（如http，https）                                       |
| `$host`             | 请求主机头字段，否则为服务器名称                                |
| `$hostname`         | 主机名                                                          |
| `$http_user_agent`  | 客户端`agent`信息                                               |
| `$http_cookie`      | 客户端`cookie`信息                                              |
| `$server_protocol`  | 请求使用的协议，通常是`HTTP/1.0`或`HTTP/1.1`                    |
| `$server_addr`      | 服务器地址，在完成一次系统调用后可以确定这个值                  |
| `$server_name`      | 服务器名称                                                      |
| `$server_port`      | 请求到达服务器的端口号                                          |
| `$limit_rate`       | 这个变量可以限制连接速率                                        |
| `$request_method`   | 客户端请求的动作，如 GET/POST                                   |
| `$request_uri`      | 包含请求参数的原始URI，不包含主机名，如：`/foo/bar.php?arg=baz` |
| `$remote_addr`      | 客户端的IP地址                                                  |
| `$uri`              | 不带请求参数的当前URI，`$uri`不包含主机名，如 `/foo/bar.html`   |
| `$document_uri`     | 与 `$uri` 相同                                                  |
| `$nginx_version`    | `nginx` 版本                                                    |

## 监听端口

```nginx :no-line-numbers
server {
  listen 80;      # 标准 HTTP 协议
  listen 443 ssl; # 标准 HTTPS 协议
  listen 443 ssl http2; # 对于 http2
  listen [::]:80; # 使用 IPv6 在 80 上收听
  # 仅收听使用 IPv6
  listen [::]:80 ipv6only=on;
}
```

## 域名 (server_name)

```nginx :no-line-numbers
server {
  # 监听 example.com
  server_name example.com;
  # 监听多个域
  server_name example.com www.example.com;
  # 监听所有子域
  server_name *.example.com;
  # 监听所有顶级域
  server_name example.*;
  # 监听未指定的主机名（监听 IP 地址本身）
  server_name "";
}
```

## 负载均衡

### 简单实例

```nginx :no-line-numbers
upstream node_js {
  server 0.0.0.0:3000;
  server 0.0.0.0:4000;
  server 127.155.142.421;
}
```

### 权重

```nginx :no-line-numbers
upstream test {
  server localhost:8080 weight=9;
  server localhost:8081 weight=1;
}
```

### ip_hash

解决负载均衡 `session` 的问题

```nginx:no-line-numbers {2}
upstream test {
  ip_hash;
  server localhost:8080;
  server localhost:8081;
}
```

### fair

响应时间短的优先分配

```nginx:no-line-numbers {2}
upstream backend {
  fair;
  server localhost:8080;
  server localhost:8081;
}
```

### url_hash

按访问url的hash结果来分配请求

```nginx:no-line-numbers {2,3}
upstream backend {
  hash $request_uri;
  hash_method crc32;
  server localhost:8080;
  server localhost:8081;
}
```

### keepalive

激活缓存以连接到上游服务器

```nginx:no-line-numbers {4}
upstream memcached_backend {
    server 127.0.0.1:11211;
    server 10.0.0.2:11211;
    keepalive 32;
}
```

### server 可选参数

| 参数名         | 说明                             |
| -------------- | -------------------------------- |
| `weight`       | 访问权重数值越高，收到请求越多   |
| `fail_timeout` | 指定的时间内必须提供响应         |
| `max_fails`    | 尝试失败服务器连接的最大次数     |
| `down`         | 标记一个服务器不再接受任何请求   |
| `backup`       | 有服务器宕机，标记的机器接收请求 |

## 反向代理

```nginx :no-line-numbers
server {
  listen 80;
  server_name example.com;
  
  location / {
    proxy_pass http://0.0.0.0:3000;
    # 其中 0.0.0.0:3000 是绑定在 
    # 0.0.0.0端口3000 列表上的 Node.js 服务器
  }
}
```

负载均衡 + 反向代理

```nginx :no-line-numbers
upstream node_js {
  server 0.0.0.0:3000;
  # 其中 0.0.0.0:3000 是绑定在 
  # 0.0.0.0端口3000 列表上的 Node.js 服务器
}

server {
  listen 80;
  server_name example.com;
  
  location / {
    proxy_pass http://node_js;
  }
}
```

升级连接（适用于支持 WebSockets 的应用程序）

```nginx :no-line-numbers
upstream node_js {
  server 0.0.0.0:3000;
}

server {
  listen 80;
  server_name example.com;
  
  location / {
    proxy_pass http://node_js;
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
 
  }
}
```

## 跨域

```nginx :no-line-numbers
server {
  listen 80;
  server_name api.xxx.com;
    
  add_header 'Access-Control-Allow-Origin' '*';
  add_header 'Access-Control-Allow-Credentials' 'true';
  add_header 'Access-Control-Allow-Methods' 'GET,POST,HEAD';

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host  $http_host;    
  } 
}
```

重定向 URI

```nginx :no-line-numbers
upstream test {
  server 127.0.0.1:8080;
  server localhost:8081;
}
server {
  listen 80;
  server_name api.xxx.com;
  location / { 
    root  html;                   # 去请求../html文件夹里的文件
    index  index.html index.htm;  # 首页响应地址
  }
  # 用于拦截请求，匹配任何以 /api/开头的地址，
  # 匹配符合以后，停止往下搜索正则。
  location ^~/api/{ 
    # 代表重写拦截进来的请求，并且只能对域名后边的除去传递的参数外的字符串起作用
    # 例如www.a.com/api/msg?meth=1&par=2重写，只对/api/msg重写。
    # rewrite后面的参数是一个简单的正则 ^/api/(.*)$，
    # $1代表正则中的第一个()，$2代表第二个()的值，以此类推。
    rewrite ^/api/(.*)$ /$1 break;
    
    # 把请求代理到其他主机 
    # 其中 http://www.b.com/ 写法和 http://www.b.com写法的区别如下
    # 如果你的请求地址是他 http://server/html/test.jsp
    # 配置一： http://www.b.com/ 后面有“/” 
    #         将反向代理成 http://www.b.com/html/test.jsp 访问
    # 配置一： http://www.b.com 后面没有有“/” 
    #         将反向代理成 http://www.b.com/test.jsp 访问
    proxy_pass http://test;

    # 如果 proxy_pass  URL 是 http://a.xx.com/platform/ 这种情况
    # proxy_cookie_path应该设置成 /platform/ / (注意两个斜杠之间有空格)。
    proxy_cookie_path /platfrom/ /;

    # 设置 Cookie 头通过
    proxy_pass_header Set-Cookie;
  } 
}
```

## 屏蔽 IP

```nginx :no-line-numbers
可以放到 http, server, location, limit_except 语句块

include blockip.conf;
在 blockip.conf 里面输入内容，如：

deny 165.91.122.67;

deny IP;            # 屏蔽单个 ip 访问
allow IP;           # 允许单个 ip 访问
deny all;           # 屏蔽所有 ip 访问
allow all;          # 允许所有 ip 访问
deny 123.0.0.0/8;   # 屏蔽整个段即从 123.0.0.1 到 123.255.255.254 访问的命令
deny 124.45.0.0/16; # 屏蔽IP段即从 123.45.0.1 到 123.45.255.254 访问的命令
deny 123.45.6.0/24; # 屏蔽IP段即从 123.45.6.1 到 123.45.6.254 访问的命令

# 如果你想实现这样的应用，除了几个IP外，其他全部拒绝
allow 1.1.1.1; 
allow 1.1.1.2;
deny all; 
```

## 代理转发重写路径

```nginx :no-line-numbers
location ^~/api/upload {
  rewrite ^/(.*)$ /wfs/v1/upload break;
  proxy_pass http://wfs-api;
}
```

## 图片防盗链

```nginx :no-line-numbers
location ~* \.(gif|jpg|png|swf|flv)$ {
  root html;

  valid_referers none blocked *.nginx.com;

  if ($invalid_referer) {
    rewrite ^/ www.nginx.cn;
    # return 404;
  }
}
```

## 屏蔽文件目录

```nginx :no-line-numbers
通用备份和归档文件

location ~* "\.(old|orig|original|php#|php~|php_bak|save|swo|aspx?|tpl|sh|bash|bak?|cfg|cgi|dll|exe|git|hg|ini|jsp|log|mdb|out|sql|svn|swp|tar|rdf)$" {
    deny all;
}
拒绝访问 .git 和 .svn 目录

location ~ (.git|.svn) {
    deny all;
}
拒绝访问隐藏文件和目录

location ~ /\.(?!well-known\/) {
    deny all;
}
```

## Gzip 配置

``` nginx :no-line-numbers
gzip  on;
gzip_buffers 16 8k;
gzip_comp_level 6;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_proxied any;
gzip_vary on;
gzip_types
    text/xml application/xml application/atom+xml application/rss+xml application/xhtml+xml image/svg+xml
    text/javascript application/javascript application/x-javascript
    text/x-json application/json application/x-web-app-manifest+json
    text/css text/plain text/x-component
    font/opentype application/x-font-ttf application/vnd.ms-fontobject
    image/x-icon;
gzip_disable  "msie6";
```
