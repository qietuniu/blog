export default (arr) => {
  let len = arr.length
  for (let i = len - 1; i > 0; i--) { // i = len-1
    let temp
    for (let j = 0; j < i; j++) { // j < i
      temp = arr[j]
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

// export default(arr) => {
//   let len = arr.length
//   for (let i = 0; i < len - 1; i++) {
//     for (let j = 0; j < len - 1 - i; j++) {
//       if (arr[j] > arr[j + 1]) {
//         let temp = arr[j + 1]
//         arr[j + 1] = arr[j]
//         arr[j] = temp
//       }
//     }
//   }
//   return arr
// }