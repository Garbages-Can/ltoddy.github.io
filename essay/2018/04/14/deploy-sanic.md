# 基于docker+gunicorn部署sanic项目

源代码: [https://github.com/ltoddy/Python-useful/tree/master/sanic-app](https://github.com/ltoddy/Python-useful/tree/master/sanic-app)

最近云服务提供商在打价格战,我在滴滴云上花了很少的钱租了一个月的云服务器:
公网ip是： 116.85.42.182, 以下我以116.85.42.182这个ip为演示,当你自己在部署的时候请换乘自己的ip地址.

买完服务器之后,你会得到一个公网ip,你可以通过ssh命令连接上你的服务器.

> ssh dc2-user@116.85.42.182

*顺便提一句,滴滴云给你创建的账户叫"dc2-user",你需要自己设置root的密码.*

![](https://img.vim-cn.com/be/6285cd4ec8d5a5560d98a72edc36210ff2ec04.jpg)

然后安装docker:

> sudo apt-get install docker.io

# 演示一个最小的sanic-app,来部署一下.

这是项目树(目录).

```
.
├── app.py
├── Dockerfile
└── templates
    └── index.html

1 directory, 3 files
```

app.py

```python
import os

from sanic import Sanic
from sanic.response import html
from sanic.response import HTTPResponse
from jinja2 import Environment, FileSystemLoader

app = Sanic(__name__)
base_dir = os.path.abspath(os.path.dirname(__file__))
templates_dir = os.path.join(base_dir, 'templates')
jinja_env = Environment(loader=FileSystemLoader(templates_dir), autoescape=True)


def render_template(template_name: str, **context) -> str:
    template = jinja_env.get_template(template_name)
    return template.render(**context)


@app.route('/')
async def index(request) -> HTTPResponse:
    return html(render_template('index.html'))
```
这里的python代码,用到了sanic框架和jinja2木板引擎,所以带会需要安装这两个依赖.

Dockerfile

```
FROM taoliu/gunicorn3

WORKDIR /code

ADD . /code

RUN pip install sanic \
    && pip install jinja2

EXPOSE 8080

CMD gunicorn app:app --bind 0.0.0.0:8080 --worker-class sanic.worker.GunicornWorker
```

第一行那里"FROM taoliu/gunicorn3",由于没找到合适的Python3的gunicorn的基础镜像,所以我自己做了一个,方便所有人使用.

RUN pip install sanic \ && pip install jinja2 这里,来安装那两个依赖.

CMD gunicorn app:app --bind 0.0.0.0:8080 --worker-class sanic.worker.GunicornWorker 这行,是镜像运行他所以执行的命令.

templates/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ltoddy's home</title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css">
</head>
<body>
<div class="container">
    <div class="page-header">
        <h1>Welcome</h1>
    </div>
</div>
</body>
</html>
```

然后把这些文件传到服务器上:

> scp -r * dc2-user@116.85.42.182:~

![](https://img.vim-cn.com/8c/3f37bc03d1ce4ed5f94a9ee86014a243c88de0.jpg)

然后ssh连上我们的服务器,去构建我们的docker镜像(这个过程有些漫长,具体看网速.)

> docker build -t sanic-demo .

![](https://img.vim-cn.com/0b/ae962d52e59b801799e2a56561bf75a449be05.png)

> docker images

来查看一下当前拥有的镜像

![](https://img.vim-cn.com/9d/68e29376d6b5e3de39008f3d6011595c80b602.jpg)

然后后台运行docker镜像:

> docker run -d --restart=always -p 5000:8080 sanic-demo:latest

![](https://img.vim-cn.com/2f/56a720cd69019a7dde0fbc6022a0ed3819be74.png)

这时候打开浏览器输入: 116.85.42.182:5000 来看看效果吧.

最后说明一点,去滴滴云那里的防火墙规则那里,添加5000端口的规则.

![https://img.vim-cn.com/00/b211cca5695de1c1c71ddf48faa4916cf441c6.png](https://img.vim-cn.com/00/b211cca5695de1c1c71ddf48faa4916cf441c6.png)
