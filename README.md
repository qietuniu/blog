# 迷你react

## 初始化


```bash
npm init
cnpm install webpack webpack-cli --save-de
npx webpack
cnpm install  --save-dev babel-loader @babel/core @babel/preset-env
cnpm install  --save-dev @babel/plugin-transform-react-jsx
```


## 迷你react
### 基础类Component
通过获取vdom得到组件的虚拟节点，[RENDER_TO_DOM]方法实现vdom渲染成真实dom节点。
react的源码中diff比较和vdom的操作更加细化精准，子元素调换位置时也能判断进行调换位置。此处采用相对简单粗暴的同位置比较的方法，不同时直接替换。

#### isSameNode
比较两个节点是否相同

- 节点标签类型是否相同
- 节点属性对应值是否相同
- 旧节点属性个数是否大于新节点属性个数
- 文本节点时内容是否相同
#### update
当两个节点不同时，主要是真的子元素进行更新操作

- 节点不相同时，新节点直接进行覆盖
- 新节点无子元素时不操作
- 当新节点子元素少于旧节点子元素时，递归调用update方法更新子元素
- 以旧节点子元素尾指针结束的node作为参照物，尾指针的偏移量作为节点偏移量设置一个新的range对象，新节点子元素重新渲染。
- 更新新节点，更新后将此节点设置为旧节点



#### setState

- 当state不是出null外的对象时，直接用新state覆盖并更新
- 否则递归覆盖旧节点后进行更新
```javascript
// 创建私有方法的小技巧：使用symbol
const RENDER_TO_DOM = Symbol('render to dom')

export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
    this._root = null
    this._range = null
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
  get vdom() {
    return this.render().vdom
  }
  // 私有函数进行更新:从取元素变成写进rang内
  [RENDER_TO_DOM](range) {
    this._range = range
    this._vdom = this.vdom
    this._vdom[RENDER_TO_DOM](range)
  }
  // 比较同位置是否是相同节点
  update() {
    // 类型不同，属性不同，旧属性比新属性多，文本节点时内容不同
    let isSameNode = (oldNode, newNode) => {
      if(oldNode.type!== newNode.type) {
        return false
      }
      for(let name in newNode.props) {
        if(newNode.props[name]!==oldNode.props[name]){
          return false
        }
      }
      if(Object.keys(oldNode.props).length > Object.keys(newNode.props).length){
        return false
      }
      if(newNode.type === '#text') {
        if(newNode.content!== oldNode.content) {
          return false
        }
      }
      return true
    }
    let update = (oldNode, newNode) => {
      // 根节点，type，props， child
      // #text content
      if(!isSameNode(oldNode, newNode)) {
        newNode[RENDER_TO_DOM](oldNode._range)
        return 
      }
      newNode._range = oldNode._range

      let newChildren = newNode.vchildren
      let oldChildren = oldNode.vchildren

      if(!newChildren || !newChildren.length) return 
      let tailRange = oldChildren[oldChildren.length - 1]._range

      for(let i = 0; i< newChildren.length; i++) {
        let newChild = newChildren[i]
        let oldChild = oldChildren[i]
        if(i < oldChildren.length) {
          update(oldChild, newChild)
        } else {
          let range = document.createRange()
          range.setStart(tailRange.endContainer, tailRange.endOffset)
          range.setEnd(tailRange.endContainer, tailRange.endOffset)
          newChild[RENDER_TO_DOM](range)
          tailRange = range
        }
      }
    }
    let vdom = this.vdom
    update(this._vdom, vdom)
    this._vdom = vdom
  }
  setState(newState) {
    if (this.state === null || typeof this.state != 'object') {
      this.state = newState
      // debugger
      this.update()
      return
    }
    let merge = (oldState, newState) => {
      for (let p in newState) {
        if (oldState[p] === null || typeof oldState[p] !== 'object') {
          oldState[p] = newState[p]
        } else {
          merge(oldState[p], newState[p])
        }
      }
    }
    merge(this.state, newState)
    this.update()
  }
}
```
### ElementWrapper
非文本节点外的其他组件继承了Component，vdom中补充了子元素的虚拟节点。
#### RENDER_TO_DOM

1. 创建type类型的组件
1. 循环属性名称
   1. 以on开头的方法进行监听，并且设置大小写不敏感
   1. 以className开头的属性更改成class属性并赋值
   1. 其他属性直接setAttribute赋值
3. 循环虚拟子元素并实现RENDER_TO_DOM方法
3.  replaceContent：统一删掉旧元素区域并用新节点占位
```javascript
class ElementWrapper extends Component {
  constructor(type) {
    // 生成一个dom元素
    super(type)
    this.type = type
  }
  get vdom() {
    this.vchildren = this.children.map(child => child.vdom)
    return this
  }
  [RENDER_TO_DOM](range) {
    this._range = range
    let root = document.createElement(this.type)
    for(let name in this.props) {
      let value = this.props[name]
      if (name.match(/^on([\s\S]+)$/)) {
        root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value)
      } else {
        if (name === 'className') {
          root.setAttribute('class', value)
        } else {
          root.setAttribute(name, value)
        }
      }
    }
    if(!this.vchildren){
      this.vchildren = this.children.map(child => child.vdom)
    }
    for(let child of this.vchildren) {
      let childRange = document.createRange()
      childRange.setStart(root, root.childNodes.length)
      childRange.setEnd(root, root.childNodes.length)
      child[RENDER_TO_DOM](childRange)
    }
    replaceContent(range, root)
  }
}

function replaceContent(range, node) {
  range.insertNode(node)
  range.setStartAfter(node)
  range.deleteContents()
  range.setStartBefore(node)
  range.setEndAfter(node) 
}

```
### TextWrapper
文本元素需要创建一个文本节点，删除旧节点后添加。
```javascript
class TextWrapper extends Component {
  constructor(content) {
    super(content)
    this.type = '#text'
    this.content = content
    this._range = null
  }

  get vdom() {
    return this
  }
  [RENDER_TO_DOM](range) {
    this._range = range
    // // 文本节点渲染时时先删除后添加
    let root = document.createTextNode(this.content)
    replaceContent(range, root)
  }
}


```
### createElement
根据节点类型生成相对应组件
```javascript
export function createElement(type, attributes, ...children) {
  let e
  if (typeof type === 'string') {
    e = new ElementWrapper(type)
  } else {
    e = new type()
  }
  for (let p in attributes) {
    e.setAttribute(p, attributes[p])
  }
  const insertChildren = children => {
    for (let child of children) {
      if (typeof child === "string") {
        child = new TextWrapper(child)
      }
      if (child === null) {
        continue
      }
      if ((typeof child === "object") && (child instanceof Array)) {
        insertChildren(child);
      } else {
        e.appendChild(child);
      }
    }
  }

  insertChildren(children);
  return e
}
```
### render
创建rang并缩小范围，调用RENDER_TO_DOM方法进行渲染
```javascript
export function render(component, parentElement) {
  let range = document.createRange()
  range.setStart(parentElement, 0)
  range.setEnd(parentElement, parentElement.childNodes.length)
  range.deleteContents()
  component[RENDER_TO_DOM](range)
}
```
### 使用
```jsx
import { createElement, Component, render } from './toy-react/toy-react'
class MyComponent extends Component{
  constructor() {
    super();
    this.state = {
      a: 1
    }
  }
  render() {
    return <div>
      <h2>my component</h2>
      <h3>{this.state.a.toString()}</h3>
      <button onclick={()=> {this.setState({a:this.state.a+1})}}>add</button>
    </div>
  }
}

render(<MyComponent id='a' class='v'><div>qietu</div></MyComponent>, document.body)
```
## 引申


### webpack


- entry: 指定起始路口。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的；
- output: 编译后输出路径，默认值为 ". /dist", 可设置如何命名。
- mode：设置开发环境(development/production);
- loaders：加载器(用于对模块的源代码进行转换), 描述webpack如何处理非JavaScript模块(webpack自身是只理解JavaScript);
   - presets是去指定babel的快捷方式, presets里面包含多个plugin
- plugins: 插件的范围包括，从打包优化和压缩；



参考官网：[https://www.webpackjs.com/concepts/](https://www.webpackjs.com/concepts/)


### Range对象


表示文档的连续范围区域，简单的说就是高亮选区。一个Range的开始点和结束点可以是任意的，开始点和结束点也可以时候一样的(空Range)；使用场景一般出现在富文本编辑器相关的操作。


1. 创建一个range对象(createRange)
1. 将指定节点的终点位置指定为Range对象所代表区域的起点位置(setStartAfter)
1. 将指定的节点插入到某个Range对象所代表的区域中，插入位置为Range对象所代表区域的起点位置
1. 如果该节点已经存在于页面中，该节点将被移动到Range对象代表的区域的起点处(insertNode)



- createRange（）: 设置临界点
- selectNode() : 选择整个节点，包括子节点
- selectNodeContents()  选择节点的子节点
- setStart() : 设置起始节点，接受两个参数, 一个参照节点，一个节点偏移量
- setEnd() : 设置终点节点，接受两个参数, 一个参照节点，一个节点偏移量
- deleteContents() 这个方法能够从文档中删除范围缩小包含的内容
- extractContents() 会删除并返回文档片段
- CloneContents() 创建范围对象的一个副本，不会影响原来的节点
- insertNode() 向范围选区的开始处插入一个节点
- surroundContents() 环绕范围插入内容



参考网站：[https://developer.mozilla.org/en-US/docs/Web/API/Range](https://developer.mozilla.org/en-US/docs/Web/API/Range)；


### JSX语法如何解析


JSX就是JavaScript和XML结合的一种格式。React发明了JSX，利用HTML语法来创建虚拟DOM。当遇到"<"，JSX就当HTML解析，遇到 “{” 就当JavaScript解析。
JSX语法的本质并不是直接把JSX渲染到页面，而是在内部先转换成了createElement 形式，然后再去渲染的，同时JSX在进行编译成JavaScript代码的时候进行了一定的优化，所以执行效率也更高。


#### @babel/plugin-transform-React-jsx


1. 创建tagNode变量
1. 创建ToyReact.createElement表达式
1. 创建attributes对象
1. 创建React.createElement("div", {},...chidren)表达式
1. 替换node



转化前：


```html
<div>
    <div></div>
    <div></div>
    <div></div>
</div>
```


转化后：


```javascript
React.createElement(
    "div", {},
    React.createElement("div", {}, ...chidren),
    React.createElement("div", {}, ...chidren),
    React.createElement("div", {}, ...chidren)
)
```


### 生命周期


- 组件将要挂载时触发的函数：componentWillMount
- 组件挂载完成时触发的函数：componentDidMount
- 是否要更新数据时触发的函数：shouldComponentUpdate
- 将要更新数据时触发的函数：componentWillUpdate
- 数据更新完成时触发的函数：componentDidUpdate
- 组件将要销毁时触发的函数：componentWillUnmount
- 父组件中改变了props传值时触发的函数：componentWillReceiveProps



componentWillMount和componentWillUpdate在每一个组件render之前都会去调用componentWillMount()，可以在服务端调用也可以在浏览器端调用，如果有异步请求，是不推荐在这个时候去请求数据的，具体原因是在render之前是不会返回数据的。


组件将要更新数据的时候都会触发一次componentWillUpdate()，执行更新操作。


#### 挂载前操作


- 通过setAttribute添加自定义的属性，addEventListener添加事件
- 执行一次render
- 如果有更新操作，就会在update()内会通过对比对更新的元素进行替换；再次render。



### 虚拟DOM


React将DOM抽象为虚拟DOM，用JavaScript模拟一棵DOM树，放在浏览器内存中。当变更时，虚拟DOM使用DIFF算法进行新旧虚拟DOM的比较，将变更放到变更队列中，最终只把变化的部分重新渲染，从而提高渲染效率。


#### 使用场景


虚拟DOM什么时候该用？在我们频繁的微改动DOM的时候，会引起页面的多次渲染，导致影响性能；使用虚拟DOM的时候只需要对比差异，然后修改JS对象(生成的虚拟DOM)，最后把生成的DOM结构插入到页面中，减少渲染的次数，提升整个页面的渲染效率。


参考网站：[你不知道的Virtual DOM（一）：Virtual Dom介绍](https://segmentfault.com/a/1190000016129036)


## 更多链接


- [winter大大课程](https://u.geekbang.org/subject/priorfe?utm_source=baidu-ad&utm_medium=ppzq-pc&utm_term=baidu-ad-ppzq-title&utm_campaign=guanwang&utm_content=title)
- [我读完了React的API，并为新手送上了一些建议](https://cloud.tencent.com/developer/news/662339)
