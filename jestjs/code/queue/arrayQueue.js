function ArrayQueue () {
  let queue = []
  this.push = function (value) {
    queue.push(value)
  }
  this.pop = function (value) {
    queue.shift(value)
  }
  this.getFront = function () {
    return queue[0]
  }
  this.getRear = function () {
    return queue[queue.length - 1]
  }
  this.clear = function () {
    queue = []
  }
  this.size = function () {
    return queue.length
  }
}
