let obj = {
  name: 'ct',
  address: {
    province: 'fujian',
    city: 'fuzhou'
  },
  like: []
}
// 模拟渲染
function render() {
  console.log('模拟渲染')
}

let handler = {
  get(target, key, receiver) {
    if(typeof target[key] == 'object' && typeof target[key] !== null){
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    if(key === 'length') return true
    render()
    return Reflect.set(target, key, value, receiver)
  }
}

let proxy = new Proxy(obj, handler)
proxy.address.city = 'xiamen'
proxy.like.push('sing')
proxy.arr--