# React框架构建的blog新主题

最近一时脑热,用react做了一个单页面应用,来替换过去那个bootstrap做的blog首页.
不过依旧是以简约风格为主制作的.

源代码: [https://github.com/ltoddy/ltoddy.github.io/tree/gh-pages](https://github.com/ltoddy/ltoddy.github.io/tree/gh-pages)

![主界面](https://img.vim-cn.com/76/9125f1bc202220e1bd381e9a83c1c3a0e511e5.png)


** 布局(Layout) **

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
    

很常规的一个布局,不过加了一些动画效果就变的*炫酷*了.

源代码在Github上,在gh-pages分支上,不过还不能merge到master,

但是我已經部署到我的云服务器上了 [http://116.85.42.182:8080/](http://116.85.42.182:8080/)
可以预览一下.

页面数据都是从外部配置文件穿进去的,是动态可扩展的,而且也做了相应式.
