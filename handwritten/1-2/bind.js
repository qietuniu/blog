// https://blog.csdn.net/q3254421/article/details/82999718
// https://www.jianshu.com/p/6d8250fcfc11
// https://segmentfault.com/a/1190000018460584?utm_source=tag-newest
// arguments,slice,concat
// stringObject.slice(start,end) 包括start 不包括end，0开始从前往后，-1开始从后往前
// 
Function.prototype.myBind = function(context) {
  let _this = this
  let args1 = Array.from(arguments).slice(1)
  let bindFn = function() {
    let args2 = Array.from(arguments)
    return that.apply(this instanceof bindFn?this:context, args1.concat(args2))
  }
  let Fn = function() {}
  Fn.prototype = this.prototype
  bindFn.prototype = new Fn()
  return bindFn
}