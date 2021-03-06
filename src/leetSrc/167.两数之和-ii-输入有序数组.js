/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 *
 * https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/description/
 *
 * algorithms
 * Easy (50.96%)
 * Likes:    204
 * Dislikes: 0
 * Total Accepted:    51.7K
 * Total Submissions: 101.1K
 * Testcase Example:  '[2,7,11,15]\n9'
 *
 * 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
 * 
 * 函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。
 * 
 * 说明:
 * 
 * 
 * 返回的下标值（index1 和 index2）不是从零开始的。
 * 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
 * 
 * 
 * 示例:
 * 
 * 输入: numbers = [2, 7, 11, 15], target = 9
 * 输出: [1,2]
 * 解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
 * 
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    let res = [-1, -1];
    let l = 0;
    let r = numbers.length - 1;
    while (l < r) {
        let sum = numbers[r] + numbers[l];
        if (sum === target) {
            res[0] = l + 1;
            res[1] = r + 1;
            break;
        } else if (sum > target) {
            r--;
        } else {
            l++;
        }
    }

    return res;
};
// twoSum([-1, 0], 9)
// @lc code=end

