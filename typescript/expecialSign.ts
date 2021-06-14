/**
 * ！非空断言
 */
function oneFun(maybeString: string | undefined | null) {
    const str: string = maybeString!
}

function oneFun2(fn: () => number | undefined) {
    const str = fn!()
}

let x3!: number;
oneFun3();
console.log(2 * x3);

function oneFun3() {
    x3 = 10;
}

/**
 * ?.可选链
 */


/**
 * Partial
 */
interface IPerson {
    name: string;
    age: string
}
type IAnimal = Partial<IPerson>

type customerPartial<T> = {
    [ P in keyof T]?: T[P]
}