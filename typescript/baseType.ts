let numberData: number = 1
console.log('number', numberData)


let stringData: string = 'hi'
console.log('string', stringData)

let boolData: boolean = true
console.log('boolean', boolData)

let arrData: Array<number> = [1, 2, 3, 4]
console.log('array', arrData)

let x: any = 1
x = '12122'
console.log('any', x)

let doubleData: string | null | undefined = null
doubleData = undefined
console.log('多类型', doubleData)


// let neverData: never = (() => { throw new Error('exception') })()
// console.log('never 是其它类型（包括 null 和 undefined）的子类型', neverData)

let num1 = '1'
let num2:number = <number><any> num1
console.log('类型断言：隐式类型转化', num2)

let str1 = 234234
// str1.split('') 类型推断

//------------变量作用域-------------
let global_num = 12
class Numbers{
  num_val = 13
  static sval = 10

  storeNum():void {
    let local_num = 14
  }
}
console.log('全局变量', global_num)
console.log('静态变量',Numbers.sval)
let obj = new Numbers()
console.log('实例变量', obj.num_val)

console.log('可选参数')
function buildName(firstName: string, lastName?: string) {
  if (lastName)
      return firstName + " " + lastName;
  else
      return firstName;
}

let result1 = buildName("Bob");  // 正确
// let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");  // 正确