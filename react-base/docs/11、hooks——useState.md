useState的作用是用来声明状态变量

- 通过在函数组件里调用它来给组件添加一些内部 state,React 会在重复渲染时保留这个 state
- useState 会返回一对值：**当前状态**和一个更新它的函数 ，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 **this.setState**，但是它**不会合并**把新的 state 和旧的 state 
- useState 唯一的参数就是**初始 state**
- 返回一个 state，以及更新 state 的函数

- - 在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同
  - setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列



### 每次渲染都是独立的闭包

- 每一次渲染都有它自己的 Props and State
- 每一次渲染都有它自己的事件处理函数
- alert会“捕获”我点击按钮时候的状态。
- 我们的组件函数每次渲染都会被调用，但是每一次调用中number值都是常量，并且它被赋予了当前渲染中的状态值
- 在单次渲染的范围内，props和state始终保持不变





## 思考题

#### 函数组件的useState和类组件的setState有什么区别?



#### 为什么useState返回是数组而不是对象？

根据解构赋值，对象的属性定死的，在解构对象的时候必须要和 useState 内部实现返回的对象同名，想要使用多次的话，必须得设置别名才能使用返回值，而数组可以重命名。

支持对象的话必须得让对象具有 iterable 特性

```js
function createIsomorphicDestructurable(obj, arr) {
  
  const clone = { ...obj }
  
  Object.defineProperty(clone, Symbol.iterator, {
    enumerable: false,
    value() {
      let index = 0
      return {
        next: () => ({
          value: arr[index++],
          done: index > arr.length,
        })
      }
    }
  })

  return clone
}

const foo = { name: 'foo' }
const bar = 1024

const obj = createIsomorphicDestructurable(
  { foo, bar },
  [ foo, bar ]
)

let { foo: foo1, bar: bar1 } = obj // foo1 的值为: { name: 'foo'}， bar1 的值为：1024
let [ foo2, bar2 ] = obj // foo2 的值为: { name: 'foo'}， bar2 的值为：1024
```



https://zhuanlan.zhihu.com/p/268537903

