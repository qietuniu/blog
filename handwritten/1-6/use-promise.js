let MyPromise = require('./toy-promise')
let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('value')
  }, 1000)
  // throw new Error('fail')
  // reject('xxx')
})
promise.then((success) => {
  console.log('success' + success)
}, (err) => {
  console.log('failed' + err)
})

promise.then((success) => {
  console.log('success' + success)
}, (err) => {
  console.log('failed' + err)
})
// successvalue
// failedError: fail
// failedxxx