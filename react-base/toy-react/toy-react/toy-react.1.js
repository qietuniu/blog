// 渲染
class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    if(component&&component.root) {
      this.root.appendChild(component.root)
    }
  }
}
class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
}
export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
    this._root = null
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
  get root() {
    if(!this._root){
      debugger
      this._root = this.render().root
    }
    return this._root
  }
}
export function createElement(type, attributes, ...children) {
  let e
  if(typeof type === 'string') {
    e = new ElementWrapper(type)
  } else {
    e = new type()
  }
  for(let p in attributes) {
    e.setAttribute(p, attributes[p])
  }
  const insertChildren = children => {
    for (let child of children) {
        if (typeof child === "string") {
          e.appendChild(new TextWrapper(child));
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
  const root = component.root;

  if (root instanceof Array) {
      for (let c of root) {
          parentElement.appendChild(c);
      }
  } else {
      parentElement.appendChild(root);
  }
}