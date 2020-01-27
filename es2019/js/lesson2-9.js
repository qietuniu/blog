/**
 * promise
 * es5回调地狱
 */
// function loadScript (src, callback) {
//   let script = document.createElement('script')
//   script.src = src
//   script.onload = () => { callback(src) }
//   document.head.append(script)
//   // callback()
// }
// function test (src) {
//   console.log(src)
// }
// loadScript('./1.js', function () {
//   loadScript('./2.js', function () {
//     loadScript('./3.js', test)
//   })
// })
// test()

// es6

function loadScript (src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = src
    script.onload = () => resolve(src)
    script.onerror = (err) => reject(err)
    document.head.append(script)
  })
}
// loadScript('./1.js').then(loadScript('./2.js')).then(loadScript('./3.js'))
// 上一个不加返回的话，下一个不受影响会继续执行
// loadScript('./4.js')
//   .then(() => {
//     loadScript('./2.js')
//   }, (err) => {
//     console.log('err', err)
//   })
//   .then(() => {
//     loadScript('./3.js')
//   }, (err) => {
//     console.log('err', err)
//   })

// loadScript('./4.js')
//   .then(() => {
//     return loadScript('./2.js')
//   }, (err) => {
//     console.log('err', err)
//   })
//   .then(() => {
//     loadScript('./3.js')
//   }, (err) => {
//     console.log('err', err)
//   })

loadScript('./4.js')
  .then(() => {
    return loadScript('./2.js')
  })
  .then(() => {
    loadScript('./3.js')
  }).catch(err => {
    console.log('err', err)
  })

// resolve和reject是静态的方法，需要使用Promise来进行调用
function resolveFun (num) {
  return Promise.resolve(num)
}
resolveFun(34).then((result) => {
  console.log(result)
}, (err) => {
  console.log('err', err)
})

// 并行的promise

const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = Promise.resolve(3)

Promise.all([p1, p2, p3]).then((value) => {
  console.log('value', value)
})
// 先到先得
Promise.race([p1, p2, p3]).then((value) => {
  console.log('value', value)
})
