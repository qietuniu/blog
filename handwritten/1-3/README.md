# call解析

call()方法调用具有给定this值和参数的函数,特点如下：
- 改变this指向（this是方法）
- 默认上下文是window
- 处理传入参数
- 结果要返回

## 指向

``` JS
var a = { value: 1}
function b() { console.log(this.value)}
b.call(a) // 1

// 改造
var a = { 
  value: 1,
  b: function() { console.log(this.value)}
}

a.b() // 1
```

当方法b作为对象a的属性时，b可以拿到value的值。
- 将函数b设为对象a的属性
- 执行函数
- 删除对象a中的b属性

``` JS
a.fn = b
a.fn()
delete a.fn
```

## 传参

参数需要拿到除了第一个参数外的其他所有参数，不定参数有下面几种写法, 方法1/2快捷，方法3兼容好（call是es3的方法使用es5以上方法实现兼容有问题）
``` JS
// 1
const args = Array.from(arguments).slice(1)

// 2
const args = [...arguments].slice(1);

// 3
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
}
eval('context.fn(' + args +')');

```
## symbol

避免出现与方法同名参数，可以使用symbol
- symbol是一种基本数据类型。
- Symbol()函数会返回symbol类型的值，此值是唯一的。
- 一个symbol值能作为对象属性的标识符（这是该数据类型仅有的目的）。
- 不支持语法 new Symbol();通过Symbol([description])创建symbol值。围绕原始数据类型创建一个显式包装器对象从 ECMAScript 6 开始不再被支持。（现有的包装器对象如new Boolean,new String,new Number因为历史遗留原因仍可被创建）

``` JS
var sym1 = Symbol('foo');
var sym2 = Symbol('foo');
sym1 == sym2 //false
sym2.toString();//"Symbol('foo')"
```

## 手写
``` JS
Function.prototype.myCall = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let ctx = context || window;
  const fn = Symbol('fn');
  ctx[fn] = this;

  const args = [...arguments].slice(1);
  const result = ctx[fn](...args);  
  delete ctx[fn];
  return result;
}
```
