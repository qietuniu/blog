class Node {
  constructor (element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  constructor () {
    this.head = new Node(null)
    this.size = 0
  }
  /* 根据索引查找找元素
   * 当索引不在0=size间时返回null
   循环索引拿到当前节点
   */
  findByIndex (index) {
    if (index < 0 || index >= this.size) return null
    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current.next
    }
    return current
  }
  /* 根据数据查找找元素
   * 如果当前链表是空链表返回null
   循环链表，当节点数据等于查找的element返回该节点
   */
  findByValue (element) {
    let current = this.head
    if (current.next === null) return null
    while (current.element !== element) {
      current = current.next
    }
    return current
  }
  /* 根据value找元素“index”
   * 默认当前节点为头结点，循环链表，当节点的数值等于查找的value时返回索引，否则返回-1
   */
  indexOf (element) {
    let current = this.head
    for (let i = 0; i < this.size; i++) {
      if (current.element === element) return i
      current = current.next
    }
    return -1
  }
  /* 向链表追加节点
   * 如果链表为空时，头节点也是尾结点，将头指针next指向新的节点，新节点的next不需要定义则为null；如果链表不为空，则找到最后一个元素，改变该元素的next指向，指到新节点，整个链表长度加一
   */
  append (element) {
    const node = new Node(element)
    if (this.head == null) this.head = node
    else {
      let current = this.findByIndex(this.size - 1)
      current.next = node
    }
    this.size++
  }
  // 在链表制定位置插入
  insert (pos, element) {
    if (pos < 0 || pos >= this.size) return false
    let node = new Node(element)
    if (pos === 0) {
      node.next = this.head
      this.head = node
    } else {
      let prevNode = this.findByIndex(pos - 1)
      node.next = prevNode.next
      prevNode.next = node
    }
    this.size++
    return true
  }
  removeAt (pos) {
    if (pos < 0 || pos >= this.size) return null
    let current = this.head
    if (pos === 0) this.head = current.next
    else {
      let prevNode = this.findByIndex(pos - 1)
      prevNode.next = current.next
    }
    this.size--
  }
  remove (element) {
    let index = this.indexOf(element)
    return this.removeAt(index)
  }
  // 是否为空
  isEmpty () {
    return this.size === 0
  }
  // 返回链表长度
  getSize () {
    return this.size
  }
  // 返回头元素
  getHead () {
    return this.head
  }
  // 清空链表
  clear () {
    this.head = null
    this.size = 0
  }
}
