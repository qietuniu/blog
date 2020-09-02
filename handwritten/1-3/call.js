Function.prototype.myCall = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let ctx = context || window
  const args = Array.from(arguments).slice(1)
  // const args = [...arguments].slice(1);
  cxt.fn = this
  const res = cxt.fn(...args)
  delete cxt.fn;
  return res;
}

// 避免出现为fn的传参
Function.prototype.myCall = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let ctx = context || window;
  const fn = Symbol('fn');
  ctx[fn] = this;

  const args = [...arguments].slice(1);
  const res = ctx[fn](...args);  
  delete ctx[fn];
  return res;
};