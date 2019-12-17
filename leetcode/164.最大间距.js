/*
 * @lc app=leetcode.cn id=164 lang=javascript
 *
 * [164] 最大间距
 * 既然最大间距是在比较的时候得出了接口，那就不要使用数组的sort()方法，可以在外层循环的时候，判断当i<len-1的时候已经排出了两个有序的数据，这个时候就能把间距值存起来，然后每次重复对比。但是循环结束时还有两个数，i为0，i为1的两个数没有对比
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
  let len = nums.length
  if(len<2) return 0
  let max = 0
  let space

  for(let i = len -1; i> 0; i--) {
    let temp
    for(let j = 0; j<i; j++){
      if(nums[j]>nums[j+1]){
        temp = nums[j]
        nums[j] = nums[j+1]
        nums[j+1] = temp
      }
    }
    if(i<len-1){
      space = nums[i+1]-nums[i]
      if(space>max) {
        max = space
      }
    }
  }
  return Math.max(max, nums[1] - nums[0])
}
// @lc code=end

