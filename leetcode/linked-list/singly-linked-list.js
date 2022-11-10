
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.size = 0
        this.head = null
    }

    getNode(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('out range')
        }
        let current = this.head
        for (var i = 0; i < index; i++) {
            current = current.next
        }
        return current
    }

    append(element) {
        let node = new Node(element)
        if (this.head === null) {
            this.head = node
        } else {
            let current = this.getNode(this.size - 1)
            current.next = node
        }
        this.size++
    }

    appendAt(position, element) {
        if (position < 0 || index > this.size) {
            throw new Error('out range')
        }

        let node = new Node(element)
        if(position === 0){
            node.next = this.head
            this.head = node
        }else {
           let prevNode = this.getNode(position-1)
           node.next = prevNode.next
           prevNode.next = node
        }
        this.size++
    }


    removeAt(position) {
        if (position < 0 || index >= this.size) {
            throw new Error('out range')
        }
        if(position === 0) {
            this.head = this.head.next
        }else{
            let prevNode = this.getNode(position-1)
            prevNode.next = prevNode.next.next
        }
        this.size --
    }

    clear() {
        this.size = 0
        this.head = null
    }

    indexOf(element) {
        if(this.head === null) return -1
        let current = this.head
        for (var i = 0; i < this.size - 1; i++) {
            // if(this.getNode(i).element === element){
            //     return i
            // }
            if(current.element === element)return i
            current = current.next
        }
        return -1
    }
}