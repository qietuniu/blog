// ————————构造函数与普通函数区别————————
console.log("%c ————————构造函数与普通函数区别————————", "color:#fff;background:#08d")

// 构造函数
console.log("%c构造函数", "color:#08d;")

function Person(name, age) {
  this.name = name
  this.age = age
  this.introduction = function () {
    console.log(`my name is ${this.name}, I'm ${this.age} years old`)
  }
  //return this //构造函数默认有这句
}
var p = new Person('qietuniu', 18) // this=Person
p.introduction()

// 普通函数
console.log("%c普通函数", "color:#08d;")

function person(name, age) {
  this.name = name
  this.age = age
  this.introduction = function () {
    console.log(`my name is ${this.name}, I'm ${this.age} years old`)
  }
  return `直接返回：我的名字 ${this.name}, 我 ${this.age} 岁`
}
console.log(person('qietuniu', 18)) //this=window
window.introduction()

// ————————隐藏的构造函数————————
console.log("%c ————————隐藏的构造函数————————", "color:#fff;background:#08d")
console.log("new Object():")
console.log(new Object())
console.log("new Array():")
console.log(new Array())
console.log("new Function():")
console.log(new Function())

// ————————instanceof————————
console.log("%c ————————instanceof————————", "color:#fff;background:#08d")
console.log("p instanceof Person:" + (p instanceof Person))
console.log("p instanceof Object:" + (p instanceof Object))
// ————————new一个对象的过程————————
console.log("%c ————————new一个对象的过程————————", "color:#fff;background:#08d")
console.log("%c实例的构造函数属性（constructor）指向构造函数", "color:#08d;")
console.log("p是Person的实例，p含有constructor属性,该属性指向Person:")
console.log("p.__proto__.constructor === Person :" + (p.__proto__.constructor === Person))


// ————————原型模式理解图————————
console.log("%c ————————原型模式理解图————————", "color:#fff;background:#08d")
console.log("%c构造函数Fn的prototype(显式原型)是原型对象", "color:#08d;")
console.log("Person().prototype:")
console.log(Person.prototype)
console.log("%c原型对象的constructor是构造函数Fn", "color:#08d;")
console.log("Person().prototype.constructor:")
console.log(Person.prototype.constructor)
console.log("Person.prototype.constructor === Person:" + (Person.prototype.constructor === Person))
console.log("%c构造函数可通过new实例化一个实例", "color:#08d;")
console.log("p instanceof Person:" + (p instanceof Person))

console.log("%c实例p的__proto__(隐式原型)是原型对象", "color:#08d;")
console.log(p.__proto__)
console.log("Person.prototype === p.__proto__:" + (Person.prototype === p.__proto__))

console.log("%cPerson.prototype是对象，它的__proto__是object的prototype", "color:#08d;")
console.log("Person.prototype.__proto__ ")
console.log(Person.prototype.__proto__)
console.log("Person.prototype.__proto__ === Object.prototype:" + (Person.prototype.__proto__ === Object.prototype))

console.log("%cObject的prototype的__proto__为null", "color:#08d;")
console.log("Person.prototype.__proto__.__proto__相当于:Object.prototype.__proto__" + (Person.prototype.__proto__
  .__proto__ === Object.prototype.__proto__))
console.log("Object.prototype.__proto__=== null:" + (Person.prototype.__proto__
  .__proto__ === null))

// ————————原型的五大原则————————
console.log("%c ————————原型的五大原则————————", "color:#fff;background:#08d")
// 1
console.log("%c1、所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（null除外）", "color:#08d;")
var arr = [];
arr.a = 100;
var obj = {};
obj.a = 100;

function fn() {}
fn.a = 100;
console.log(`arr.a:${arr.a};obj.a:${obj.a};fn.a:${fn.a}`)
console.log("创建对象的三种方法")
// 字面量
var o1 = {
  name: 'o1'
}
var o2 = new Object({
  name: 'o2'
})

// 构造函数
var M = function () {
  this.name = 'o3'
}
var o3 = new M()

// Object.create
var O = {
  name: 'o4'
}
var o4 = Object.create(O)
console.log(o1)
console.log(o2)
console.log(o3)
console.log(o4)
// 2
console.log("%c2、所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（null除外）", "color:#08d;")
console.log(`arr.__proto__:${arr.__proto__};obj.__proto__:${obj.__proto__};fn.__proto__:${fn.__proto__}`)

// 3
console.log("%c3、所有的函数，都有一个prototype属性（显式原型），属性也是一个普通的对象", "color:#08d;")
console.log(`fn.prototype:`)
console.log(fn.prototype)

// 4
console.log("%c4、所有的引用类型（数组、对象、函数），_proto_属性值指向它的构造函数的“prototype”的值", "color:#08d;")
console.log(`arr.__proto__ === Array.prototype:${arr.__proto__ === Array.prototype}`)
console.log(`obj.__proto__ === Object.prototype:${obj.__proto__ === Object.prototype}`)
console.log(`fn.__proto__ === Function.prototype:${fn.__proto__ === Function.prototype}`)

// 5
console.log("%c5、当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的__proto__（即它的构造函数的prototype）中寻找", "color:#08d;")

Person.prototype.sayName = function () {
  console.log(`我的名字：${this.name}`)
}
p.introduction()
p.sayName()
//  ————————原型对象————————
console.log("%c ————————原型对象————————", "color:#fff;background:#08d")

console.log("Person.prototype === p.__proto__:" + (Person.prototype === p.__proto__))
console.log("循环找出对象自身属性")
for (item in p) {
  // 高级浏览器已经在for in中屏蔽了来自原型的属性
  // 以下的判断可保证程序的健壮性,hasOwnProperty方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
  if (p.hasOwnProperty(item)) {
    // 输出name和printName，没有alerName
    console.log(item)
  }
}
//  ————————原型链————————
console.log("%c ————————原型链————————", "color:#fff;background:#08d")

console.log(`p.toString():${p.toString()}`)

// ————————jquery————————————

console.log("%c ————————jquery中原型的使用————————", "color:#fff;background:#08d")
var jQuery = function () {
  return new jQuery.fn.init();
}
jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  init: function () {
    this.jquery = "1.9.1";
    return this;
  }
}
jQuery.fn.init.prototype = jQuery.fn;
jQuery.fn.printQT = function () {
  console.log("切图")
  return this;
}
window.jQuery = window.$ = jQuery;
console.log(jQuery().printQT())

// ————————继承方式————————————
console.log("父类")
function Animal(name) {
  this.name = name||'动物'
  this.sound = function() {
    console.log('叫')
  }
}
Animal.prototype.type = ['a' ,'b']

console.log("%c ————————继承方式之原型链————————", "color:#fff;background:#08d")

function Cat(){}
// 重点代码start
Cat.prototype = new Animal()
// 重点代码end
Cat.prototype.name = '猫'
Cat.prototype.type.push('c')
Cat.prototype.sound = function() {
	console.log('喵')
}
let cat = new Cat()
console.log(cat.name)
cat.sound()
console.log((new Animal()).type)

console.log("%c ————————继承方式之构造继承————————", "color:#fff;background:#08d")

function Dog(name){
  // 重点代码start
  Animal.call(this, name)
  // 重点代码end
  this.name = name
  this.sound = function() {
    console.log('汪')
  }
}
let dog = new Dog('狗')
console.log(dog.name)// 狗
dog.sound()// 汪
console.log(dog.type) // undefined
console.log(dog instanceof Animal); // false
console.log(dog instanceof Dog); // true

console.log("%c ————————继承方式之组合继承————————", "color:#fff;background:#08d")
function Frog(name){
  // 重点代码1start
  Animal.call(this, name)
  // 重点代码1end
  this.name = name
  this.sound = function() {
    console.log('呱')
  }
}
// 重点代码2start
Frog.prototype = new Animal();
Frog.prototype.constructor = Frog;
// 重点代码2end
let frog = new Frog('青蛙')
console.log(frog.name)// 青蛙
frog.sound()// 呱
console.log(frog.type) // ["a", "b", "c"]
console.log(frog instanceof Animal); // true
console.log(frog instanceof Frog); // true

console.log("%c ————————继承方式之原型式继承————————", "color:#fff;background:#08d")

function pigFunc(obj) {
  // 重点代码1start
  function Pig(){}
  Pig.prototype = obj
  return new Pig()
  // 重点代码1end
}
// 重点代码2start
let pig1 = new Animal()
let pig = pigFunc(pig1)
// 重点代码2end
pig.name = '猪'
pig.sound = function() {
	console.log('呼噜噜')
}
console.log(pig.name)// 猪
pig.sound()// 呼噜噜
console.log(pig.type) // ["a", "b", "c"]
console.log(pig instanceof Animal); // true


console.log("%c ————————继承方式之寄生式继承————————", "color:#fff;background:#08d")

function ratFunc(obj) {
  // 与原型式继承相同
  function Rat(){}
  Rat.prototype = obj
  return new Rat()
}
let rat1 = new Animal()

// 重点代码2start
function ratFunc1(obj){
  let rat2 = ratFunc(obj)
  rat2.name = '鼠'
  rat2.sound = function() {
    console.log('滋滋滋')
  }
  return rat2
}
let rat = ratFunc1(rat1)
// 重点代码2end

console.log(rat.name)// 鼠
rat.sound()// 滋滋滋
console.log(rat.type) // ["a", "b", "c"]
console.log(rat instanceof Animal); // true



console.log("%c ————————继承方式之寄生组合式继承————————", "color:#fff;background:#08d")

function Snake(name){
  Animal.call(this, name)
  this.name = name
  this.sound = function() {
    console.log('丝丝')
  }
}
(function(){
  // 创建一个没有实例方法的类
  var Snake1 = function(){}
  Snake1.prototype = Animal.prototype
  //将实例作为子类的原型
  Snake.prototype = new Snake1()
  Snake.prototype.constructor = Snake
})
let snake = new Snake('蛇')
console.log(snake.name)// 蛇
snake.sound()// 丝丝
console.log(snake.type) // undefined
console.log(snake instanceof Animal); // true
console.log(snake instanceof Snake); // true