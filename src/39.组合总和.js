/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 *
 * https://leetcode-cn.com/problems/combination-sum/description/
 *
 * algorithms
 * Medium (67.30%)
 * Likes:    458
 * Dislikes: 0
 * Total Accepted:    48.5K
 * Total Submissions: 72K
 * Testcase Example:  '[2,3,6,7]\n7'
 *
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 * 
 * candidates 中的数字可以无限制重复被选取。
 * 
 * 说明：
 * 
 * 
 * 所有数字（包括 target）都是正整数。
 * 解集不能包含重复的组合。 
 * 
 * 
 * 示例 1:
 * 
 * 输入: candidates = [2,3,6,7], target = 7,
 * 所求解集为:
 * [
 * ⁠ [7],
 * ⁠ [2,2,3]
 * ]
 * 
 * 
 * 示例 2:
 * 
 * 输入: candidates = [2,3,5], target = 8,
 * 所求解集为:
 * [
 * [2,2,2,2],
 * [2,3,3],
 * [3,5]
 * ]
 * 
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    // let res = [];
    // let hash = {};
    // candidates = candidates.sort();
    // let len = candidates.length;
    // for (let i = 1; i < len + 1; i++) {
    //     hash[i] = [];
    //     for (let j = 0; j < len; j++) {
    //         if (i === candidates[j]) {
    //             hash[i].push([i]);
    //         } else if (i > j) {
    //             let key = i - candidates[j];
    //             hash[key] && hash[key].map(item => {
    //                 let temp = [];
    //                 temp.push(...item);
    //                 temp.push(candidates[j]);
    //                 temp = temp.sort();
    //                 hash[i].push(temp);
    //                 hash[i] = Array.from(new Set(hash[i]));

    //             });
    //         }

    //     }
    // }
    // return res;

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
            path.push(candidates[i]);
            getRes(diff - candidates[i], i, path);
            path.pop();
        }
    }
    getRes(target, 0, path);
    return res;
};
// combinationSum([2, 3, 5, 7], 7)
// @lc code=end

