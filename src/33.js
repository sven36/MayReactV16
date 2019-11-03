/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 *
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/description/
 *
 * algorithms
 * Medium (36.10%)
 * Likes:    396
 * Dislikes: 0
 * Total Accepted:    51.7K
 * Total Submissions: 143K
 * Testcase Example:  '[4,5,6,7,0,1,2]\n0'
 *
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 * 
 * ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
 * 
 * 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
 * 
 * 你可以假设数组中不存在重复的元素。
 * 
 * 你的算法时间复杂度必须是 O(log n) 级别。
 * 
 * 示例 1:
 * 
 * 输入: nums = [4,5,6,7,0,1,2], target = 0
 * 输出: 4
 * 
 * 
 * 示例 2:
 * 
 * 输入: nums = [4,5,6,7,0,1,2], target = 3
 * 输出: -1
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    if (nums.length === 0) {
        return -1;
    }
    function dfs(l1, l2) {
        if (nums[l1] == target) return l1;
        if (nums[l2] == target) return l2;
        if (l1 === l2 || l1 === l2 - 1) {
            return -1;
        }
        let mid = Math.floor((l1 + l2) / 2);
        let mvalue = nums[mid];
        if (mvalue > nums[l1]) {
            if (target > nums[l1] && target < nums[mid]) {
                return dfs(l1, mid)
            } else {
                return dfs(mid, l2)
            }
        } else if (mvalue < nums[l1]) {
            if (target > nums[mid] && target < nums[l2]) {
                return dfs(mid, l2)
            } else {
                return dfs(l1, mid)
            }
        } else {
            return mid;
        }
    }
    return dfs(0, nums.length - 1)
};
// @lc code=end

