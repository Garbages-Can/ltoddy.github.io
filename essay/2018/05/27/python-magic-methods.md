# Python 魔法方法

### 基础:

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|初始化一个实例|`x = MyClass()`|`x.__init__()`|
|作为一个字符串的"官方"表示|`repr(x)`|`x.__repr__()`|
|作为一个字符串|`str(x)`|`x.__str__()`|
|作为字节数组|`bytes(x)`|`x.__bytes__()`|
|作为格式化字符串|`format(x, format_spec)`|`x.__format__(format_spec)`|

- `__init__()`方法在创建实例后调用.如果你想控制创建过程,请使用`__new__()`方法
- 按照惯例, `__repr__()` 应该返回一个有效的Python表达式的字符串
- `__str__()`方法也被称为你的`print(x)`


### 迭代相关

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|遍历一个序列	|`iter(seq)`|`seq.__iter__()`|
|从迭代器中获取下一个值	|`next(seq)`|`seq.__next__()`|
|以相反的顺序创建一个迭代器|`reversed(seq)`|`seq.__reversed__()`|

- `__iter__()`无论何时创建新的迭代器,都会调用该方法.
- `__next__()`每当你从迭代器中检索一下个值的时候,都会调用该方法
- `__reversed__()`方法并不常见.它需要一个现有序列并返回一个迭代器,该序列是倒序的顺序.

### 属性

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|得到一个属性|`x.my_property`|`x.__getattribute__('my_property')`|
|获得一个属性|`x.my_property`|`x.__getattr__('my_property')`|
|设置一个属性|`x.my_property = value`|`x.__setattr__('my_property', value)`|
|阐述一个属性|`del x.my_property`|`x.__delattr__('my_property')`|
|列出所有属性和方法|`dir(x)`|`x.__dir__()`|


- 如果你的类定义了一个`__getattribute__()`方法,Python将在每次引用任何属性或方法名时调用它.
- 如果你的类定义了一个`__getattr__()`方法,Python只会在所有普通地方查找属性后调用它.如果一个实例`x`定义了一个属性 `color`, `x.color`将不会调用`x.__getattr__('color')`; 它将简单地返回已经定义的`x.color`值.
- `__setattr__()`只要你为属性指定值,就会调用该方法.
- `__delattr__()`只要删除属性,就会调用该方法.
- `__dir__()`如果您定义一个`__getattr__()` 或者 `__getattribute__()` 方法,该方法很有用.通常情况下,调用`dir(x)`只会列出常规属性和方法.

__*`__getattr__()`和`__getattribute__()`方法之间的区别很微妙但很重要.*__

### 函数类

通过定义__call__()方法,您可以创建一个可调用类的实例 - 就像函数可调用一样.

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|来"调用"像函数一样的实例|`my_instance()`|`my_instance.__call__()`|

### 行为

如果你的类作为一组值的容器 - 也就是说,如果问你的类是否"包含"一个值是有意义的 - 那么它应该定义下面的特殊方法,使它像一个集合一样.

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|序列的数量|`len(s)`|`s.__len__()`|
|否包含特定的值|`x in s`|`s.__contains__(x)`|

### 字典(映射)

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|通过它的key来获得值|`x[key]`|`x.__getitem__(key)`|
|通过它的key来设置一个值	|`x[key] = value`|`x.__setitem__(key, value)`|
|删除键值对|`del x[key]`|`x.__delitem__(key)`|
|为丢失的key提供默认值|`x[nonexistent_key]`|`x.__missing__(nonexistent_key)`|


### 数字

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|加|`x + y`|`x.__add__(y)`|
|减|`x - y`|`x.__sub__(y)`|
|乘|`x * y`|`x.__mul__(y)`|
|整除|`x / y`|`x.__trueiv__(y)`|
|除|`x // y`|`x.__floordiv__(v)`|
|取余|`x % y`|`x.__mod__(y)`|
|整除与取余|`divmod(x, y)`|`x.__divmod__(y)`|
|平方|`x ** y`|`x.__pow__(y)`|
|左移|`x << y`|`x.__lshift__(y)`|
|友移|`x >> y`|`x.__rshift__(y)`|
|按位and运算|`x & y`|`x.__and__(y)`|
|按位xor或运算|`x ^ y`|`x.__xor__(y)`|
|按位or运算|`x | y`|`x.__or__(y)`|

上述一组特殊方法采用第一种方法:给定`x / y`,它们提供了一种方法让`x`说"我知道如何用`y`整除自己".以下一组特殊方法解决了第二种方法:它们为y提供了一种方法来说"我知道如何成为分母,并将自己整除x".

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|加|`x + y`|`x.__radd__(y)`|
|减|`x - y`|`x.__rsub__(y)`|
|乘|`x * y`|`x.__rmul__(y)`|
|整除|`x / y`|`x.__rtrueiv__(y)`|
|除|`x // y`|`x.__rfloordiv__(v)`|
|取余|`x % y`|`x.__rmod__(y)`|
|整除与取余|`divmod(x, y)`|`x.__rdivmod__(y)`|
|平方|`x ** y`|`x.__rpow__(y)`|
|左移|`x << y`|`x.__rlshift__(y)`|
|友移|`x >> y`|`x.__rrshift__(y)`|
|按位and运算|`x & y`|`x.__rand__(y)`|
|按位xor或运算|`x ^ y`|`x.__rxor__(y)`|
|按位or运算|`x | y`|`x.__ror__(y)`|

可是等等！还有更多！如果你正在进行"就地"操作,如`x /= 3`则可以定义更多特殊的方法.

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|加|`x + y`|`x.__iadd__(y)`|
|减|`x - y`|`x.__isub__(y)`|
|乘|`x * y`|`x.__imul__(y)`|
|整除|`x / y`|`x.__itrueiv__(y)`|
|除|`x // y`|`x.__ifloordiv__(v)`|
|取余|`x % y`|`x.__imod__(y)`|
|整除与取余|`divmod(x, y)`|`x.__idivmod__(y)`|
|平方|`x ** y`|`x.__ipow__(y)`|
|左移|`x << y`|`x.__ilshift__(y)`|
|友移|`x >> y`|`x.__irshift__(y)`|
|按位and运算|`x & y`|`x.__iand__(y)`|
|按位xor或运算|`x ^ y`|`x.__ixor__(y)`|
|按位or运算|`x | y`|`x.__ior__(y)`|

还有一些"单个数"数学运算可以让你自己对类似数字的对象进行数学运算.

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|负数|`-x`|`x.__neg__()`|
|正数|`+x`|`x.__pos__()`|
|绝对值|`abs(x)`|`x.__abs__()`|
|逆|`~x`|`x.__invert__()`|
|复数|`complex(x)`|`x.__complex__()`|
|整数|`int(x)`|`x.__int__()`|
|浮点数|`float(x)`|`x.__float__()`|
|四舍五入到最近的整数|`round(x)`|`x.__round__()`|
|四舍五入到最近的n位数|`round(x, n)`|`x.__round__(n)`|
|最小整数|`math.ceil(x)`|`x.__ceil__()`|
|最大整数|`math.floor(x)`|`x.__floor__()`|
|截断x到0的最接近的整数|`math.trunc(x)`|`x.__trunc__()`|
|数字作为列表索引|`a_list[x]`|`a_list[x.__index__()]`|

### 比较

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|等于|`x == y`|`x.__eq__(y)`|
|不等于|`x != y`|`x.__ne__(y)`|
|小于|`x < y`|`x.__lt__(y)`|
|小于等于|`x <= y`|`x.__le__(y)`|
|大于|`x > y`|`x.__gt__(y)`|
|大于等于|`x >= y`|`x.__ge__(y)`|
|布尔|`if x:`|`x.__bool__()`|

### 序列化

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|对象副本|`copy.copy(x)`|`x.__copy__()`|
|深拷贝|`copy.deepcopy(x)`|`x.__deepcopy__()`|
|序列化一个对象|`pickle.dump(x, file)`|`x.__getstate__()`|
|序列化一个对象|`pickle.dump(x, file)`|`x.__reduce__()`|
|序列化一个对象|`pickle.dump(x, file, protocol_version)`|`x.__reduce_ex__(protocol_version)`|
|取出恢复后的状态|`x = pickle.load(fp)`|`x.__getnewargs__()`|
|取出恢复后的状态|`x = pickle.load(fp)`|`x.__setstate__()`|

### with 语句

with块限定了运行时上下文;在执行with语句时,"进入"上下文,并在执行块中的最后一个语句后"退出"上下文.

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|进入with语句块|`with x:`|`x.__enter__()`|
|退出with语句块|`with x:`|`x.__exit__(exc_type, exc_value, traceback)`|


## 真正深奥的东西

|如果你想...|所以,你写...|Python调用...|
|----------|-----------------|--------------|
|一个类的构造函数|`x = MyClass()`|`x.__new__()`|
|一个类的析构函数|`del x`|`x.__del__()`|
|只有一组特定的属性需要定义|``|`x.__slots__()`|
|hash码|`hash(x)`|`x.__hash__()`|
|获得一个属性的值|`x.color`|`type(x).__dict__['color'].__get__(x, type(x))`|
|设置一个属性的值|`x.color = 'PapayaWhip'`|`type(x).__dict__['color'].__set__(x, 'PapayaWhip')`|
|删除一个属性|`del x.color`|`type(x).__dict__['color'].__del__(x)`|
|一个对象是否是你的一个类的实例|`isinstance(x, MyClass)`|`MyClass.__instancecheck__(x)`|
|一个类是否是你的类的子类|`isinstance(C, MyClass)`|`MyClass.__subclasscheck__(C)`|
|一个类是否是抽象基类的实例|`isinstance(C, MyABC)`|`MyABC.__subclasshook__(C)`|

Python正确调用`__del__()`特殊方法时非常复杂.为了完全理解它,你需要知道Python如何跟踪内存中的对象.这里有一篇关于[Python垃圾收集和类析构函数的好文章](https://www.electricmonk.nl/log/2008/07/07/python-destructor-and-garbage-collection-notes/).你还应该阅读关于[弱引用,weakref模块](https://docs.python.org/3/library/weakref.html),以及可能的[gc模块](https://docs.python.org/3/library/gc.html)以获得更好的度量.
