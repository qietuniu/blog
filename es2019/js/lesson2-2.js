// 1.for 循环
const arr = [1, 2, 3, 4, 5]
for (let i = 0; i < arr.length; i++) {
  // if (arr[i] === 2) break
  console.log(arr[i])
}
console.log('__________________')
// 2.forEach 不支持 break和continue
arr.forEach(function (item) {
  console.log(item)
})

console.log('__________________')
// 3.every,默认返回false
arr.every(function (item) {
  if (item === 2) return true
  console.log(item)
  return true
})
console.log('__________________')
// 4. for in,数组也是对象，数组可遍历.灰色是字符串，蓝色是数值
for (const key in arr) {
  if (key === '2') continue
  console.log(key, arr[key])
}
console.log('__________________')
// 5. for of  除了数组和对象之外，还可以遍历的xx
for (let item of arr) {
  console.log(item)
}
const price = {
  A: [1, 3, 4, 5],
  B: [4, 6, 7],
  C: [0.5, 12, 55]
}
console.log('_________for in_________')
for (const key in price) {
  console.log(key, price[key])
}
console.log('________for of ————price is not iterable__________')
// for (let item of price) {
//   console.log(item)
// }
// 2.转换,伪数组到数组,Array.from(arrayLike, mapFn, thisArg)
// foreach 和for循环，不能改变值
// let args = [].slice.call(arguments)
// Array.prototype.from
// let args = Array.from(arguments)
// let imgs = Array.from(document.querySelectorAll('img'))

// let array = Array.from({
//   length: 5
// }, function () {
//   return 1
// })
// console.log(array)

// 3.生成新数组
// let array = Array(5)
// let array = ['', '']

// Array.prototype.of
// let array = Array.of(1, 2, 3, 4, 5)

// Array.prototype.fill(value, start, end)
let array = Array(5).fill(1)
console.log(array)
console.log(array.fill(8, 2, 4))

// 4.查找，filter找出所有值
let find = array.filter(function (item) {
  return item === 8
})
console.log(find)
// find 关注满足条件的第一个值
find = array.find(function (item) {
  return item === 1
})
console.log(find)
