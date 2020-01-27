/**
 * 解构赋值
 * 可以跳过赋值元素,如果想忽略数组的某个元素对变量进行赋值，可以使用逗号来处理。
 * 赋值的元素不仅是数组，它可以是任意可遍历的对象
 */

// let [a, , c] = ['a', 'b', 'c']
// console.log(a,c)
// let[a, b, c] = 'abc' // ["a", "b", "c"]
// let [one, two, three] = new Set([1, 2, 3])
// console.log(one, two, three)
// console.log(a, b, c)

// 左侧还可以是变量也可以是对象的属性
let user = {};
[user.name, user.age] = 'ct 18'.split(' ')
console.log(user)

// 如果数组的内容少于变量的个数，并不会报错，没有分配到内容的变量会是 undefined。
