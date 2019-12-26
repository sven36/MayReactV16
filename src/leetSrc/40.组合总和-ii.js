/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 *
 * https://leetcode-cn.com/problems/combination-sum-ii/description/
 *
 * algorithms
 * Medium (57.86%)
 * Likes:    172
 * Dislikes: 0
 * Total Accepted:    30.9K
 * Total Submissions: 52.8K
 * Testcase Example:  '[10,1,2,7,6,1,5]\n8'
 *
 * 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 * 
 * candidates 中的每个数字在每个组合中只能使用一次。
 * 
 * 说明：
 * 
 * 
 * 所有数字（包括目标数）都是正整数。
 * 解集不能包含重复的组合。 
 * 
 * 
 * 示例 1:
 * 
 * 输入: candidates = [10,1,2,7,6,1,5], target = 8,
 * 所求解集为:
 * [
 * ⁠ [1, 7],
 * ⁠ [1, 2, 5],
 * ⁠ [2, 6],
 * ⁠ [1, 1, 6]
 * ]
 * 
 * 
 * 示例 2:
 * 
 * 输入: candidates = [2,5,2,1,2], target = 5,
 * 所求解集为:
 * [
 * [1,2,2],
 * [5]
 * ]
 * 
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {

    let res = [];
    let path = [];
    candidates.sort((a, b) => b - a);
    let len = candidates.length;
    let min = candidates[len - 1];

    function getRes(diff, start, path) {
        if (diff === 0) {
            res.push(path.slice());
        }
        if (diff < min) return;
        for (let i = start; i < len; i++) {
            if (candidates[i] === candidates[i - 1] && i > start) continue;
            path.push(candidates[i]);
            getRes(diff - candidates[i], i + 1, path);
            path.pop();
        }
    }
    getRes(target, 0, path);
    return res;
};
// @lc code=end

