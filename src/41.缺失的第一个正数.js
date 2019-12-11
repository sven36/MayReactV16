/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 *
 * https://leetcode-cn.com/problems/first-missing-positive/description/
 *
 * algorithms
 * Hard (36.88%)
 * Likes:    322
 * Dislikes: 0
 * Total Accepted:    29.8K
 * Total Submissions: 80.4K
 * Testcase Example:  '[1,2,0]'
 *
 * 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。
 * 
 * 示例 1:
 * 
 * 输入: [1,2,0]
 * 输出: 3
 * 
 * 
 * 示例 2:
 * 
 * 输入: [3,4,-1,1]
 * 输出: 2
 * 
 * 
 * 示例 3:
 * 
 * 输入: [7,8,9,11,12]
 * 输出: 1
 * 
 * 
 * 说明:
 * 
 * 你的算法的时间复杂度应为O(n)，并且只能使用常数级别的空间。
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    let l = count = 0;
    let r = nums.length - 1;
    if (r === -1) {
        return 1;
    }
    if (r === 0) {
        return nums[0] === 1 ? 2 : 1;
    }
    if (r === 1) {
        if (nums[0] < 0 && nums[1] < 0) {
            return 1;
        }
    }
    let res = Infinity;
    let max = 0;
    let map = {};
    while (l <= r) {
        if (nums[l] > 0) {
            res = Math.min(res, nums[l]);
            max = Math.max(max, nums[l]);
            map[nums[l]] = 1;
        }
        if (nums[r] > 0) {
            res = Math.min(res, nums[r]);
            max = Math.max(max, nums[r]);
            map[nums[r]] = 1;
        }

        l++;
        r--;
    }
    if (res === Infinity) {
        if (max > 0) {
            return max + 1;
        } else {
            res++;
        }
    } else if (res >= 1) {
        let val = 1;
        while (map[val]) {
            val++;
        }
        return val;
    }
    return res;
};
// firstMissingPositive([-1, -2]);
// @lc code=end

