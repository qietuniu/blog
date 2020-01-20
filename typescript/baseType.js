var numberData = 1;
console.log('number', numberData);
var stringData = 'hi';
console.log('string', stringData);
var boolData = true;
console.log('boolean', boolData);
var arrData = [1, 2, 3, 4];
console.log('array', arrData);
var x = 1;
x = '12122';
console.log('any', x);
var doubleData = null;
doubleData = undefined;
console.log('多类型', doubleData);
// let neverData: never = (() => { throw new Error('exception') })()
// console.log('never 是其它类型（包括 null 和 undefined）的子类型', neverData)
var num1 = '1';
var num2 = num1;
console.log('类型断言：隐式类型转化', num2);
var str1 = 234234;
// str1.split('') 类型推断
//------------变量作用域-------------
var global_num = 12;
var Numbers = /** @class */ (function () {
    function Numbers() {
        this.num_val = 13;
    }
    Numbers.prototype.storeNum = function () {
        var local_num = 14;
    };
    Numbers.sval = 10;
    return Numbers;
}());
console.log('全局变量', global_num);
console.log('静态变量', Numbers.sval);
var obj = new Numbers();
console.log('实例变量', obj.num_val);
console.log('可选参数');
function buildName(firstName, lastName) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
var result1 = buildName("Bob"); // 正确
// let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
var result3 = buildName("Bob", "Adams"); // 正确
