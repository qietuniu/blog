/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 *
 * https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/description/
 *
 * algorithms
 * Medium (51.59%)
 * Likes:    517
 * Dislikes: 0
 * Total Accepted:    63.6K
 * Total Submissions: 123.1K
 * Testcase Example:  '"23"'
 *
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * 
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 
 * 
 * 
 * 示例:
 * 
 * 输入："23"
 * 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 * 
 * 
 * 说明:
 * 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
 * 
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if (digits.length < 1) return []
  let map=['',1,'abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']
  // 映射后的字母内容，23=>['abc','def']
  if (digits.length < 2) return map[digits].split('')
  
  let digitsArr = digits.split('')
  let code = []
  digitsArr.forEach(item => {
    if(map[item]) {
      code.push(map[item])
    }
  })
  let comb = (arr) => {
    // 临时变量存储两个组合的结果
    let temp = []
    for(let i = 0,il=arr[0].length;i<il;i++) {
      for(let j = 0,jl=arr[1].length;j<jl;j++) {
        temp.push(`${arr[0][i]}${arr[1][j]}`)
      }
    }
    arr.splice(0,2,temp)
    if(arr.length>1){
      comb(arr)
    }else{
      return temp
    }
    return arr[0]
  }
  return comb(code)
};
// @lc code=end

