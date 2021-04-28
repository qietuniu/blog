// single
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.err = undefined
    let resolve = (value) => {
      if (this.status == PENDING) {
        this.value = value
        this.status = FULFILLED
      }
    }
    let reject = (err) => {
      if (this.status == PENDING) {
        this.err = err
        this.status = REJECTED
      }
    }
    try {
      executor(resolve, reject) // 立即执行，修改状态
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    } else if (this.status === REJECTED) {
      onRejected(this.err)
    }
  }

}

module.exports = MyPromise