class Node {
  constructor (value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor () {
    this.head = new Node('head')
  }

  /**
   * 根据数值value找节点元素element。空链表返回null
   * @param {*} value
   */
  findByValue (value) {
    let currentNode = this.head.next
    while (currentNode !== null && currentNode.value !== value) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  /**
   * 根据数值index找节点元素element。
   * 空链表返回null
   */
  findByIndex (index) {
    let currentNode = this.head.next
    for (let i = 0; i < index; i++) {
      if (currentNode === null) return currentNode
      else {
        currentNode = currentNode.next
      }
    }
    return currentNode
  }
  /**
   * 末尾添加元素
   */
  append (item) {
    let currentNode = new Node(item)
    let prevNode = this.head
    while (prevNode.next) {
      prevNode = prevNode.next
    }
    prevNode.next = currentNode
  }
  /**
   * 指定元素后插入元素
   * 首先找出指定元素，新建新元素
   * 然后将新元素指向指定元素原先的next，指定元素的next指向新元素
   */
  insert (item, newItem) {
    let prevNode = this.findByValue(item)
    let currentNode = new Node(newItem)
    if (!currentNode) return
    currentNode.next = prevNode.next
    prevNode.next = currentNode
  }
  /**
   * 查找前一个元素
   */
  findPrev (value) {
    let currentNode = this.head
    while (currentNode.next !== null && currentNode.next.value !== value) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  /**
   * 删除元素
   */
  remove (item) {
    let prevNode = this.findPrev(item)
    if (!prevNode) return
    prevNode.next = prevNode.next.next
  }
  /**
   * 编辑元素
   */
  edit (item, newItem) {
    let currentNode = this.findByValue(item)
    currentNode.value = newItem
  }
  /**
   * 遍历出所有数据
   */
  display () {
    let currentNode = this.head.next
    while (currentNode !== null) {
      console.log(currentNode.value)
      currentNode = currentNode.next
    }
  }
}

const LList = new LinkedList()
LList.append('1')
LList.append('2')
LList.append('3')
LList.append('4')
LList.display()
console.log('--------------------')
console.log(LList.findByValue('2'))

console.log('--------------------')
console.log(LList.findPrev('2'))

console.log('--------------------')
console.log(LList.findByIndex(2))

console.log('--------------------')
LList.insert('4', '5')
LList.display()

console.log('--------------------')
LList.edit('5', '6')
LList.display()

console.log('--------------------')
