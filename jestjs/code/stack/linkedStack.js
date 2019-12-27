class Node {
  constructor (value) {
    this.value = value
    this.next = null
  }
}

class LinkStack {
  constructor () {
    // 头部相当于尾巴
    this.top = null
  }
  push (value) {
    const node = new Node(value)
    if (this.top === null) this.top = node
    else {
      node.next = this.top
      this.top = node // 此时node就是最上面的元素了
    }
  }
  pop () {
    if (this.top === null) return -1
    else {
      const value = this.top.value
      this.top = this.top.next
      return value
    }
  }
  clear () {
    this.top = null
  }
  print () {
    if (this.top !== null) {
      let temp = this.top
      while (temp !== null) {
        console.log(temp.value)
        temp = temp.next
      }
    }
  }
}

exports.CreatedStack = LinkStack
