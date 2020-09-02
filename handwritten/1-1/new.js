function myNew(Fn) {
  let obj = {}
  let args = Array.prototype.slice.call(arguments, 1)
  // [].shift.call(arguments)
  obj.__proto__ = Fn.prototype
  obj.__proto__.constructor = Fn
  let res = Fn.apply(obj, args)
  return typeof res === 'object' ? res : obj
}

// 快捷

function myNew(fn,...args){
  const obj = Object.create(fn.prototype) // 用Object初始化用当前对象的原型去创建
  const res = fn.apply(obj,args)
  //正常规定,如何fn返回的是null或undefined(也就是不返回内容),我们返回的是obj,否则返回res
  return res instanceof Object ? res : obj
}