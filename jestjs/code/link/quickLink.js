// 声明链表节点
class Node {
  constructor (value) {
    this.val = value
    this.next = undefined
  }
}

// 声明链表的数据结构，原生js没有链表，必须自己造
class NodeList { // 类实例的对象就是head
  constructor (arr) {
    let head = new Node(arr.shift()) // 声明头部节点，头指针是node节点
    let next = head // 当前节点的next指针
    arr.forEach(item => {
      next.next = new Node(item)
      next = next.next
    })
    return head
  }
}
