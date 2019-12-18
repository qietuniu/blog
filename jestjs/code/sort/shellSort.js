export default(arr) => {
  let len = arr.length
  if (len <= 1) return
  for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let j = i
      let current = arr[i]
      while (j - gap >= 0 && current < arr[j - gap]) {
        arr[j] = arr[j - gap]
        j = j - gap
      }
      arr[j] = current
    }
  }
  return arr
}
