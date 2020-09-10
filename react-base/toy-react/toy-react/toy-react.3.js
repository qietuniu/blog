// vdom:使用vdom创建实体dom
const RENDER_TO_DOM = Symbol('render to dom')

// 基础组件类
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
  get vchildren() {
    return this.children.map(child => child.vdom)
  }
  // 私有函数进行更新:从取元素变成写进rang内
  [RENDER_TO_DOM](range) {
    this._range = range
    this.render()[RENDER_TO_DOM](range)
  }
  // 重新进行渲染,先存储oldrange对象，创建一个新的空range用来占位(range)。然后再把oldrange放到这个占位range的后面。最后把oldrange的位置删掉
  rerender() {
    let oldRange = this._range
    let range = document.createRange()
    range.setStart(oldRange.startContainer, oldRange.startOffset)
    range.setEnd(oldRange.startContainer, oldRange.startOffset)
    this[RENDER_TO_DOM](range)

    oldRange.setStart(range.endContainer, range.endOffset)
    oldRange.deleteContents()
  }
  setState(newState) {
    if (this.state === null || typeof this.state != 'object') {
      this.state = newState
      this.rerender()
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
    this.rerender()
  }
}
class ElementWrapper extends Component {
  constructor(type) {
    // 生成一个dom元素
    super(type)
    this.type = type
    this.root = document.createElement(type)
  }
  // 存储props
  // setAttribute(name, value) {
  //   // 匹配on开头所有字符
  //   if (name.match(/^on([\s\S]+)$/)) {
  //     this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value)
  //   } else {
  //     if (name === 'className') {
  //       this.root.setAttribute('class', value)
  //     } else {
  //       this.root.setAttribute(name, value)
  //     }
  //   }
  // }
  get vdom() {
    return this
    // return {
    //   type: this.type,
    //   props: this.props,
    //   children: this.children.map(child => child.vdom)
    // }
  }
  // 存储child
  // appendChild(component) {
  //     let range = document.createRange()
  //     range.setStart(this.root, this.root.childNodes.length)
  //     range.setEnd(this.root, this.root.childNodes.length)
  //     component[RENDER_TO_DOM](range)
  //   }
    [RENDER_TO_DOM](range) {
      range.deleteContents()

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
      for(let child of this.children) {
        let childRange = document.createRange()
        childRange.setStart(root, root.childNodes.length)
        childRange.setEnd(root, root.childNodes.length)
        child[RENDER_TO_DOM](childRange)
      }
      range.insertNode(root)
    }
}
class TextWrapper extends Component {
  constructor(content) {
    super()
    this.type = '#text'
    this.content = content
    this.root = document.createTextNode(content)
  }

  get vdom() {
    return this
    // return {
    //   type: '#text',
    //   content: this.content
    // }
  }
  [RENDER_TO_DOM](range) {
    // 文本节点渲染时时先删除后添加
    range.deleteContents()
    range.insertNode(this.root)
  }
}


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

export function render(component, parentElement) {
  let range = document.createRange()
  range.setStart(parentElement, 0)
  range.setEnd(parentElement, parentElement.childNodes.length)
  range.deleteContents()
  component[RENDER_TO_DOM](range)
  // if (root instanceof Array) {
  //     for (let c of root) {
  //         parentElement.appendChild(c);
  //     }
  // } else {
  //     parentElement.appendChild(root);
  // }
}