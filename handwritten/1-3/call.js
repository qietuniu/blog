// https://segmentfault.com/a/1190000018272743

Function.prototype.myCall = function(context) {
  let ctx = context
  if(typeof context == null){
    ctx = window
  }
  const args = Array.from(arguments).slice(1)
  cxt.fn = this
  const res = cxt.fn(...args)
  delete cxt.fn;
  return res;
}