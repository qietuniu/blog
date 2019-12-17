/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 *
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (59.57%)
 * Likes:    305
 * Dislikes: 0
 * Total Accepted:    63.4K
 * Total Submissions: 106K
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * 
 * 示例 1:
 * 
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 * 
 * 
 * 示例 2:
 * 
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 * 
 * 说明: 
 * 
 * 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
 * 其实循环到第K次就能拿到数据，不需要通过sort全部遍历
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  // nums.sort((a,b)=>a-b)
  // return nums[nums.length-k]
  let len = nums.length
  for(let i = len -1; i> len-k-1; i--){
    let temp
    for(let j=0; j<i;j++) {
      if(nums[j]>nums[j+1]){
        temp= nums[j]
        nums[j] = nums[j+1]
        nums[j+1] = temp
      }
    }
  }
  return nums[len-k]
};
// @lc code=end

