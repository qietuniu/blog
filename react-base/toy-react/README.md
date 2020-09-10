## 初始化

``` base
npm init
cnpm install webpack webpack-cli --save-de
npx webpack
cnpm install  --save-dev babel-loader @babel/core @babel/preset-env
cnpm install  --save-dev @babel/plugin-transform-react-jsx
```

## 引申

### webpack

* entry: 指定起始路口。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的；

* output: 编译后输出路径，默认值为 ". /dist", 可设置如何命名。

* mode：设置开发环境(development/production); 

* loaders：加载器(用于对模块的源代码进行转换), 描述webpack如何处理非JavaScript模块(webpack自身是只理解JavaScript); 
  + presets是去指定babel的快捷方式, presets里面包含多个plugin

* plugins: 插件的范围包括，从打包优化和压缩；

参考官网：https://www.webpackjs.com/concepts/

### Range对象
表示文档的连续范围区域，简单的说就是高亮选区。一个Range的开始点和结束点可以是任意的，开始点和结束点也可以时候一样的(空Range)；使用场景一般出现在富文本编辑器相关的操作。

1. 创建一个range对象(createRange)
2. 将指定节点的终点位置指定为Range对象所代表区域的起点位置(setStartAfter)
3. 将指定的节点插入到某个Range对象所代表的区域中，插入位置为Range对象所代表区域的起点位置
4. 如果该节点已经存在于页面中，该节点将被移动到Range对象代表的区域的起点处(insertNode)

* createRange（）: 设置临界点
* selectNode() : 选择整个节点，包括子节点
* selectNodeContents()  选择节点的子节点
* setStart() : 接受两个参数, 一个参照节点，一个节点偏移量
* deleteContents() 这个方法能够从文档中删除范围缩包含的内容
* extractContents() 会删除并返回文档片段
* CloneContents() 创建范围对象的一个副本，不会影响原来的节点
* insertNode() 向范围选区的开始处插入一个节点
* surroundContents() 环绕范围插入内容 

参考网站：https://developer.mozilla.org/en-US/docs/Web/API/Range；

### JSX语法如何解析

JSX就是JavaScript和XML结合的一种格式。React发明了JSX，利用HTML语法来创建虚拟DOM。当遇到"<"，JSX就当HTML解析，遇到 “{” 就当JavaScript解析。
JSX语法的本质并不是直接把JSX渲染到页面，而是在内部先转换成了createElement 形式，然后再去渲染的，同时JSX在进行编译成JavaScript代码的时候进行了一定的优化，所以执行效率也更高。

#### @babel/plugin-transform-React-jsx 
1. 创建tagNode变量
2. 创建ToyReact.createElement表达式
3. 创建attributes对象
4. 创建React.createElement("div", {},...chidren)表达式
5. 替换node

转化前：

``` html
<div>
    <div></div>
    <div></div>
    <div></div>
</div>
```

转化后：

``` js
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

### 更多链接
- [winter大大课程](https://u.geekbang.org/subject/priorfe?utm_source=baidu-ad&utm_medium=ppzq-pc&utm_term=baidu-ad-ppzq-title&utm_campaign=guanwang&utm_content=title)
- [我读完了React的API，并为新手送上了一些建议](https://cloud.tencent.com/developer/news/662339)
  