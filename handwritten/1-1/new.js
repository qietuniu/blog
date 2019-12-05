function myNew(Fn) {
  let obj = {}
  let arg = Array.prototype.slice.call(arguments, 1)
  obj.__proto__ = Fn.prototype
  obj.__proto__.constructor = Fn
  let res = Fn.apply(obj, arg)
  return typeof res === 'object' ? res || obj : obj
}