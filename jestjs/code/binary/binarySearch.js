const binarySearch = (arr, target) => {
  let len = arr.length
  if (len === 0) return -1
  let low = 0
  let hight = len - 1
  while (low <= hight) {
    const mid = Math.floor((low + hight) / 2)
    if (target === arr[mid]) {
      return mid
    } else if (target < arr[mid]) {
      hight = mid - 1
    } else {
      low = mid + 1
    }
  }
  return -1
}
const arr = [1, 4, 5, 6, 7, 8, 10, 11, 23, 42, 44, 54, 56, 77, 102]
console.log(binarySearch(arr, 44))
console.log(binarySearch(arr, 1))
console.log(binarySearch(arr, 102))
console.log(binarySearch(arr, 1111))
