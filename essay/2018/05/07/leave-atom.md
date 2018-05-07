# 彻底告别atom.

我从windows转到ubuntu做开发之后,选择的编辑器就是atom,在我的ubuntu上用atom一直到今天.

不过,我要跟atom彻底说拜拜了.

> The hackable text editor

这是atom编辑器的自我描述,我用了atom一年半多了,还真没有啥"hackable"的感觉.

说一下我这一年半坚持用atom而不是vscode的原因,只有一个原因,atom有点小清新的感觉.

### 吐槽atom一波

atom自身是一个文本编辑器,它的.deb安装包就将近一百兆了,安装之后大小更是半个多Ｇ,太大了.
这里就不得不提Electron.

    两大定律:
        - electron第一定律:凡是electron做的应用都特别大.
        - electron第二定律:凡是electron做的应用都占用内存.

因为打开electron应用就是打开了一个浏览器!

一个编辑器,首先最主要最基本的功能是编辑文字,而不是把如何扩展编辑器功能作为首要.
atom打开文件速度实在太慢了,打开一个大项目那简直要命了(mac上好像没这个情况).

atom编辑器的源代码就在 [github](https://github.com/atom/atom) 上面放着.
其实代码写的并不好,当然你可能会说为什么不重构呢,程序员基本人人都有个毛病,就是宁愿写新代码,
也不愿意读老代码,所以atom官方就目前正在做一个新的编辑器: [xray](https://github.com/atom/xray).
rust + electron 做的,目前还在实验阶段,还没有release(release之后我会用用体验一下).

### 转向vscode

依然告别了atom,之后的编辑器选择那肯定是vscode了,打开速度快,而且自动补全提示功能也很強,不必idea差.
vscode内置了git,每次看git diff的时候超级好用.而且也内置了terminal,省得我再ctrl + alt + t
去打开终端了,而且它的终端颜色是自适应主题的(好看). --- (心里默默佩服一下四人帮的作者)

总而言之,我在没换mac之前就一直用vscode了.
