/*
 * @lc app=leetcode.cn id=442 lang=javascript
 *
 * [442] 数组中重复的数据
 *
 * https://leetcode-cn.com/problems/find-all-duplicates-in-an-array/description/
 *
 *不需要额外空间则在输入数组中进行操作，时间复杂度为1则遍历一次，而且出现次数为1,2次
 * 第一种解法：投机取巧不太符合要求，先用sort排序然后i和i+1相等的时候将数据存起来
 * 第二种解法：遍历数组给对应数值的位置取相反数，当遇到下个相同数据的时候，此时该位置是负数就可以把数据输出出来
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    // let len = nums.length
    // let arr = []
    // if(len<2) return arr
    // nums.sort((a,b)=>a-b)
    // for(let i = 0; i<len-1; i++){
    //   if(nums[i]==nums[i+1]){
    //     arr.push(nums[i])
    //   }
    // }
    // return arr
    let result = [];
    for (let i = 0; i < nums.length; i++) {
        let num = Math.abs(nums[i]);
        if (nums[num - 1] > 0) {
            nums[num - 1] *= -1;
        } else {
            result.push(num);
        }
    }
    return result;
};
// @lc code=end

