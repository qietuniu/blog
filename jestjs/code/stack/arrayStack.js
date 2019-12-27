function Stack () {
  let stack = []
  // 尾部添加
  this.push = function (value) {
    stack.push(value)
  }
  // 返回栈顶元素，并在进程中删除它
  this.pop = function () {
    return stack.pop()
  }
  // 返回栈顶元素，但不在堆栈中删除它
  this.peek = function () {
    console.log(stack[stack.length - 1])
    return stack[stack.length - 1]
  }
  // 置空
  this.clear = function () {
    stack = []
  }
  // 获取长度
  this.size = function () {
    console.log(stack.length)
    return stack.length
  }
  // 是否为空
  this.isEmpty = function () {
    return stack.length === 0
  }
  // 打印
  this.print = function () {
    console.log(stack)
  }
}
