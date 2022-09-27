# 环境配置

## CentOS配置nginx 部署项目

## 下载安装
1. 下载 ```wget -c https://nginx.org/download/nginx-1.18.0.tar.gz```
2. 解压 ```tar -zxvf nginx-1.18.0.tar.gz```
3. 配置：需要SSL:```./configure --prefix=/usr/local/nginx```
   不需要SSL:```./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module```
4. 编译安装 
    ```make```
    ```make install```
5. 启动 ```/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf```
6. 重启 ```/usr/local/nginx/sbin/nginx -s reload```

## 配置文件
> usr/local/nginx/conf/nginx.conf文件

```javascript height:100px

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /www/dist;
            index  index.html;
	    try_files $uri $uri/ /index.html;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```

## centOS下载配置MySQL
1. 安装之前检测系统是否有自带的MySQL
```rpm -qa | grep mysql #检查是否安装过MySQL```

```rpm -qa | grep mariadb #检查是否存在 mariadb 数据库（内置的MySQL数据库），有则强制删除```

```rpm -e --nodeps mariadb-libs-5.5.68-1.el7.x86_64 #强制删除```

```rpm -e --nodeps mariadb-5.5.68-1.el7.x86_64 #强制删除```
2. 安装步骤
- 下载MySQL源
curl -O

https://repo.mysql.com//mysql57-community-release-el7-11.noarch.rpm
- 安装MySQL源
yum localinstall mysql57-community-release-el7-11.noarch.rpm
- 检查MySQL源是否安装成功
yum repolist enabled | grep "mysql.*-community.*"

- 有了MySQL源后安装MySQL
```yum install mysql-community-server```

- 输入确认继续安装
安装报错，提示无公共秘钥
解决方法：
```rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022```

然后再次安装

- 查看是否安装成功
```yum list installed mysql-*```

- 启动MySQL并检查MySQL运行状态
```systemctl start mysqld```

```systemctl status mysqld```

- 获取MySQL默认登录密码，登录MySQL，并修改默认密码

```grep 'temporary password' /var/log/mysqld.log```

输入以下命令后，再输入默认登录密码，就能以 root 帐号登录 mysql

```mysql -uroot -p```

在创建数据库或数据表之前，要先用一下命令修改 root 用户的密码

```ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';```

> PS：MySQL默认的密码复杂度为 MEDIUM，所以新密码至少为8位，并且必须包含大、小写字母、数字和特殊字符
- 授予root用户远程访问权限，并刷新权限使生效
```grant all privileges on *.* to 'root' @'%' identified by 'Mysql@123';```

第一个*是数据库，可以改成允许访问的数据库名称

第二个 是数据库的表名称，代表允许访问任意的表

root代表远程登录使用的用户名，可以自定义

%代表允许任意ip登录，如果你想指定特定的IP，可以把%替换掉就可以了

password代表远程登录时使用的密码，可以自定义

让权限立即生效：```flush privileges```
3. 卸载MySQL
- 查看MySQL安装情况：```rpm -qa | grep mysql```
强制删除已安装MySQL
- 查找所有MySQL目录并删除：```find / -name mysql ```
- 删除my.cnf：```rm -f /etc/my.cnf```