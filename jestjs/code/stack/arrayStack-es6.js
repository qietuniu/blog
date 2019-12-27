

// WeackMap/Symbol
//使用Symbol添加私有属性
class Stack {
  let _items = Symbol()
  constructor(){
      this[_items] = []
  }
  push(element){
      this[_items].push(element)
  }
}

//可以拿到所有的symbol对象
Object.getOwnPropertySymbols(Stack)

//使用weakMap
const items = new weakMap()

class Stack {
  constructor(){
      items.set(this,[])
  }
  push(element){
      let s = items.get(this)
      s.push(element)
  }
  pop(){
      let s = items.get(this)
      let r = s.pop()
      return r
  }
}

//利用闭包实现私有属性
let Stack = (function(){
 const items = new WeackMap()
 
 class Stack {
  constructor(){
      items.set(this,[])
  }
  push(element){
      let s = items.get(this)
      s.push(element)
  }
  pop(){
      let s = items.get(this)
      let r = s.pop()
      return r
  }
}
 return Stack
})()