# rust的基本类型

`array: [T; N]`: 数组, 长度需要在编译时就确定为非负整数N; 元素的类型T要相同.

`bool`: 布尔类型.

`char`: 字符类型.

`f32, f64`: 32位和64位的浮点数.

`fn`: 表示函数. 例如: fn(usize) -> bool.

`i8, i16, i32, i64`: 8位, 16位, 32位和64位的有符号整数.

`isize`: 表示长度(size)的有符号整数.

`pointer`: 原始, 不安全的指针, 有 *const T 和 *mut T.

`reference`: 索引, 包括被分享的和可变的.

`slice`: 切片. 以动态长度的角度去看一个连续序列, [T].

`str`: 字符串切片.

`tuple`: 长度有限的多类型序列, (T, U, ..).

`u8, u16, u32, u64`: 8位, 16位, 32位和64位的无符号整数.

`usize`: 表示长度(size)的无符号整数.

## 基本类型的size (bytes)

| Type | size_of::\<Type\>() |
|------|--------------------|
| ()   | 0                  |
| u8   | 1                  |
| u16  | 2                  |
| u32  | 4                  |
| u64  | 8                  |
| i8   | 1                  |
| i16  | 2                  |
| i32  | 4                  |
| i64  | 8                  |
| f32  | 4                  |
| f64  | 8                  |
| char | 4                  |


# rust 关键字

`as`: 基本类型变换, 消除某个项中包含的特定trait的歧义性, 或者是重命名`use`和`extern crate`中所用到的项.

`break`: 立刻退出一个循环.

`const`: 常量项以及常量原始指针.

`continue`: 继续下一个循环迭代.

`crate`: 连接外部crate, 或者是一个宏变量以表示宏定义所处于的crate.

`else`: if 和 if let 控制流结构的回退.

`enum`: 定义枚举体.

`extern`: 外部crate, 函数, 以及可变链接.

`false`: 布尔false.

`fn`: 函数定义和函数指针类型.

`for`: 迭代循环; trait impl 语法的一部分; 更高级的生命周期语法.

`if`: 条件分支.

`impl`: 本能和trait实现块.

`in`: for 循环结构的一部分.

`let`: 变量绑定.

`loop`: 无条件的无限循环.

`match`: 模式匹配．

`mod`: 模块声明.

`move`: 使得一个闭包获得它的所有捕获项的所有权.

`mut`: 表示索引中的可变性, 原始指针和模式绑定.

`pub`: 表示struct字段, impl块和模块的公共可见性.

`ref`: 索引绑定.

`return`: 从函数返回.

`Self`: 某类型在实现一个trait时的类型别名.

`self`: 方法标题或当前模块.

`static`: 全局变量或者生命周期为整个程序执行时间.

`struct`: 结构体定义.

`super`: 当前模块的父模块.

`trait`: 特性定义.

`true`: 布尔true.

`type`: 类型别名; 关联类型定义.

`unsafe`: 表示不安全的代码, 功能, 特征和实现.

`use`:　将符号导入作用域．

`where`: type约束条件.

`while`: 条件循环.

`union`: (1.19新增)联合体声明, 与struct不同的是其中所有fields共用存储空间.

# markers

> 在rust中, 可以根据类型(Type) 的固有属性来将它们分类, 这些分类就表现为 特性(trait). 有一些 trait 和 struct 是用来表明类型的某些基本属性的. 例如:

- Send 可以在线程之间传递.

- Sized 在编译时的大小为常量.

- Unsize 可以被转化为动态大小(使用?Sized)．

- Copy 可以通过简单地拷贝数据(bits)来复制. 是Clone的子集. 对String的Copy只会复制指针, 所以String是Clone的而非Copy的.

- Sync 它的引用(references)可以在线程之间安全共享.

- Freeze 编译器内部特性, 用于判断 type 中是否有 UnsafeCell.

- PhantomData<T> (struct) 大小为零的类型, 可以使事物的行为变得像它们拥有了类型为 T 的数据一样.


# Rust 的内置 Traits

- (Partial)-Eq/Ord

PartialEq 定义了部分相等. 这种关系具有对称性(对于该类型的任意a,b, 有 a == b → b == a)以及传递性(对于该类型的任意a,b,c, 有 a == b ∧ b == c → a == c).

PartialOrd 定义了部分顺序, 并通过 Ordering 关系扩展了 PartialEq 的相等性. 这里的 Partial 意味着你的类型的某些实例可能不能被有意义地比较.
PartialOrd 作用于 <, <=, => 和 > 运算符.

- 算数运算符

| Operator | Trait |
|----------|-------|
| a + b    | Add   |
| a - b    | Sub   |
| -a       | Neg   |
| a * b    | Mul   |
| a / b    | Div   |
| a % b    | Rem   |

- 位运算符

| Operator | Trait  |
|----------|--------|
| !a       | Not    |
| a & b    | BitAnd |
| a \| b    | BitOr  |
| a ^ b    | BitXor |
| a << b   | Shl    |
| a >> b   | Shr    |

- Index 和 IndexMut

Index 和 IndexMut traits 制定了对不可变和可变类型的索引操作. 前者是只读的, 后者允许赋值和修改, 即调用一个参数为 &mut 的函数(注意这不一定是 self ).
你可以对任何 collection 类型来实现它们.

- Fn, FnMut 和 FnOnce

`Fn*` 类的 traits 是对调用某些东西的抽象. 它们的差别仅仅是如何处理 self: `Fn` 使用引用, `FnMut` 使用可变引用, `FnOnce` 消费掉它的值(这就是为什么只能被调用一次, 因为之后没有 self 可供调用了).
注意, 这些区别只针对与 self, 与其它任何参数无关. 用可变引用甚至是 owned/moved 的值作为参数来调用 Fn 是完全正确的.

- Display 和 Debug

Display 和 Debug 用于格式化值. 前者是为了产生面向用户的输出, 所以不可以自动派生, 而后者通常会产生类似JSON的表示, 并且可以安全地为大多数类型自动派生.

- Copy 和 Clone

这两个 traits 用于复制对象.

Copy 表明你的类型可以被安全地复制. 这意味这如果你复制了类型的值所在的内存, 就会得到一个新的有效的值, 而不会引用原始数据. 它可以是自动派生的(需要 Clone, 因为根据定义, 所有可 Copy 的类型都可 Clone). 事实上, 从来不需要手动地实现它.

- Drop

Drop trait 的作用是当事物到达范围之外时, 归还所占用的资源. 关于此已经有过很多讨论了, 以及你为什么不应该直接调用它. 不过, 这十分适用于包装 FFI 结构, 它们需要在稍后才被回收, 同时也适用于文件, sockets, 数据库句柄以及厨房水槽.

- Default

Default 用于声明类型的默认值. 它可以被自动派生, 但只适用于所有成员都有 Default 实现的结构.

它在标准库中被许多类型实现了, 并且可以在很多地方使用. 所以如果你的类型有一个可以被认为是"默认"的值, 那么实现这个 trait 是一个好主意.

- Error

Error 是 Rust 中所有表示错误的值的基本 trait. 对Java熟悉的人来说, 相当于是 Throwable, 它们的行为也类似(除了我们既不 catch 也不 throw 它们).

- Hash

哈希是将一包数据减少为单个值的过程，不同的数据哈希后的值依然不同，相同的依然相同，而不需要比较哈希前的数据那么多的位.
在Rust中， Hash trait 表示该类型是否可以被哈希。 请注意，这个特性并不涉及任何有关哈希算法的信息（这是封装在 Hasher trait中），它基本上只是命令这些比特位被哈希.

- Iterator 和它的朋友们

Rust的 for 循环可以遍历所有实现了 IntoIterator 的类型。 是的，这包括Iterator本身。 除此之外， Iterator特性有很多很酷的方法来处理迭代的值，比如filter， map， enumerate， fold， any， all， sum， min等等。
