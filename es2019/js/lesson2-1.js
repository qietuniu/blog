// var abc = 123
// abcd = 234
// function test() {
//   ab = 45
// }
// test()

// function test() {
//   var a = 3
//   function test2() {
//     var b = 2
//     return a + b
//   }
//   console.log(test2())
// }

function test() {
  var a = 3
  if (a === 3) {
    var b = 4
    const c = 5
    console.log('a')
  } else {
    console.log('b')
  }
  console.log(b)
  console.log(c)
  return a + 4
}
console.log(test())
console.log(a)

// 实战
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1000)
}
console.log(a)
let a = 1