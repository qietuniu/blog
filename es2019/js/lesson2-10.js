/**
 * reflect => 反射
 * 反射机制：编辑阶段不知道哪个类被加载，在运行时才加载执行
 * 先使用apply再确定哪个方法
 * 作用： 多种情况的时候，通过改变方法
 */

console.log('object', Math.floor.apply(null, [1.72]))

console.log('object', Reflect.apply(Math.floor, null, [1.72]))

let price = 100.1
console.log('object', Reflect.apply(price > 100 ? Math.floor : Math.ceil, null, [price]))

// 类的实例使用,不使用new
let d = new Date()
console.log('d', d.getTime())
let d1 = Reflect.construct(Date, [])
console.log('d1', d1.getTime(), d1 instanceof Date)

// Object.defineProperty,Reflect.defineProperty,返回值不同

const student = {}
const student1 = {}
const a = Object.defineProperty(student, 'name', {
  value: '1'
})
const b = Reflect.defineProperty(student1, 'name', {
  value: '1'
})
console.log('student', student, a)
console.log('student1', student1, b)

const obj = {
  x: 1,
  y: 2,
  z: 3
}
// Reflect.deleteProperty(obj, 'x')
// delete obj.y
// console.log('obj', obj)
// 读取数据
// console.log('object', Reflect.get(obj, 'x'))

// 属性描述符
console.log('Reflect', Reflect.getOwnPropertyDescriptor(obj, 'x'))
console.log('Object', Object.getOwnPropertyDescriptor(obj, 'x'))

// 获取原型对象
console.log('Reflect获取原型对象', Reflect.getPrototypeOf(d))
// console.log('Reflect获取原型对象', Reflect.setPrototypeOf(d, String.prototype))

console.log('Object获取原型对象', Object.getPrototypeOf(d))

// 是否存在,has

console.log('Reflect', Reflect.has(obj, 'z'))
// console.log('Object', obj.has(obj, 'z')) set和map才有

// 方法是否可扩展
// Object.freeze(obj)
// Reflect.preventExtensions(obj)
console.log('Reflect方法是否可扩展', Reflect.isExtensible(obj))
// 自身属性不是原型链属性
console.log('自身属性不是原型链属性', Reflect.ownKeys(obj))
console.log('自身属性不是原型链属性', Reflect.ownKeys([]))
Reflect.set(obj, 'z', 4)
console.log('obj', obj)