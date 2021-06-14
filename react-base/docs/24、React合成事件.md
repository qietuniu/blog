### 事件工作流

- 事件捕获
- 事件目标
- 事件冒泡
- 事件委托
- 先绑定先执行

![6f1dae04a2159507c0875343ca202169](https://img.zhufengpeixun.com/6f1dae04a2159507c0875343ca202169)

### 事件差异

| 类型         | 原生事件  | 合成事件               |
| :----------- | :-------- | :--------------------- |
| 命名方式     | 全小写    | 小驼峰命名             |
| 事件处理函数 | 字符串    | 函数对象               |
| 阻止默认行为 | 返回false | event.preventDefault() |

```js
const handleClick = (event)=>{event.preventDefault();}
// 原生事件
<a href="#" onclick="handleClick()">Button</a>

//合成事件
<a href="#" onClick={handleClick}>Button</a>
```

### 合成事件

- React把事件委托到document对象上
- 当真实DOM元素触发事件,先处理原生事件，然后会冒泡到 document 对象后,再处理 React 事件
- React事件绑定的时刻是在reconciliation阶段,会在原生事件的绑定前执行
- 目的和优势
  - 进行浏览器兼容,React 采用的是顶层事件代理机制，能够保证冒泡一致性
  - 事件对象可能会被频繁创建和回收，因此 React 引入事件池,在事件池中获取或释放事件对象(React17中被废弃)

#### React17以前

##### 使用

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
class App extends React.Component {
  parentRef=React.createRef();
  childRef=React.createRef();
  componentDidMount() {
    this.parentRef.current.addEventListener("click", () => {
      console.log("父元素原生捕获");
    },true);
    this.parentRef.current.addEventListener("click", () => {
      console.log("父元素原生冒泡");
    });
    this.childRef.current.addEventListener("click", () => {
      console.log("子元素原生捕获");
    },true);
    this.childRef.current.addEventListener("click", () => {
      console.log("子元素原生冒泡");
    });
    document.addEventListener('click',()=>{
        console.log("document捕获");
    },true);
    document.addEventListener('click',()=>{
        console.log("document冒泡");
    });
  }
  parentBubble = () => {
    console.log("父元素React事件冒泡");
  };
  childBubble = () => {
    console.log("子元素React事件冒泡");
  };
  parentCapture = () => {
    console.log("父元素React事件捕获");
  };
  childCapture = () => {
    console.log("子元素React事件捕获");
  };
  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentBubble} onClickCapture={this.parentCapture}>
        <p ref={this.childRef} onClick={this.childBubble} onClickCapture={this.childCapture}>
          事件执行顺序
        </p>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
/**
document捕获
父元素原生捕获
子元素原生捕获
子元素原生冒泡
父元素原生冒泡
父元素React事件捕获
子元素React事件捕获
子元素React事件冒泡
父元素React事件冒泡
document冒泡
 */
```

##### 实现

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>event</title>
    </head>
    <body>
        <div id="parent">
            <p id="child">
              事件执行顺序
            </p>
          </div>
        <script>
        document.addEventListener('click',dispatchEvent);
        function dispatchEvent(event,isCapture){
            let paths = [];
            let current = event.target;
            while(current){
                paths.push(current);
                current=current.parentNode;
            }
            for(let i=paths.length-1;i>=0;i--){
                let eventHandler = paths[i].onClickCapture;
                eventHandler&&eventHandler()
            }
            for(let i=0;i<paths.length;i++){
                let eventHandler = paths[i].onClick;
                eventHandler&&eventHandler()
            }
        }
        let parent = document.getElementById('parent');
        let child = document.getElementById('child');
        parent.addEventListener("click", () => {
          console.log("父元素原生捕获");
        },true);
        parent.addEventListener("click", () => {
          console.log("父元素原生冒泡");
        });
        child.addEventListener("click", () => {
          console.log("子元素原生捕获");
        },true);
        child.addEventListener("click", () => {
          console.log("子元素原生冒泡");
        });
        document.addEventListener('click',()=>{
            console.log("document捕获");
        },true);
        document.addEventListener('click',()=>{
            console.log("document冒泡");
        });
        parent.onClick=() => {
            console.log("父元素React事件冒泡");
        }
        parent.onClickCapture=() => {
            console.log("父元素React事件捕获");
        }
        child.onClick=() => {
            console.log("子元素React事件冒泡");
        }
        child.onClickCapture=() => {
            console.log("子元素React事件捕获");
        }
/*
父元素React事件捕获
子元素React事件捕获
父元素原生捕获
子元素原生捕获
子元素原生冒泡
父元素原生冒泡
子元素React事件冒泡
父元素React事件冒泡
*/
    </script>
    </body>
</html>
```

#### React17以后

##### 使用

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
class App extends React.Component {
  parentRef=React.createRef();
  childRef=React.createRef();
  componentDidMount() {
    this.parentRef.current.addEventListener("click", () => {
      console.log("父元素原生捕获");
    },true);
    this.parentRef.current.addEventListener("click", () => {
      console.log("父元素原生冒泡");
    });
    this.childRef.current.addEventListener("click", () => {
      console.log("子元素原生捕获");
    },true);
    this.childRef.current.addEventListener("click", () => {
      console.log("子元素原生冒泡");
    });
    document.addEventListener('click',()=>{
        console.log("document原生捕获");
    },true);
    document.addEventListener('click',()=>{
        console.log("document原生冒泡");
    });
  }
  parentBubble = () => {
    console.log("父元素React事件冒泡");
  };
  childBubble = () => {
    console.log("子元素React事件冒泡");
  };
  parentCapture = () => {
    console.log("父元素React事件捕获");
  };
  childCapture = () => {
    console.log("子元素React事件捕获");
  };
  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentBubble} onClickCapture={this.parentCapture}>
        <p ref={this.childRef} onClick={this.childBubble} onClickCapture={this.childCapture}>
          事件执行顺序
        </p>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
/**
document原生捕获
父元素React事件捕获
子元素React事件捕获
父元素原生捕获
子元素原生捕获
子元素原生冒泡
父元素原生冒泡
子元素React事件冒泡
父元素React事件冒泡
document原生冒泡
 */
```

##### 实现

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>event</title>
    </head>
    <body>
        <div id="root">
            <div id="parent">
                <p id="child">
                  事件执行顺序
                </p>
              </div>
        </div>
        <script>
        let root = document.getElementById('root');
        let parent = document.getElementById('parent');
        let child = document.getElementById('child');

        root.addEventListener('click',event=>dispatchEvent(event,true),true);
        root.addEventListener('click',event=>dispatchEvent(event,false));
        function dispatchEvent(event,isCapture){
            let paths = [];
            let current = event.target;
            while(current){
                paths.push(current);
                current=current.parentNode;
            }
            if(isCapture){
              for(let i=paths.length-1;i>=0;i--){
                let eventHandler = paths[i].onClickCapture;
                eventHandler&&eventHandler()
              }
            }else{
              for(let i=0;i<paths.length;i++){
                let eventHandler = paths[i].onClick;
                eventHandler&&eventHandler()
               }
            }
        }

        parent.addEventListener("click", () => {
          console.log("父元素原生捕获");
        },true);
        parent.addEventListener("click", () => {
          console.log("父元素原生冒泡");
        });
        child.addEventListener("click", () => {
          console.log("子元素原生捕获");
        },true);
        child.addEventListener("click", () => {
          console.log("子元素原生冒泡");
        });
        document.addEventListener('click',()=>{
            console.log("document原生捕获");
        },true);
        document.addEventListener('click',()=>{
            console.log("document原生冒泡");
        });
        parent.onClick=() => {
            console.log("父元素React事件冒泡");
        }
        parent.onClickCapture=() => {
            console.log("父元素React事件捕获");
        }
        child.onClick=() => {
            console.log("子元素React事件冒泡");
        }
        child.onClickCapture=() => {
            console.log("子元素React事件捕获");
        }
    </script>
    </body>
</html>
```

### 事件系统变更

- 更改事件委托
  - 首先第一个修改点就是更改了事件委托绑定节点，在16版本中，React都会把事件绑定到页面的document元素上，这在多个React版本共存的情况下就会虽然某个节点上的函数调用了`event.stopPropagation()`,但还是会导致另外一个React版本上绑定的事件没有被阻止触发，所以在17版本中会把事件绑定到render函数的节点上
- 去除事件池
  - 17版本中移除了事件对象池，这是因为 React 在旧浏览器中重用了不同事件的事件对象，以提高性能，并将所有事件字段在它们之前设置为 null。在 React 16 及更早版本中，使用者必须调用`event.persist()` 才能正确的使用该事件，或者正确读取需要的属性

### 案例

React16

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
class Dialog extends React.Component{
    state = {show: false};
    componentDidMount() {
      document.addEventListener("click",  () => {
        this.setState({show: false});
      });
    }
    handleButtonClick = (event) => {
      //event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      this.setState({show: true});
    };

    render() {
      return (
        <div>
          <button onClick={this.handleButtonClick}>显示</button>
          {this.state.show && (
            <div onClick={(event) => event.nativeEvent.stopImmediatePropagation()}>
              Modal
            </div>
          )}
        </div>
      );
    }
  }
ReactDOM.render(<Dialog />, document.getElementById('root'));
```

React17

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
class Dialog extends React.Component{
  state = {show: false};
  componentDidMount() {
    document.addEventListener("click",  () => {
      this.setState({show: false});
    });
  }
  handleButtonClick = (event) => {
+   event.stopPropagation();
-   //event.nativeEvent.stopImmediatePropagation();
    this.setState({show: true});
  };

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>显示</button>
        {this.state.show && (
+         <div onClick={(event) => event.stopPropagation()}>
            Modal
          </div>
        )}
      </div>
    );
  }
}
ReactDOM.render(<Dialog />, document.getElementById('root'));
```