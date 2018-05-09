# 通过es6的Promise和async/await语法糖将异步变成同步.

在过去的时候,如果代码设计的不好,很容易就出现'回调地狱',因为的所设计的程序,后面的步骤依赖于前面的数据.

例如,一层一层的嵌套:

    ```javascript
    fs.readdir(source, function (err, files) {
        if (err) {
        console.log('Error finding files: ' + err)
        } else {
        files.forEach(function (filename, fileIndex) {
            console.log(filename)
            gm(source + filename).size(function (err, values) {
            if (err) {
                console.log('Error identifying file size: ' + err)
            } else {
                console.log(filename + ' : ' + values)
                aspect = (values.width / values.height)
                widths.forEach(function (width, widthIndex) {
                height = Math.round(width / aspect)
                console.log('resizing ' + filename + 'to ' + height + 'x' + height)
                this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
                    if (err) console.log('Error writing file: ' + err)
                })
                }.bind(this))
            }
            })
        })
        }
    })
    ```

举一个简单的异步例子:

    ```javascript
    const fs = require('fs');

    fs.readFile('index.js', (err, data) => console.log(data.toString()));
    console.log('start read file')
    ```

你可以看到 "start read file" 被先打印出来,

有人可能不明白什么异步,简单说一下异步,异步调用就是那个函数被立即返回,然后执行后面的程序.
如上面这个程序readFile运行后,然后他立即"返回",然后后面的那行console.log被执行.

其他语言的话:

    ```python
    fp = open('index.js')
    data = fp.read()
    print(data)
    ```

注意看差异,同样的读取文件的函数,读取到数据后,异步是把数据交给callback(回调函数来处理),
而同步代码是定义了一个新变量,把read文件中的内容作为返回值给新变量(data).

为什么会这样,因为是异步操作,在未来的某个时刻(这个时间你服务掌握)才拿到.所以就通过回调的方式来处理结果了.

如今es6中有了Promise这个东西,可以把回调变得好看一些:

    ```javascript
    const fs = require('fs');

    function readSync() {
        return new Promise((resolve, reject) => {
            fs.readFile('index.js', (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    }

    readSync()
        .then(data => data.toString())
        .then(data => console.log(data))
        .catch(reason => console.error(reason));
    console.log('start read file')
    ```

这里新构建了一个函数readSync包装了一下,让它返回一个Promise.
(如果你没了解过Promise,[请去阅读MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise))

最后借助es6给出的async/await语法糖,将让异步等待,变成同步.

    ```javascript
    const fs = require('fs');

    function readSync() {
        return new Promise((resolve, reject) => {
            fs.readFile('index.js', (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    }

    async function readAsync() {
        const data = await readSync();
        console.log(data.toString());
    }

    readAsync();
    console.log('end ...');
    ```

这里,有新增加了一个函数:readAsync,借助async/await语法糖,这样就变成同步代码了.

.then()方法中的数据变成了返回值.


不过Prmoise中他的prototype中有一个all方法:

> Promise.all(iter)

如果你在一个函数中有多个await,这个样子线程阻塞,很耗费时间,Promise.all方法,可以将多个await变成并行的去await.
