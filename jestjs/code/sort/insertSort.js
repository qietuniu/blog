export default(arr) => {
  if (arr.length <= 1) return
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i]
    let j = i - 1
    // 若arr[i]前有大于arr[i]的值的化，向后移位，腾出空间，直到一个<=arr[i]的值
    for (j; j >= 0; j--) {
      if (arr[j] > temp) {
        arr[j + 1] = arr[j]
      } else {
        break
      }
    }
    arr[j + 1] = temp
  }
}
