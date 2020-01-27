/**
 * y修饰符, sticky第一次匹配之后的再匹配，第一个字符开始
 */
const s = 'aaa_aa_a'
const r1 = /a+/g
const r2 = /a+/y

console.log(r1.exec(s))
console.log(r2.exec(s))

console.log(r1.exec(s))
console.log(r2.exec(s))
