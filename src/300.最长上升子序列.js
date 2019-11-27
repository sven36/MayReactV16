/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长上升子序列
 *
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (43.26%)
 * Likes:    348
 * Dislikes: 0
 * Total Accepted:    36.6K
 * Total Submissions: 84.4K
 * Testcase Example:  '[10,9,2,5,3,7,101,18]'
 *
 * 给定一个无序的整数数组，找到其中最长上升子序列的长度。
 * 
 * 示例:
 * 
 * 输入: [10,9,2,5,3,7,101,18]
 * 输出: 4 
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 * 
 * 说明:
 * 
 * 
 * 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
 * 你算法的时间复杂度应该为 O(n^2) 。
 * 
 * 
 * 进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {

    let res = 0;
    let top = new Array(nums.length).fill(0);
    let piles = 0;
    for (let i = 0; i < nums.length; i++) {
        let poker = nums[i];
        let l = 0;
        let r = piles;
        while (l < r) {
            let m = (l + r) >>> 1;
            if (top[m] > poker) {
                r = m;
            } else if (top[m] < poker) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        l === piles && (piles++);
        top[l] = poker;
    }
    return piles;

};
// @lc code=end

