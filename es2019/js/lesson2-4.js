// 参数默认值
/**
 * es5代码冗余
 */
// function f (x, y, z) {
//   if (y === undefined) y = 2
//   if (z === undefined) z = 3
//   return x + y + z
// }

// console.log(f(1)) // 6

/**
 * 简洁，尽量有参数往前写
 * 1. 函数参数是从左到右解析，如果没有默认值会被解析成 undefined，如果是中间函数缺省呢？使用undefined
 * 2. 表达式
 * 3. es6禁止使用arguments（函数到参数多余指定到参数数量还是会以实际到参数为主并不准确）
 * =》es6 函数的length:不是执行的参数个数而是定义时没有默认值的参数的个数
 */
// function f (x, y = 3, z = x + y) {
//   // es5
//   console.log('es5', arguments.length)
//   console.log(Array.from(arguments))

//   // es6
//   console.log('es6', f.length)

//   return x + z
// }
// console.log(f(1, undefined))

/**
 * arguments是伪数组，可以使用数组的原型链再加上call的方法
 */
// function sum () {
//   let num = 0
//   // Array.prototype.forEach.call(arguments, function (item) {
//   //   num += item * 1
//   // })
//   Array.from(arguments).forEach(function (item) {
//     num += item * 1
//   })
//   return num
// }
// console.log(sum(3, 5, 6))

/**
 * Rest parameter
 * ...nums
 *1. 获取函数被执行时候的所有参数
 *2. 是数组不是伪数组
 *3. 可以将参数拆开
 */
// function sum (base, ...nums) {
//   let num = 0
//   nums.forEach(item => {
//     num += item * 1
//   })
//   return base * 2 + num
// }
// console.log(sum(3, 5, 6, 5))

// es5, 通过apply或call来改变作用域
// function sum (x = 1, y = 2, z = 3) {
//   return x + y + z
// }
// let data = [1, 2, 4]
// console.log(sum(data[0], data[1], data[2]))
// console.log(sum.apply(this, data))
// console.log(sum(...data))

/**
 * 箭头函数差别,箭头函数还有那些关于this的用法
 * return () {} 省略为什么？
 */
// let sayHi = () => {
//   console.log('hi')
// }
// sayHi()

/**
 * 箭头函数和普通函数对类的指向不同，
 * es5：谁调用指向谁
 * es6：定义的时候，this指向什么就是什么
*/
let test = {
  name: 'test',
  say: () => {
    console.log(this.name)
  }
}
test.say()
