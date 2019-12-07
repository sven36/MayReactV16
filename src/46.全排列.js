/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (72.55%)
 * Likes:    467
 * Dislikes: 0
 * Total Accepted:    61.6K
 * Total Submissions: 84.4K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个没有重复数字的序列，返回其所有可能的全排列。
 * 
 * 示例:
 * 
 * 输入: [1,2,3]
 * 输出:
 * [
 * ⁠ [1,2,3],
 * ⁠ [1,3,2],
 * ⁠ [2,1,3],
 * ⁠ [2,3,1],
 * ⁠ [3,1,2],
 * ⁠ [3,2,1]
 * ]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    // let res = [];
    // let len = nums.length;
    // let dp = [];
    // dp[0] = [[nums[0]]];
    // for (let i = 1; i < len; i++) {
    //     dp[i] = [];
    //     for (let j = 0; j <= dp[i - 1].length; j++) {
    //         if (j === dp[i - 1].length) {
    //             let clone = [...dp[i - 1][j - 1]];
    //             clone.push(nums[i]);
    //             dp[i].push(clone);
    //         } else {
    //             let clone = [...dp[i - 1][j]];
    //             clone.splice(j, 0, nums[i]);
    //             dp[i].push(clone);
    //         }
    //     }
    // }
    // return dp[n - 1]
    const result = [];    // 结果
    const f = (arr, vs) => {
        if (vs.length === arr.length) {   // 若中间数组vs的长度等于原始数组长度则说明组完了
            result.push(vs);
            return;
        }
        const need = arr.filter(v => !vs.includes(v));  // 筛选可以放到当前中间数组后面的元素
        for (const n of need) {
            f(arr, [...vs, n]); // 更新中间数组
        }
    }
    f(nums, []);
    return result;
};
// permute([1, 2, 3]);
// @lc code=end

