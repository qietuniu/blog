// （1）查找第一个值等给定值的元素
// 在循环中，如果我们找到的等于给定值的值，而且这个值「位于整个数组的第一个位置或者它前面那个元素小于给定值」,前面的数字可能相同

const first = (arr, target) => {
  let len = arr.length
  if (len === 0) return -1
  let low = 0
  let hight = len - 1
  while (low <= hight) {
    let mid = Math.floor((hight + low) / 2)
    if (target > arr[mid]) {
      low = mid + 1
    } else if (target < arr[mid]) {
      hight = mid - 1
    } else {
      if (mid === 0 || arr[mid - 1] !== target) {
        return mid
      } else {
        hight = mid - 1
      }
    }
  }
  return -1
}
// 查找最后一个相等的数
const last = (arr, target) => {
  let len = arr.length
  if (len === 0) return -1
  let low = 0
  let hight = len - 1
  while (low <= hight) {
    let mid = Math.floor((hight + low) / 2)
    if (target > arr[mid]) {
      low = mid + 1
    } else if (target < arr[mid]) {
      hight = mid - 1
    } else {
      if (mid === 0 || arr[mid + 1] !== target) {
        return mid
      } else {
        low = mid + 1
      }
    }
  }
  return -1
}

// 查找第一个大于等于给定值的元素
const firstBig = (arr, target) => {
  let len = arr.length
  if (len === 0) return -1
  let low = 0
  let hight = len - 1
  while (low <= hight) {
    let mid = Math.floor((hight + low) / 2)
    if (target > arr[mid]) {
      low = mid + 1
    } else {
      if (mid === 0 || arr[mid + 1] !== target) {
        return mid
      } else {
        if (mid === 0 || arr[mid - 1] < target) {
          return mid
        } else {
          hight = mid - 1
        }
      }
    }
  }
  return -1
}

// 查找最后一个小于等于给定值的元素
const lastSmall = (arr, target) => {
  let len = arr.length
  if (len === 0) return -1
  let low = 0
  let hight = len - 1
  while (low <= hight) {
    let mid = Math.floor((hight + low) / 2)
    if (target < arr[mid]) {
      hight = mid - 1
    } else {
      if (mid === 0 || arr[mid + 1] >= target) {
        return mid
      } else {
        low = mid + 1
      }
    }
  }
  return -1
}

const arr1 = [1, 2, 3, 4, 4, 4, 4, 4, 6, 7, 8, 8, 9]
const data1 = first(arr1, 4)
console.log(data1)

const data2 = last(arr1, 4)
console.log(data2)
const data3 = firstBig(arr1, 5)
console.log(data3)
const data4 = lastSmall(arr1, 4)
console.log(data4)
