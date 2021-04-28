// 发布订阅：异步链式时将方法存起来直到遇到成功或者失败时再拿出来执行
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.err = undefined
    this.onResolvedCbs = [] // 存放成功回调
    this.onRejectedCbs = []
    let resolve = (value) => {
      if (this.status == PENDING) {
        this.value = value
        this.status = FULFILLED
        // 发布
        this.onResolvedCbs.forEach(fn => fn())
      }
    }
    let reject = (err) => {
      if (this.status == PENDING) {
        this.err = err
        this.status = REJECTED
        this.onRejectedCbs.forEach(fn => fn())
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
    } else if (this.status === PENDING) {
      // aop切片
      this.onResolvedCbs.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCbs.push(() => {
        onRejected(this.err)
      })
    }
  }

}

module.exports = MyPromise