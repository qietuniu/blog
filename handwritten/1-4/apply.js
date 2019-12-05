Function.prototype.myApply = function(context) {
  let ctx = context
  if(typeof context == null){
    ctx = window
  }
  cxt.fn = this
  const res = arguments[1] ? cxt.fn(...arguments[1]) : cxt.fn()
  delete cxt.fn;
  return res;
}