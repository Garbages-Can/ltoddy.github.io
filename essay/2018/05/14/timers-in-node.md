# Timers in Node.js and beyond

Node.js的定时器模块中含有这样的方法,它们可以设定在指定时间之后执行某些代码. 
定时器函数不需要通过 require() 导入,它们是全局可访问的,这是为了和浏览器中的JavaScript API保持一致.

用Node.js控制时间连续体(Time Continuum)

Node.js的API提供了几种方式来实现在当前时刻过后的某个时间点执行某些代码. 下面的几个函数很常见, 因为绝大多数浏览器中都有,
但实际上Node.js对这些函数有着自己的实现方式. 定时器和操作系统密切相关, 尽管Node.js的API仿照了浏览器中的API, 但在具体实现上有些不同.

### setTimeout()

setTimeout()用于设定在指定的毫秒数之后执行某些代码.这个函数和浏览器中的JavaScript API window.setTimeout() 类似, 然而Node.js的 setTimeout() 不能传入字符串形式的代码.

setTimeout() 的接收的第一个参数是要延迟执行的回调, 第二个参数是要延迟的毫秒数. 还可以传入更多的参数, 多出来的这些参数会被传入回调函数., 例如:

    ```javascript
    function myFunc(arg) {
      console.log(`arg was => ${arg}`);
    }

    setTimeout(myFunc, 1500, 'funky');
    ```

由于使用了 setTimeout(), 上例中的 myFunc() 将会在1500ms之后尽可能早地执行.

不能够依赖设定的超时间隔来实现在精确的毫秒数之后就执行某些代码. 这是因为其他正在执行的阻塞或持续占用事件循环的代码会导致所设定函数推迟执行.
唯一能保证的是所设定的函数不会在设定的超时间隔之前执行.

setTimeout() 返回一个用来引用所设置的超时任务 Timeout 对象. 这个对象可以用来取消超时任务(见下方的 clearTimeout()),
也可以改变执行任务时的行为(键下方的 unref()).

### setImmedate()

setImmedate() 可以设置要在本次事件循环结束时执行的代码. 这些代码将会在本次事件循环的所有I/O操作之后, 且在下次事件循环的所有定时器之前执行. 这种代码的执行可以认为是”在这之后”立刻发生的, 也就是说所有紧随 setImmedate() 之后的函数调用会在 setImmedate() 所设定的回调函数之前执行.

setImmedate() 的第一个参数是即将被执行的回调函数, 所有之后的参数都将被传入回调函数, 例如:

    ```javascript
    console.log('before immediate');

    setImmediate((arg) => {
      console.log(`executing immediate: ${arg}`);
    }, 'so immediate');

    console.log('after immediate');
    ```

上面被传入 setImmedate() 的回调会在所有可执行代码执行完成之后才被调用, 运行上述代码控制台输出为:

    ```
    before immediate
    after immediate
    executing immediate: so immediate
    ```

setImmedate() 返回一个用于取消该任务的 Immedate 对象(见下方 clearImmediate()).

注意: 不要把 setImmedate() 和 process.nextTick() 搞混了. 它们之间有几点主要的差异:

- process.nextTick() 会在所有 setImmedate() 设定的回调和所有I/O之前执行

- process.nextTick() 是不可清除的, 也就是说一旦使用 process.nextTick() 设置了回调, 就无法再取消了.

### setInterval()

如果需要定期多次执行一些代码, 用 setInterval() 可以做到. setInterval() 接收一个回调函数作为第一个参数,
接收一个毫秒数的时间间隔作为第二个参数, 然后每过时间间隔就执行一次回调函数.就像 setTimeout() 一样, 额外的参数会被传入回调函数,
而且延迟时间也和 setTimeout() 一样无法保证精确, 因为可能有其他操作持续占用事件循环, 因此这个时间间隔应认为是近似间隔. 例如:

    ```javascript
    function intervalFunc() {
      console.log('Cant stop me now!');
    }

    setInterval(intervalFunc, 1500);
    ```

在上面例子中, intervalFunc 大概每1500ms执行一次, 一直到它被取消(详情见下文).

## 清除将来要执行的任务

如果需要取消 Timeout 或 Immediate 将来的执行该怎么办? setTimeout(), setImmediate() 和 setInterval() 会返回引用该 Timeout 或 Immediate 的对象.
通过把刚刚提到的那些对象传入相应的 clear 函数并执行, 那些对象就会被彻底停止. 这几个函数是 clearTimeout(), clearImmediate() 和 clearInterval().
看下面的例子:

    ```javascript
    const timeoutObj = setTimeout(() => {
      console.log('timeout beyond time');
    }, 1500);

    const immediateObj = setImmediate(() => {
      console.log('immediately executing immediate');
    });

    const intervalObj = setInterval(() => {
      console.log('interviewing the interval');
    }, 500);

    clearTimeout(timeoutObj);
    clearImmediate(immediateObj);
    clearInterval(intervalObj);
    ```

## 把Timeouts放在后面

setTimeout() 和 setInterval() 返回的 Timeout 对象提供了 unref() 和 ref() 两个方法用以增强该对象的行为.
如果有一个使用 set 函数设置的 Timeout 对象, unref() 方法可以在该对象上被调用.
这会稍微改变对象的行为: 如果该 Timeout 是最后要执行的代码, 则不去调用该 Timeout. 此时的 Timeout 对象不会保持进程为活动状态, 会等待被调用.

以此类推, 对于一个调用过 unref() 的 Timeout 对象, 可以调用它的 ref() 对象来撤销 unref() 所导致的改变, 这会使该 Timeout 对象稍后又可以被调用.
然而要明白的是, 由于性能原因, 这种做法无法精确地恢复到最初的行为. 例子如下:

    ```javascript
    const timerObj = setTimeout(() => {
      console.log('will i run?');
    });

    // if left alone, this statement will keep the above
    // timeout from running, since the timeout will be the only
    // thing keeping the program from exiting
    timerObj.unref();

    // we can bring it back to life by calling ref() inside
    // an immediate
    setImmediate(() => {
      timerObj.ref();
    });
    ```
