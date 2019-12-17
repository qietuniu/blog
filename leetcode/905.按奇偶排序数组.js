/*
 * @lc app=leetcode.cn id=905 lang=javascript
 *
 * [905] 按奇偶排序数组
 *
 * https://leetcode-cn.com/problems/sort-array-by-parity/description/
 *
 * algorithms
 * Easy (67.86%)
 * Likes:    113
 * Dislikes: 0
 * Total Accepted:    26.7K
 * Total Submissions: 39.4K
 * Testcase Example:  '[3,1,2,4]'
 *
 * 给定一个非负整数数组 A，返回一个数组，在该数组中， A 的所有偶数元素之后跟着所有奇数元素。
 * 
 * 你可以返回满足此条件的任何数组作为答案。
 * 
 * 
 * 
 * 示例：
 * 
 * 输入：[3,1,2,4]
 * 输出：[2,4,3,1]
 * 输出 [4,2,3,1]，[2,4,1,3] 和 [4,2,1,3] 也会被接受。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= A.length <= 5000
 * 0 <= A[i] <= 5000
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParity = function(A) {
  let arr = []
  let arrOdd = []
  A.sort((a,b)=>a-b)
  A.forEach(item => {
    if(item%2 ==0){
      arr.push(item)
    }else {
      arrOdd.push(item)
    }
  })
  arr.push(...arrOdd)
  return arr
};
// @lc code=end

