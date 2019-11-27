/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 *
 * https://leetcode-cn.com/problems/search-insert-position/description/
 *
 * algorithms
 * Easy (44.58%)
 * Likes:    362
 * Dislikes: 0
 * Total Accepted:    92.7K
 * Total Submissions: 207.8K
 * Testcase Example:  '[1,3,5,6]\n5'
 *
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * 
 * 你可以假设数组中无重复元素。
 * 
 * 示例 1:
 * 
 * 输入: [1,3,5,6], 5
 * 输出: 2
 * 
 * 
 * 示例 2:
 * 
 * 输入: [1,3,5,6], 2
 * 输出: 1
 * 
 * 
 * 示例 3:
 * 
 * 输入: [1,3,5,6], 7
 * 输出: 4
 * 
 * 
 * 示例 4:
 * 
 * 输入: [1,3,5,6], 0
 * 输出: 0
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    // let res = 0;
    // if (nums.length === 1) {
    //     if (nums[0] >= target) {
    //         return 0;
    //     } else {
    //         return 1;
    //     }
    // }
    // function search(low, high) {
    //     if (high - low === 1) {
    //         return -1;
    //     }
    //     let mid = Math.floor((low + high) / 2);
    //     if (nums[mid] === target) {
    //         return mid;
    //     } else if (nums[mid] > target) {
    //         res = search(low, mid);
    //         if (res === -1) {
    //             return nums[low] >= target ? low : mid;
    //         }
    //     } else {
    //         res = search(mid, high);
    //         if (res === -1) {
    //             return high;
    //         }
    //     }
    //     return res;
    // }
    // res = search(0, nums.length);
    // return res;
};
// searchInsert([1, 3], 1)
// @lc code=end

