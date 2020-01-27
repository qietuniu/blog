// object,
/** https://yq.aliyun.com/articles/717275
 * es5添加常规函数，不能添加异步函数
 * es6 通过前面加*变成异步函数 ，异步函数不输出???
 * */
let x = 1
let y = 'yxx'
let obj = {
  x,
  y,
  [y]: y,
  * hi() {
    console.log('hi')
  }
  // function* functionName () {}
  // hi: function () {
  //   console.log('hi')
  // }
}

console.log(obj)
obj.hi()

// 除了object存储数据，还有那些方法可以？
/**
 * Set
 * 1.存储的数据是不允许重复的。
 * 2.存储的数据是可遍历的对象，不仅仅是数组
 * add, delete, clear, has, size
 */
let s = new Set()
// let s = new Set([1, 2, 3, 4])

s.add('a').add('b').add('a') // 新增
// s.delete('a') // 删除
// s.clear() // 清空
console.log(s.has('a'), s.has('c')) // 查找

console.log(s.size) // 长度
// 修改 ,key和value都是本身，说明set的本质也是object
console.log(s.keys())
console.log(s.values())
console.log(s.entries())
s.forEach(item => {
  console.log(item)
})
// for (let item in s) {
//   console.log(item)
// }

console.log(s)

console.log('____________________')
/**
 * Map,
 * 1.存储的数据是可遍历的对象,但是对象里面的值写入key，value
 * 2.set的值可以是任意值，map的key可以是任意值
 * 3.遍历的顺序是初始化的属性
 * set可新增可编辑，get，delete，clear
 */
// let map = new Map([[1, 2], [3, 4]])
let map = new Map()
map.set(1, 2)
map.set(3, 4)
map.set(1, 21)
// map.delete(1)
// map.clear()
console.log(map.size)
console.log(map.has(1))

console.log(map.get(1))
console.log(map.keys())
console.log(map.values())
console.log(map.entries())
// 先value再key
map.forEach((value, key) => {
  console.log(value, key)
})
for (let [key, value] in map) {
  console.log(key, value)
}

let o = function () {
  console.log('o')
}
map.set(o, 4)
console.log('o', map.get(o))
// console.log(map)
console.log('_______________')
/**
 * Object.assign()，把一个对象复制到另外一个对象
 * 1.当对象嵌套多层时，内层不一样到话也会包进来，浅复制
 * 思考题：undefined null?源对象时，输出目标对象；
 * 作为目标对象时报错，Cannot convert undefined or null to object
 */
// const target = {}
// const source = { b: 4, c: 5 }
const target = {
  a: {
    b: {
      c: {
        d: 4
      }
    },
    e: 5,
    f: 6,
    h: 10
  }
}

const source = {
  a: {
    b: {
      c: {
        d: 1
      }
    },
    e: 2,
    f: 3
  }
}

Object.assign(target, source)
console.log(target)

/**
 *  WeakSet， WeakMap
 *  WeakSet：存储数据只能是对象
 *  WeakMap：存储数据的key只能是对象
 */ 


