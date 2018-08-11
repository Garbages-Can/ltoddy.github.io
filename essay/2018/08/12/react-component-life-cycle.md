# 理解React生命周期

react为我们提供了一些组件生命周期的函数（钩子函数），允许我们更新组件UI和状态。
但是他们如何在react中工作的呢？

----------------------------------------------------------------
## `constructor`

`constructor`是一个特殊的函数，是OOP（面向对象编程）的构造函数，当一个对象被创建的时候，这个函数被调用。
当我们的一个类继承了另一个类的时候，有一个非常重要的函数要被调用：`super`，调用此函数的时候，会将父类初始化，
这也是为什么我们可以在我们自己定义的组件中使用`this.props`

同时，构造函数也是最完美的设置组件中字段（变量以`this.`开头）的地方、初始化`state`、接收`props`。
而且这也是唯一设置`this.state`的地方。

#### Do:

- 初始化`state`（`this.state = {}`）

- 将事件处理函数绑定到实例上. (`this.handleClick = this.handleClick.bind(this)`).

#### Don't

- 别做那些有副作用的事情（比如 `AJAX` 等等）

----------------------------------------------------------------
## 被遗弃: `componentWillMount`

这是一个特殊情况 - `componentWillMount`与构造函数没有太大区别 - 它也只在初始安装生命周期中调用一次。

很多人（比如我）想要使用这个在这个函数中发送一些请求去获取数据，并且希望在`render`函数之前准备好数据。
可惜事实并不是这样，虽然请求在`render`之前发生，但是在渲染之前是无法拿到数据的。

####　Do

- 通过`this.setState` 更新状态

- 实现最后一分的优化

- 执行一些有副作用的操作（server端渲染）

#### Don't

- 不要执行一些有副作用的操作（客户端渲染）

----------------------------------------------------------------
## 被遗弃: `componentWillReceiveProps(nextProps)`

在每个更新生命周期中都会调用此函数。
注意的是，父组件被重新渲染的时候，这个函数会调用，即使`props`没有改变。

如果你有一个组件，其`state`部分依赖于从父组件传递的`props`，在这里调用`this.setState`不会引起额外的渲染调用（pretty good）。

#### Do

- 把`state`同步到`props`

#### Don't

- 不要做一些有副作用的操作

----------------------------------------------------------------
## `shouldComponentUpdate(nextProps, nextState, nextContext)`

默认情况下，所有基于类的组件在接收到的`props`，`state`或`context`发生变化时都会重新渲染,

如果重新渲染组件是需要大量计算（例如生成图表）或由于某些性能原因而不推荐，则开发人员可以在更新周期中调用的特殊函数。

这个函数在内部使用`nextProps`, `nextState`, `nextContext`来调用，开发人员可以使用它们来验证是否需要重新渲染，
`return false` 来阻止重新渲染，其他情况要 `return true`

#### Do

- 用于提高性能较差的组件的性能

#### Don't

- 别做有副作用的操作

- 别调用 `this.setState`

----------------------------------------------------------------
## 被遗弃: `componentWillUpdate(nextProps, nextState)`

如果未实现`shouldComponentUpdate`函数，或者它确定组件应在此渲染周期中更新，则将调用另一个生命周期函数。
此函数通常用于在`state`的某些部分基于props时执行`state`和`props`同步。

在实现`shouldComponentUpdate`的情况下，可以使用此函数而不是`componentWillReceiveProps`，因为只有在实际重新渲染组件时才会调用它。

与所有其他`componentWill*`函数类似，此函数可能会在渲染之前多次调用，因此不建议在此处执行导致操作的副作用。

#### Do

- 将state同步到props

#### Don't

- 别做有副作用的操作

----------------------------------------------------------------
## `componentDidUpdate(prevProps, prevState, prevContext)`

这个函数在每次重新渲染周期的 `render` 函数完成之后，这意味着您可以确保组件及其所有子组件已正确渲染。

由于这是唯一保证在每个重新渲染周期中仅被调用一次的函数，因此建议将此函数执行任何引起副作用的操作。

与`componentWillUpdate`和`componentWillReceiveProps`类似，使用`prevProps`, `prevState`, `prevContext`的对象映射调用此函数，
即使这些值没有发生实际的更改。 

#### Do

- 一些有副作用的操作

#### Don't

- 不要调用 `this.setState`，这会造成重新渲染。

----------------------------------------------------------------
## `componentDidCatch(errorString, errorInfo)`

React 16中的新增功能 - 这种生命周期方法的特殊之处在于它可以对子组件中发生的事件作出反应，特别是对任何子组件中发生的任何未捕获的错误做出反应。

通过这种功能，您可以使您的父元素处理错误 - 例如： 在状态中设置错误信息并在其渲染中返回适当的消息，或者打日志：

```jsx
componentDidCatch(errorString, errorInfo) {
  this.setState({
    error: errorString
  });
  ErrorLoggingTool.log(errorInfo);
}
render() {
  if(this.state.error) return <ShowErrorMessage error={this.state.error} />
  return (
    // render normal component output
  );
}
```

发生错误时，将调用该函数：

- errorString: `.toString()` 查看错误信息

- errorInfo: 具有单个字段`componentStack`的对象，它表示堆栈跟踪返回错误发生的位置.

----------------------------------------------------------------
## `componentDidMount`

此函数将在给定组件的整个生命周期中仅调用一次,由于这个函数只被调用一次，因此它是执行任何引起诸如AJAX请求的副作用操作的理想选择。

#### Do

- 执行一些有副作用的操作

#### Don't

- 不要调用 `this.setState` 这会造成重新渲染

----------------------------------------------------------------
## `componentWillUnmount`

如果组件构建了`timers`或`listeners`（`setTimeout`，`setInterval`），或者打开了`socket`等等其他需要移除或者关闭的东西，
如故这些东西不再使用，用这个函数去清除它们。

#### Do

- 删除在组件生命周期中创建的任何`timers`或`listeners`

#### Don't

- 不要调用`this.setState`，或者启动新的`timers`或`listeners`
