// 继承
/**
 * 1 构造函数继承
 * 缺点： 没办法拿到原型上的属性
 */

function Person1() {
    this.name = 'ct'
}
function Child1() {
    Person1.call(this)
    this.age = 18
}
const c1 = new Child1()
console.log(`c1:`, c1, '; c instanceof Person:', c1 instanceof Person1)


/**
 * 2 原型继承
 * 缺点： 引用相同，实例直接没做到隔离; 没办法给父类传参
 */
function Person2() {
    this.name = 'ct'
}
function Child2() {
    this.age = 18
}

Child2.prototype = new Person2()
const c2 = new Child2()


console.log(`c2:`, c2, '; c instanceof Person:', c2 instanceof Person2)

/**
 * 3 组合继承
 * 缺点： 引用相同，实例直接没做到隔离; 没办法给父类传参
 */
 function Person3 () {
    this.name = 'ct'
}
function Child3 () {
    Person3.call(this)
    this.age = 18
}

Child3.prototype = new Person3()
const c3 = new Child3()


console.log(`c3:`, c3, '; c instanceof Person:',c3 instanceof Person3)


/**
 * 4 原型式继承
 * 接收对象A，返回对象B，B.__proto__ --> A
 */
function ObjectCreate (obj) {
    function Fn() {}
    Fn.prototype = obj
    return new Fn()
}
    
 function Person4 () {
    this.name = 'ct'
}
const c4 = Object.create(new Person4)
// const c4 = ObjectCreate(new Person4)
console.log(`c4:`, c4,c4.name, '; c instanceof Person:',c4 instanceof Person4)
