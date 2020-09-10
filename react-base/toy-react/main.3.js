// 对应toy-react2，分离出渲染等代码
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
      {/* <h3>{this.state.b.toString()}</h3> */}
      <button onclick={()=> {this.setState({a:this.state.a+1})}}>add</button>
    </div>
  }
}

render(<MyComponent id='a' class='v'><div>1</div></MyComponent>, document.body)