/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子序列
 *
 * https://leetcode-cn.com/problems/maximum-product-subarray/description/
 *
 * algorithms
 * Medium (35.81%)
 * Likes:    302
 * Dislikes: 0
 * Total Accepted:    25.5K
 * Total Submissions: 70.9K
 * Testcase Example:  '[2,3,-2,4]'
 *
 * 给定一个整数数组 nums ，找出一个序列中乘积最大的连续子序列（该序列至少包含一个数）。
 * 
 * 示例 1:
 * 
 * 输入: [2,3,-2,4]
 * 输出: 6
 * 解释: 子数组 [2,3] 有最大乘积 6。
 * 
 * 
 * 示例 2:
 * 
 * 输入: [-2,0,-1]
 * 输出: 0
 * 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    let len = nums.length;
    if (len === 1) {
        return nums[0];
    }
    let dpMax = [nums[0]];
    let dpMin = [nums[0]];
    let res = nums[0];
    for (let i = 1; i < len; i++) {
        dpMax[i] = Math.max(nums[i], dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i]);
        dpMin[i] = Math.min(nums[i], dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i]);
        res = Math.max(dpMax[i], res);
    }
    return res;
};
// maxProduct([2, -1, 1, 1]);
// @lc code=end

