# The Node.js Event Loop, Timers, and process.nextTick()

## 什么是事件循环(event loop):

事件循环允许Node.js通过尽可能地分流对系统内核的操作, 来执行 非阻塞 的I/O操作, 即使JavaScript是单线程的.

大多数现代的系统内核都是多线程的, 他们在后台可以处理多个同时执行的操作. 当其中一个操作完成时, 系统内核会通知Node.js,
然后与之相关的回调函数会被加入到 poll队列 并且最终被执行. 对此本文稍后会详细解释.

## 事件循环说明

当Node.js开始运行时,它会初始化事件循环,并执行提供给它的可能调用了异步API,设置定时器,或调用了process.nextTick()的脚本代码,然后开始处理事件循环.

下面的图解展示了一个简化后的事件循环操作顺序概览.

    ```
       ┌───────────────────────────┐
    ┌─>│           timers          │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    │  │     pending callbacks     │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    │  │       idle, prepare       │
    │  └─────────────┬─────────────┘      ┌───────────────┐
    │  ┌─────────────┴─────────────┐      │   incoming:   │
    │  │           poll            │<─────┤  connections, │
    │  └─────────────┬─────────────┘      │   data, etc.  │
    │  ┌─────────────┴─────────────┐      └───────────────┘
    │  │           check           │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    └──┤      close callbacks      │
       └───────────────────────────┘
    ```

*提示:每个方格中的内容都是Node.js事件循环的一个阶段.*

每个阶段都有一个先进先出(FIFO)的队列, 里面存放着将要执行的回调函数. 然而每个阶段都有其特殊之处, 通常来讲, 当事件循环进入了某个阶段后,
它可以执行该阶段特有的任意操作, 然后执行该阶段的任务队列中的回调函数, 一直到队列为空或已执行回调的数量达到了允许的最大值.
当队列为空或已执行回调的数量达到了允许的最大值时, 事件循环会进入下一阶段.

由于这些操作中的任意一个都可以调度 更多的 操作, 在 poll(轮询) 阶段处理的新事件被系统内核加入队列, 当轮询事件正在被处理时新的轮询事件也可以被加入队列.
因此, 长时间运行的回调函数可以让 poll 阶段运行的时间比 timer(计时器) 的阈值长得多. 查看 timer 和 poll 部分了解更多细节.

*注意: 在Windows和Unix/Linux实现之间存在一点小小的差异.*

## 阶段概述:

- **timers**: 此阶段执行那些由 setTimeout() 和 setInterval() 调度的回调函数.
- **pending callbacks**: 此阶段会执行几乎所有的回调函数, 除了 close callbacks(关闭回调) 和 那些由 timers 与 setImmediate() 调度的回调.
- **idle,prepare**: 此阶段只在内部使用.
- **poll**: 检索新的I/O事件; 在恰当的时候Node会阻塞在这个阶段.
- **check**: setImmediate() 设置的回调会在此阶段被调用.
- **close callbacks**: 诸如 socket.on('close', ...) 此类的回调在此阶段被调用

在事件循环的每次运行之间, Node.js会检查它是否在等待异步I/O或定时器, 如果没有的话就会自动关闭.

## 详细说明每个阶段:

### timers (定时器阶段)

一个定时器会指定一个时间阈值, 给定的回调可能会在这个阈值之后执行, 而不是在那个精确的时间阈值点执行.
定时器回调将会在给定的时间之后尽可能早地执行; 然而操作系统调度或其他回调的执行可能会延迟定时器回调的执行.

*注意:从技术上来讲, poll阶段 会控制定时器何时被执行.*

假如说, 你设定了一个100ms后执行的定时器, 然后你的脚本开始执行一个耗时95ms的异步读取文件的操作:

    ```javascript
    const fs = require('fs');

    function someAsyncOperation(callback) {
        // 假设这个任务花费95ms完成
        fs.readFile('/path/to/file', callback);
    }

    const timeoutScheduled = Date.now();

    setTimeout(() => {
        const delay = Date.now() - timeoutScheduled;

        console.log(`${delay}ms hava passed since I was scheduled.`);
    }, 100);

    // do someAsyncOperation which takes 95ms to complete.
    someAsyncOperation(() => {
        const startCallback = Date.now();

        // do something that will take 10ms...
        while (Date.now() - startCallback < 10) {
            // do nothing
        }
    });
    ```

当事件循环进入 poll 阶段, 它有一个空队列(fs.readFile()还未完成), 所以它会等待剩余的ms数一直到最近的定时器时间阈值之后. 
当它等待了95ms之后, fs.readFile()完成了文件读取并且那个要耗时10ms才能完成的回调被加入 poll 队列并且执行.
当这个耗时10ms的回调执行结束后, 队列里没有回调了, 因此事件循环会发现最近的定时器时间阈值已经过去了, 然后它返回 timers 阶段执行定时器回调.
在这个例子中, 你会发现在设定定时器和该定时器回调被执行之间的时间间隔为105ms.

*注意: 为了防止 poll 阶段阻塞事件循环, libuv(一个实现了Node.js事件循环和Node.js平台所有异步行为的C语言库), 有一个严格的最大限制(这个值取决于操作系统),在超过此限制后就会停止轮询.*

### pending callbacks (等待处理回调阶段)

此阶段执行一些系统操作(如各种TCP错误)的回调. 举个例子, 如果一个TCP socket在尝试连接时收到 ECONNREFUSED 错误, 一些 *nix 系统会等待报告该错误.
这些操作会被添加到队列并在 pending callbacks 阶段执行.

### poll (轮询)

poll 阶段有两个主要功能:

- 执行时间阈值已过去的定时器回调, 然后
- 处理 poll 队列中的事件.

当事件循环进入 poll 阶段并且 当前没有定时器时, 以下两种情况的其中一种将会发生:

- 如果 poll 队列 不是空的, 事件循环会遍历队列并同步地执行里面的回调函数, 一直到队列变为空或者达到操作系统的限制(操作系统规定的连续调用回调函数的数量的最大值).

- 如果 poll 队列时空的, 则以下两种情况的其中一种将会发生:
    - 如果存在被 setImmediate() 调度了的回调, 事件循环会结束 poll 阶段并进入 check 阶段执行那些被 setImmediate() 调度了的回调.
    - 如果没有任何被 setImmediate() 调度了的回调, 事件循环会等待回调函数被加入队列. 一旦有回调函数加入了队列, 就立即执行他们.

一旦 poll 队列变为空, 事件循环就检查是否存在已经过了时间阈值的定时器. 如果存在, 时间循环将绕回到 timers 阶段执行这些定时器回调.

### check

此阶段允许开发者在 poll 阶段完成后立即执行回调函数. 如果 poll 阶段变为空转(idle)状态并且已存在被 setImmediate() 加入队列的回调,
事件循环可能会进入 check 阶段而非继续等待.

setImmediate() 实际上是一个特殊的定时器, 它设定的回调在事件循环的一个单独的阶段执行. 它使用了一个 libuv 库的API,
这个API在 poll 阶段完成之后才会执行回调.

一般来讲, 随着代码的执行, 事件循环终究会进入 poll 阶段, 在此阶段事件循环会等待连接或请求等等. 然而,
如果存在已被 setImmediate() 设定的回调并且 poll 阶段变为空转状态, 事件循环就会停止空转并进入 check 阶段, 而不是一直等待 poll 事件.

### close callbacks

如果一个socket或句柄被突然关闭(例如 socket.destroy()), 'close'事件会在此阶段被触发. 否则 'close'事件会通过 process.nextTick() 被触发.

## setImmediate() vs setTimeout()

setImmediate() 和 setTimeout() 有些类似, 但调用的时机不同, 它们的行为方式也不同.

- setImmediate() 被设计为: 一旦当前的 poll 阶段完成就执行回调.

- setTimeout() 调度一个回调在时间阈值之后被执行.

这两种定时器的执行顺序可能会变化, 这取决于他们是在哪个上下文中被调用的. 如果两种定时器都是从主模块内被调用的,
那么回调执行的时机就受进程性能的约束(进程也会受到系统中正在运行的其他应用程序的影响).

例如, 如果执行下面这段没有处于I/O周期(即主模块)之内的脚本, 这两种定时器回调的执行顺序就是不确定的, 因为它受进程性能的约束:

    ```javascript
    // timeout_vs_immediate.js
    setTimeout(() => {
        console.log('timeout');
    }, 0);

    setImmediate(() => {
        console.log('immediate');
    });
    ```

    ```
    $ node timeout_vs_immediate.js
    timeout
    immediate

    $ node timeout_vs_immediate.js
    immediate
    timeout
    ```

但如果把这两个调用放在一个I/O周期中, 那么 setImmediate() 的回调总是首先执行:

    ```
    $ node timeout_vs_immediate.js
    immediate
    timeout

    $ node timeout_vs_immediate.js
    immediate
    timeout
    ```

相比于 setTimeout(), 使用 setImmediate() 的主要优点在于: 只要时在I/O周期内, 不管已经存在多少个定时器, setImmediate()设置的回调总是在定时器回调之前执行.

### process.nextTick()

#### 理解 process.nextTick()

或许你已经注意到 process.nextTick() 并没有在上面的事件循环图解中列出来, 即使它也是异步API的一部分.
这是因为从技术上来讲, process.nextTick() 不属于事件循环的一部分. 事实是不管当前处于事件循环的哪个阶段, 在当前操作完成后, *nextTickQueue* 队列就会被处理.

回头看事件循环图解, 任何时候在给定的阶段调用 process.nextTick() 时, 所有传入 process.nextTick() 的回调都会在事件循环继续之前被执行.
这会导致糟糕的情况, 因为它允许开发者通过递归调用 process.nextTick() 来阻塞I/O操作, 这也使事件循环无法到达 poll 阶段.

#### 为什么要允许这种情况存在?

为什么Node.js允许这类情况存在? 一部分原因是它的设计哲学: API应该始终是异步的, 即使在不必要的地方也是如此.
以下面的代码片段为例:

    ```javascript
    function apiCall(arg, callback) {
        if (typeof arg !== 'string') {
            return process.nextTick(callback, new TypeError('argument should be string.'));
        }
    }
    ```

这段代码会检查参数类型, 如果类型不正确就会把一个异常传入callback函数. 最近API更新之后, 允许向 process.nextTick() 传递多个参数,
在callback函数之后的那些参数将会作为callback函数的参数, 这样就无需嵌套函数了.

我们所做的是传递一个异常给用户, 但只有在我们允许执行剩余的用户代码时才会传递这个异常. 通过使用 process.nextTick(),
可以确保 apiCall() 总是在剩余的用户代码之后并且在事件循环被允许进入下一阶段之前执行callback函数.
为了实现这一点, JS调用栈被允许进行栈展开(译者注: stack unwinding, 抛出异常时，将暂停当前函数的执行，开始查找匹配的catch子句.
首先检查throw本身是否在try块内部，如果是，检查与该try相关的catch子句，看是否可以处理该异常.
如果不能处理，就退出当前函数，并且释放当前函数的内存并销毁局部对象，继续到上层的调用函数中查找，直到找到一个可以处理该异常的catch.
这个过程称为栈展开, 即stack unwinding。当处理该异常的catch结束之后，紧接着该catch之后的点继续执行), 然后立即执行提供的回调,
这个回调允许开发者递归调用 process.nextTick(), 而不会触发 RangeError: Maximum call stack size exceeded from v8 这个异常.

这种设计哲学会导致一些潜在的有问题的状况. 以下面的代码片段为例:

    ```javascript
    let bar;

    // this has an asynchronous signature, but calls callback synchronously
    function someAsyncApiCall(callback) {
      callback();
    }

    // the callback is called before `someAsyncApiCall` completes.
    someAsyncApiCall(() => {
      console.log('bar', bar); // undefined
    });

    bar = 1;
    ```

用户定义了 someAsyncApiCall() 函数, 从函数名看像是异步, 但实际的函数内时同步操作.
当它被调用时, 提供给它的回调函数会在与 someAsyncApiCall() 相同的事件循环阶段中被调用, 因为 someAsyncApiCall() 实际上没有进行任何异步操作.
结果就是, 回调函数试图引用变量 bar, 尽管在它的作用域中还没有那个变量, 因为这段代码无法执行完.

通过把回调放进 process.nextTick(), 代码仍然具有执行到完成的能力, 并且使得所有的变量与函数等在回调被调用之前就被初始化了.
它还有个优点是可以阻止事件循环继续运行. 这对于想在事件循环被允许继续执行之前向用户通知错误信息是有用的.
以下是将上面的例子用 process.nextTick() 改写后的代码:

    ```javascript
    let bar;

    function someAsyncApiCall(callback) {
      process.nextTick(callback);
    }

    someAsyncApiCall(() => {
      console.log('bar', bar); // 1
    });

    bar = 1;
    ```

以下是另一个真实场景中的代码示例:

    ```javascript
    const net = require('net');

    const server = net.createServer(() => {}).listen(8080);

    server.on('listening', () => {});
    ```

只有当一个端口传入时, 这个端口会立刻被绑定. 因此, 'listening' 事件的回调会立即被调用. 问题在于 .on('listening') 设置的回调在'listening' 事件触发时还未被设置为回调.

为避免这种情况, 'listening' 事件会加入一个 nextTick() 的队列, 这样就使得代码能够执行到完成. 这样就使得用户可以添加他们需要的事件处理函数了.

### process.nextTick() vs setImmediate()

就用户而言, 我们有两个相似的函数, 但它们的名字令人迷惑.

- process.nextTick() 在同一阶段立刻触发

- setImmediate() 在事件循环的下一个迭代或”tick”中触发

实际上, 这两个名字应该交换一下. process.nextTick() 会比 setImmediate() 更立即触发, 这是一个历史遗留问题, 而且不太可能去更改.
因为如果修改的话, NPM上的很大一部分包将会失效, 且每天都会有很多新的包添加到NPM, 这意味着会导致更多潜在性的包失效现象会发生.
因此虽然它们的名字令人迷惑, 这两个名字也不会改变了.

*我们建议开发者始终使用 setImmediate(), 因为它更容易推理(而且它也使代码能兼容更多的环境, 例如浏览器中的JS.).*

### 为什么使用process.nextTick()?

主要有两个原因:

- 它允许用户处理错误, 清除后面不再需要的资源, 或者在时间循环继续运行之前重新发送请求.

- 有时候, 允许一个回调函数在调用栈展开之后并且时间循环继续运行之前运行是很有必要的.

一个例子就是要满足用户的期望. 代码如下:

    ```javascript
    const net = require('net');

    const server = net.createServer();
    server.on('connection', (conn) => {});

    server.listen(8080);
    server.on('listening', () => {});
    ```

listen() 在事件循环开始时就执行了, 但是监听事件的回调放在了 setImmediate() 中. 除非传入了一个主机名, 否则会立即绑定端口.
对于事件循环的向前执行, 它必然会到达 poll 阶段, 这也意味着可能会接收到一个连接, 并且允许连接(connection)事件在监听(listening)事件之前被触发.

另一个例子是运行一个构造函数, 它继承自 EventEmitter 并且想在构造函数内部触发一个事件:

    ```javascript
    const EventEmitter = require('events');
    const util = require('util');

    function MyEmitter() {
      EventEmitter.call(this);
      this.emit('event');
    }

    util.inherits(MyEmitter, EventEmitter);

    const myEmitter = new MyEmitter();
    myEmitter.on('event', () => {
      console.log('an event occurred!');
    });
    ```

你无法在那个构造函数内部立即触发事件, 因为那个时候代码还未处理到你为该事件设置回调函数的地方.
因此, 在那个构造函数内部你可以用 process.nextTick() 设定一个用于触发事件的回调, 这个回调在构造函数执行完成后会执行, 这样就可以达到预期效果:

    ```javascript
    const EventEmitter = require('events');
    const util = require('util');

    function MyEmitter() {
      EventEmitter.call(this);


      // use nextTick to emit the event once a handler is assigned
      process.nextTick(() => {
        this.emit('event');
      });
    }

    util.inherits(MyEmitter, EventEmitter);

    const myEmitter = new MyEmitter();
    myEmitter.on('event', () => {
      console.log('an event occurred!');
    });
    ```
