function returnItem<T>(para:T):T{
    return para
}

function swap<T, U>(tuple:[U,T]){
    return tuple
}

interface IAnyObject {
    [prop: string]: any
}

function mixin<T extends IAnyObject, U extends IAnyObject>(first: T, second: U): T & U {
    const result = <T & U> {}
    for(let id in first) {
        (<T>result)[id] = first[id]
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
          (<U>result)[id] = second[id];
        }
      }
    return result
}
/**
 * interface只能用于定义对象类型，可以实现接口的extends和implements; 实现接口合并声明
 * type声明方式除了对象之外还可以定义交叉、联合、原始类型
 */
// 树类型
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>
}

type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
const A  = {
    num: 1
} as Interface

/**
 * 可辨识联合类型：字面量类型具有唯一性，类型字面量类似redux，通过xx.action之类的去明确对应
 */

/**
 * 装饰器：对于已有方法或者类进行扩展方法，本质就是一个函数，求值后也是函数
 * 在允许时被调用，被装饰的声明信息作为参数传入，一般命名withXXXX
 * 插件：babel-plugin-transform-decorators-legacy
 * tsconfig.json ： "experimentalDecorators": true
 */

// 类装饰器：constructor: Function
// 属性/方法装饰器： target、propertyKey、descriptor