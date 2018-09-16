##　一件遗憾的事情

很久没有写blog了,也是因为太忙了.

最近,上床睡觉的时间越来越多晚了,给自己定下了太多需要学的东西.

其中有一件事是尽可能的让自己成为一名Python专家,每天要花费两个小时去熟悉Python内置的api.
当然这其中也是收获很大的,标准库使Python的feature更加丰满,而且也能够使你写的Python代码更加的简洁与优雅.

比如:

```python
from functools import total_ordering


@total_ordering
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)

    def __lt__(self, other):
        return (self.x, self.y) < (other.x, other.y)


p1 = Point(1, 4)
p2 = Point(2, 3)
for expr in ['p1 < p2', 'p1 <= p2', 'p1 == p2', 'p1 >= p2', 'p1 > p2']:
    print('{:<6}:'.format(expr))
    result = eval(expr)
    print('  result of {}: {}'.format(expr, result))
```

就像这段代码,以最小的代码量实现了最大的功能.

虽然也看到不少人说Python垃圾,什么性能差劲之类的.不过我觉得Python挺好的.

最起码它表达能力是非常强的:

- 内置list,dict,tuple,set这样的数据结构,并且也有其字面量的构建方式.

- 既可以嵌套表达式也可以像JavaScript那样用连缀表达式.

- 支持函数式编程,标准库的functools,itertools,operator库提供了功能丰富的小组件.

等等,虽然有些人会说,Python的lambda函数设计的像屎一样,不过我倒要问了,什么是lambda,
为什么lambda要写两行?lambda -- 短小,没必要为其命名. 当你说lambda函数多行的时候,它真的应该
作为一个lambda函数吗.

-----------------------------------------------------------------------

牢骚发完,要说一件我后悔的事情,那就是:我当年花在java身上的时间太多了.

我应该有将近一年没写一行java了,刚上大学的时候,我就开始学java了,看的是网易云课堂翁恺老师
的java课,这个课还是强烈推荐的,而且我认为这是唯一正确的教学java的视频课,因为这个视频课是
仅仅围绕着面向对象的思想来讲的,而不是单纯教你java语法,api之类的.

当初学java,从视频中也是受到面向对象思想的影响 -- 继承,多态,代码复用,这是多么的美好啊.

于是,在java身上,我看了不少书: java语言程序设计上下,java核心技术上下,java编程思想,
深入理解jvm等等. 当然,我最为熟悉的是javase, javaee和javaweb我不怎么熟悉.
比如,我要面试java,面试官问我spring生命周期,jvm加载对象,双亲委派的好处之类的问题,
我并不能给出让面试官满意的答案. 就我看的java书,最起码也不止三千页了,可到头来呢,一行
java不写,而且极度讨厌java. 很难理解jdk的设计,本我以为应该放在java.lang这个package中
的类,却放在了比如java.utils里. 当年花费在java身上的大量时间, 到现在看了却成了我一件非常
后悔的事情.

如果当年没有花费那么多时间,就算是能现在给我当初的一半时间,我肯定拿这时间去把MDN的文档读一遍
(这件事我几个月前就一直想安排进我的学习计划,可是苦于时间真的不够用,一直没有列入学习计划),
或者让我好好的看一下chez scheme文档.

而且我竟然当年还把scala看了,为了辅助java.......

对于现在的我来说,jvm上的东西,我碰都不想碰.

-----------------------------------------------------------------------

当然,说啥都晚了,天下又没有后悔药吃.

现在我所希望的就是,能在寒假找一份写Python的工作.真的,很想用Python工作.
(上份工作,是自己年幼不懂事,进公司了才发现我要用JavaScript+Rust工作)
