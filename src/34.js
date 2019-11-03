/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (37.86%)
 * Likes:    241
 * Dislikes: 0
 * Total Accepted:    41.9K
 * Total Submissions: 110.2K
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 * 
 * 你的算法时间复杂度必须是 O(log n) 级别。
 * 
 * 如果数组中不存在目标值，返回 [-1, -1]。
 * 
 * 示例 1:
 * 
 * 输入: nums = [5,7,7,8,8,10], target = 8
 * 输出: [3,4]
 * 
 * 示例 2:
 * 
 * 输入: nums = [5,7,7,8,8,10], target = 6
 * 输出: [-1,-1]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    let res = [-1, -1];

    if (nums.length === 0) {
        return res;
    }
    if (nums.length === 1) {
        return nums[0] === target ? [0, 0] : res;
    }
    if(nums[0]===target){
        return getMid(0);
    }else if(nums[nums.length-1]===target){
        return getMid(nums.length-1);
    }
    function dfs(low, high) {

        if (low === high || low === (high - 1)) {
            return res;
        }
        let mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) {
            return getMid(mid);
           
        }
        if (target > nums[mid]) {
            return dfs(mid, high);
        } else {
            return dfs(low, mid);
        }

    }
    function getMid(mid) {
        let i = j = mid;
        while (nums[i] === target) {
            i--;
        }
        res[0] = i + 1;
        while (nums[j] === target) {
            j++;
        }
        res[1] = j - 1;
        return res;
    }
    return dfs(0, nums.length - 1);
};
// @lc code=end

