/**
 * genarator ,yield
 * 遍历停止
 */
// function loop() {
//   for(let i = 0; i< 5; i++) {
//     console.log('i', i)
//   }
// }

// function * loop () {
//   for (let i = 0; i < 5; i++) {
//     yield console.log('i', i)
//   }
// }
// const l = loop()
// l.next()
// l.next(),value表示当前循环，done表示当前是否已经结束

function * gen () {
  let val
  val = yield * [1, 2, 3]
  console.log('val', val)
}
const l = gen()
console.log('l.next()', l.next())
console.log('l.next()', l.next())
