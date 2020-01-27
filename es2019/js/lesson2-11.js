/**
 * proxy 代理
 * 屏蔽原始信息，保障原始信息安全
 */
let o = {
  name: 'ct',
  age: 18
}
// get ,set, deleteProperty等
// let d = new Proxy(o, {
//   get (target, key) {
//     if (key === 'age') return target[key] + 10
//   }
// })
// let d = new Proxy(o, {
//   get (target, key) {
//     return target[key]
//   },
//   set (target, key, value) {
//     return false
//   }
// })
// d.age = 20
// console.log('d.age', d.age)

// es5
// for (let [key] of Object.entries(o)) {
//   Object.defineProperty(o, key, {
//     writable: false
//   })
// }
// o.age = 20
// console.log('o.age', o.age)

// 校验, 监控, 错误捕获，撤销proxy
// window.addEventListener('error', (e) => {
//   console.log('e', e.message)
//   // 上报规则
// }, true)
// let validate = (target, key, value) => {
//   if (Reflect.has(target, key)) {
//     if (key === 'age') {
//       if (value > 200) {
//         // throw new TypeError('over')
//         return false
//       } else {
//         target[key] = value
//       }
//     } else {
//       target[key] = value
//     }
//   } else return false
// }
// let d = new Proxy(o, {
//   get (target, key) {
//     return target[key] || ''
//   },
//   set: validate
// })
// d.age = 100
// console.log('d', d)
// d.age = 300
// console.log('d', d)

// constructor的属性会被修改,每次都一样
// class Component {
//   // constructor () {
//   //   this.id = Math.random().toString(36).slice(-8)
//   // }
//   // 每次都不一样
//   // get id () {
//   //   return Math.random().toString(36).slice(-8)
//   // }

//   // proxy可以使得每次一样，而且不可修改
//   constructor () {
//     this.proxy = new Proxy({
//       id: Math.random().toString(36).slice(-8)
//     }, {})
//   }
//   get id () {
//     return this.proxy.id
//   }
// }

// let com = new Component()
// for (let i = 0; i < 10; i++) {
//   console.log(com.id)
// }

// 代理数据加撤销信息
let d = Proxy.revocable(o, {
  get (target, key) {
    return target[key]
  },
  set (target, key, value) {
    return false
  }
})
console.log('d.age', d.proxy.age, d.proxy)
setTimeout(() => {
  d.revoke()
  setTimeout(() => {
    console.log('d.age', d.proxy.age, d.proxy)
  }, 100)
}, 1000)
