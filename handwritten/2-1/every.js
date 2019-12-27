Array.prototype.myEvery = function(fn, thisValue){
  let arr = thisValue||this
  let len = arr.length
  if(typeof fn != 'function'){
    throw new TypeError(fn + 'is not a function')
  }
  if(!arr.length)return true
  for(let i = 0; i< len;i++) {
    if(!fn.call(this,arr[i],i,arr)){
      return false
    }
  }
  return true
}

