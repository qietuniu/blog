export default function insertSort (arr) {
  if (arr.length < 1) return arr
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i]
    let j = i - 1
    for (j; j >= 0; j--) {
      if (arr[j] > temp) {
        arr[j + 1] = arr[j]
      } else {
        break
      }
    }
    arr[j + 1] = temp
  }
  return arr
}
