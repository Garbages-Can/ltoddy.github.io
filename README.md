# ltoddy's blog

本页面由React框架构建.

## 本项目介绍.

** 布局(Layout) **

```
    --------------------------------------
    |                                    |
    |              Header                |
    |                                    |
    |-------------------------------------
    |                 |                  |
    |              Content               |
    |                 |                  |
    |                 |                  |
    |                 |                  |
    |     essays      | Github projects  |
    |                 |                  |
    |                 |                  |
    |                 |                  |
    |------------------------------------|
    |                                    |
    |              Footer                |
    |                                    |
    -------------------------------------|
```

- Header 部分是个人介绍,不过内容是写死在代码里面的,这部分代码在src/Header.js中.

- Content
    - essays 部分是你的文章预览模块,这部分的配置已经抽取出来的,配置文件是essays.json
    - Github projects 部分是你自己的Github上的项目预览,配置文件是projects.json

- Footer 加了本项目源代码的外链
