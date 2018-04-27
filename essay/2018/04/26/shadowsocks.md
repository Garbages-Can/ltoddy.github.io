# 基于ubuntu16.04+使用shadowsocks(客户端)

先确保电脑有pip.

> sudo apt-get install python-pip
或者
> sudo apt-get install python3-pip

然后下载shadowsocks库

> sudo pip install shadowsocks

然后制作配置文件:

> vim /etc/shadowsocks/config.json

文件内容为:

    ```
    {
        "server":"你vps的ip",
        "server_port":你vps的端口,
        "local_address": "127.0.0.1",
        "local_port":1080,
        "password":"你vps的密码",
        "timeout":300,
        "method":"aes-256-cfb",
        "fast_open": true,
        "workers": 1,
        "prefer_ipv6": false
    }
    ```

### 启动shadowsocks客户端

> sudo sslocal -c /etc/shadowsocks/config.json

当然,这样你还不能"翻墙",因为shadowsocks使用的协议是socks5.

### 转换为HTTP协议

> sudo apt-get install polipo

然后更改polipo的配置文件:

    ```
    # This file only needs to list configuration variables that deviate
    # from the default values.  See /usr/share/doc/polipo/examples/config.sample
    # and "polipo -v" for variables you can tweak and further information.

    logSyslog = false
    logFile = /var/log/polipo/polipo.log

    proxyAddress = "0.0.0.0"
    proxyPort = 8123

    socksParentProxy = "127.0.0.1:1080"
    socksProxyType = socks5

    chunkHighMark = 50331648
    objectHighMark = 16384

    serverMaxSlots = 64
    serverSlots = 16
    serverSlots1 = 32
    ```

然后重启polipo服务

> /etc/init.d/polipo restart

*不行就重启电脑*

检查是否正常工作:

> export http_proxy="http://127.0.0.1:8123/"
> curl www.google.com

如果正常使用了就会返回页面的代码.

*http://127.0.0.1:8123* (在浏览器中打开)这个是polipo的配置说明.

### 配置浏览器:

打开Chrome:

然后使用SwitchyOmega(去百度下载,都有的)

然后如下配置:

![](https://img.vim-cn.com/5e/83adec8a54897ca99e3735fc77c251d70a71ff.png)

如果你翻墙失败,请联系我
- qq: 1205446803
- e-mail: taoliu14@acm.org
