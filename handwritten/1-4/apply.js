
// apply和call实现类似，只是传入的参数形式是数组形式
Function.prototype.myApply = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let ctx = context||window
  const fn = Symbol('fn')
  cxt.fn = this
  const res = arguments[1] ? cxt.fn(...arguments[1]) : cxt.fn()
  delete cxt.fn;
  return res;
}