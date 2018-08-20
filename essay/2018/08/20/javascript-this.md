## 关于 JavaScript 的 this 

```javascript
function foo() {
  console.log(this.bar);
}

var bar = 'global';

var obj1 = {
  bar: 'obj1',
  foo: foo
};

var obj2 = {
  bar: 'obj2'
};

foo();
obj1.foo();
foo.call(obj2);
new foo();
```

- 在非严格模式下， `foo()` 最后会将 `this` 设置为全局对象。在严格模式下，这是未定义的行为，在访问bar属性时会出错——因此 `"global"` 是 `this.bar` 创建的值。

- `obj1.foo()` 将 `this` 设置为对象 `obj1`。

- `foo.call(obj2)` 将 `this` 设置为对象 `obj2`。

- `new foo()` 将 `this` 设置为一个全新的空对象。
