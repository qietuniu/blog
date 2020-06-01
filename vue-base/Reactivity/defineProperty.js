// 模拟渲染
function render() {
  console.log('模拟渲染')
}
// 处理数组
const methods = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice']
const arrayProto = Array.prototype
let proto = Object.create(arrayProto)
methods.forEach(method => {
  proto[method] = function() {
    render()
    arrayProto[method].call(this, ...arguments)
  }
})
// 监听数据变化
function observer(data) {
  if(Array.isArray(data)) {
    data.__proto__ = proto
    return
  }
  if (typeof data == 'object') {
    for(let key in data) {
      defineReactive(data, key, data[key])
    }
  }
}

// 获取值，改变值
function defineReactive(data, key, value) {
  observer(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      observer(newValue)
      if(newValue == value) return
      render()
      value = newValue
    }
  })
}
// 强制更新
function $set(data, key, value) {
  if(Array.isArray(data)){
    return data.splice(key, 1, value)
  }
  defineReactive(data, key, value)
}

// 测试
let obj1 = {
  name: 'ct',
  address: {
    province: 'fujian',
    city: 'fuzhou'
  },
  like: []
}
observer(obj1)
obj1.name = 'qietuniu'
obj1.address.city = 'xiamen'
$set(obj1.like, 'like' , 'sing')
obj1.like.push('dance')
obj1.like.splice(0)

// 无法生效
// obj1.like.length--
// obj1.like[3] = 'sport'

console.log('obj1', obj1)