/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (24.43%)
 * Likes:    1523
 * Dislikes: 0
 * Total Accepted:    118.3K
 * Total Submissions: 484.3K
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0
 * ？找出所有满足条件且不重复的三元组。
 * 
 * 注意：答案中不可以包含重复的三元组。
 * 
 * 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 * 
 * 满足要求的三元组集合为：
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let ans = [];
    const len = nums.length;
    if (nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
        let L = i + 1;
        let R = len - 1;
        while (L < R) {
            const sum = nums[i] + nums[L] + nums[R];
            if (sum == 0) {
                ans.push([nums[i], nums[L], nums[R]]);
                while (L < R && nums[L] == nums[L + 1]) L++; // 去重
                while (L < R && nums[R] == nums[R - 1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }
    return ans;

    // if (!nums || nums.length < 3) {
    //     return [];
    // }
    // let s = nums.sort();
    // let res = [];
    // let len = s.length;
    // for (let i = 0; i < len; i++) {
    //     let m = nums[i];
    //     if (m > 0) {
    //         break;
    //     }
    //     if (i > 0 && m === nums[i - 1]) {
    //         continue;
    //     }
    //     let l = i + 1;
    //     let r = len - 1;
    //     while (l < r) {
    //         let nu = m + s[l] + s[r];
    //         if (nu > 0) {
    //             r--;
    //         } else if (nu < 0) {
    //             l++;
    //         } else if (nu === 0) {
    //             res.push([m, s[l], s[r]]);
    //             while (l < r && s[l] === s[l + 1]) {
    //                 l++;
    //             }
    //             while (l < r && s[r] === s[r - 1]) {
    //                 r--;
    //             }
    //             l++;
    //             r--;
    //         }
    //     }
    // }
    // return res;

};
// threeSum([-1, 0, 1, 2, -1, -4]);
// @lc code=end

