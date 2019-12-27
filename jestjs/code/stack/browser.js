const stack = require('./linkedStack')

class Browser {
  constructor () {
    this.normalStack = new stack.LinkedStack()
    this.backStack = new stack.LinkedStack()
  }
  pushNormal (name) {
    this.normalStack.push(name)
    this.backStack.clear()
    this.displayStack()
  }
  back () {
    const name = this.normalStack.pop()
    if (name !== -1) {
      this.backStack.push(name)
      this.displayStack()
    }
  }
  front () {
    const value = this.backStack.pop()
    if (value !== -1) {
      this.normalStack.push(value)
      this.displayStack()
    }
  }
  displayStack () {
    console.log('---后退页面---')
    this.backStack.display()
    console.log('---浏览页面---')
    this.normalStack.display()
  }
}
