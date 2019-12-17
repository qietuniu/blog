// export default(arr) => {
//   let len = arr.length
//   for (let i = 0; i < len; i++) {
//     let min = arr[i]
//     for (let j = i + 1; j < len; j++) {
//       if (arr[j] < min) { // arr[j] < min
//         let c = min
//         min = arr[j]
//         arr[j] = c
//       }
//     }
//     arr[i] = min
//   }
//   return arr
// }
export default(arr) => {
  let len = arr.length
  if (len <= 1) return
  // 需要注意这里的边界, 因为需要在内层进行 i+1后的循环，所以外层需要 数组长度-1
  for (let i = len; i < len - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j // 找到整个数组的最小值
      }
    }
    const temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
