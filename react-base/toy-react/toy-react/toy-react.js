// diff算法，去掉rerender不再重新渲染
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
          // debugger
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
  // 重新进行渲染
  /* rerender() {
    let oldRange = this._range
    let range = document.createRange()
    range.setStart(oldRange.startContainer, oldRange.startOffset)
    range.setEnd(oldRange.startContainer, oldRange.startOffset)
    this[RENDER_TO_DOM](range)

    oldRange.setStart(range.endContainer, range.endOffset)
    oldRange.deleteContents()
  }*/
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
    // debugger
    merge(this.state, newState)
    this.update()
  }
}
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
    // debugger
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
class TextWrapper extends Component {
  constructor(content) {
    super(content)
    this.type = '#text'
    this.content = content
    this._range = null
  }

  get vdom() {
    return this
    // return {
    //   type: '#text',
    //   content: this.content
    // }
  }
  [RENDER_TO_DOM](range) {
    this._range = range
    // // 文本节点渲染时时先删除后添加
    let root = document.createTextNode(this.content)
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

export function createElement(type, attributes, ...children) {
  let e
  if (typeof type === 'string') {
    debugger
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
}