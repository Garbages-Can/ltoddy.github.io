# Overview of Blocking vs Non-Blocking

本篇综述涵盖了Node.js中 阻塞(blocking)调用与非阻塞(non-blocking)调用之间的区别.本文会涉及到事件循环和 libuv 库,但是你无需提前了解它们.

*"I/O" 一词主要指的是与系统磁盘和基于 libuv 库的网络进行交互.*

## 阻塞(Blocking)

阻塞是指当Node.js想执行其他JavaScript时,进程必须等待一个非JavaScript操作的完成.这种现象的发生是因为当一个阻塞操作出现时,事件循环无法继续执行JavaScript.

在Node.js中,由CPU密集计算而不是等待非JavaScript操作(如I/O)导致JavaScript性能较差的现象,通常不被称为阻塞.Node.js标准库中使用了 libuv 库的同步方法是最常用的阻塞操作.

Node.js标准库中所有的I/O方法都提供了异步的版本, 这些异步版本是非阻塞的, 并且会接收回调函数. 有的方法还提供了阻塞的版本, 这些方法的名字以 Sync 结尾.

## 比较代码

阻塞方法会同步执行, 非阻塞方法会异步执行.

以文件系统模块为例, 以下是一个同步读取文件的操作:

    ```javascript
    const fs = require('fs');
    const data = fs.readFileSync('/file.md'); // blocks here until file is read
    ```

而下面则是一个等价操作的异步版本:

    ```javascript
    const fs = require('fs');
    fs.readFile('/file.md', (err, data) => {
      if (err) throw err;
    });
    ```

第一个例子看上去好像比第二个简单, 但它的缺点在于其第二行代码会在整个文件读取完成之前一直阻塞其他JavaScript代码的执行. 要注意的是, 在同步版本中, 如果有异常被抛出, 那么异常需要被捕获, 否则进程就会崩溃. 而在异步版本中, 是否将异常抛出是由该方法的作者决定的.

让我们把示例代码扩展一下:

    ```javascript
    const fs = require('fs');
    const data = fs.readFileSync('/file.md'); // blocks here until file is read
    console.log(data);
    // moreWork(); will run after console.log
    ```

下面则是一个相似但不完全与上面等价的例子:

    ```javascript
    const fs = require('fs');
    fs.readFile('/file.md', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    // moreWork(); will run before console.log
    ```

在第一个例子中, console.log() 会在 moreWork() 之前被调用. 在第二个例子中, fs.readFile() 是非阻塞的, 因此JavaScript可以继续执行, 
moreWork() 就会在 console.log() 之前被调用. 这种无需等待文件读取完成而直接执行 moreWork() 的能力是一个关键的设计, 这种设计使得Node.js可以有更高的吞吐量.

## 并发与吞吐量

Node.js中的JS是单线程执行的, 因此这里的并发指的是事件循环在其他操作完成之后执行JS回调函数的能力.
任何希望以并发方式运行的代码都必须允许事件循环以非JavaScript操作继续运行, 比如I/O.

作为例子, 我们思考这样一个场景: 每个访问web服务器的请求需要花费50ms完成, 其中有45ms是可以异步进行的数据库I/O操作. 
使用 非阻塞 的异步操作可以省掉每个请求中的45ms来处理其他请求. 这就是选择非阻塞而不是阻塞方法产生的重大性能差别.

很多其他语言是通过创建新线程来处理并发的, 事件循环和这种模式不同.

## 混用阻塞和非阻塞代码的危害

在处理I/O时, 有一些需要避免的模式, 看下面的例子:

    ```javascript
    const fs = require('fs');
    fs.readFile('/file.md', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    fs.unlinkSync('/file.md');
    ```

在上面例子中, fs.unlinkSync() 可能会在 fs.readFile() 之前执行, 这会导致 file.md 文件在被读取之前就被删掉了.
一个完全非阻塞并且能保证正确执行顺序的更好方法是:

    ```javascript
    const fs = require('fs');
    fs.readFile('/file.md', (readFileErr, data) => {
      if (readFileErr) throw readFileErr;
      console.log(data);
      fs.unlink('/file.md', (unlinkErr) => {
        if (unlinkErr) throw unlinkErr;
      });
    });
    ```

这段代码使用了非阻塞的 fs.unlink() 并把它放在 fs.readFile() 的回调里, 这保证了正确的执行顺序.
