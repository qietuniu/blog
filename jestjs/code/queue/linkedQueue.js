class Node {
  constructor (value) {
    this.value = value
    this.next = null
  }
}

class LinkedQueue {
  constructor () {
    this.head = null
    this.tail = null
  }
  enqueue (value) {
    if (this.head === null) {
      this.head = new Node(value)
      this.tail = this.head
    } else {
      this.tail.next = new Node(value)
      this.tail = this.tail.next
    }
  }
  dequeue () {
    if (this.head === null) {
      return -1
    } else {
      const value = this.head.value
      this.head = this.head.next
      return value
    }
  }
}
