/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 *
 * https://leetcode-cn.com/problems/3sum-closest/description/
 *
 * algorithms
 * Medium (41.91%)
 * Likes:    284
 * Dislikes: 0
 * Total Accepted:    52.1K
 * Total Submissions: 124.4K
 * Testcase Example:  '[-1,2,1,-4]\n1'
 *
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target
 * 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
 * 
 * 例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.
 * 
 * 与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    let sort = nums.sort((a, b) => { return a - b; });
    let length = nums.length;
    let min = 0;
    let index = 3;
    if (length === 3 || target <= sort[0]) {
        return sort[0] + sort[1] + sort[2];
    } else if (target >= sort[length - 1]) {
        return sort[length - 1] + sort[length - 2] + sort[length - 3];
    } else {
        // for (let i = 0; i < length; i++) {
        //     const element = sort[i];
        //     let res = Math.abs(element - target);
        //     if (i === 0) {
        //         min = res;
        //     } else {
        //         if (min > res) {
        //             min = res;
        //             index = i;
        //         }
        //     }
        // }
        // let l = m = r = null;
        // if (sort[index - 2]) {
        //     l = sort[index - 2] + sort[index - 1] + sort[index];
        // }
        // if (sort[index - 1]) {
        //     m = sort[index - 1] + sort[index] + (sort[index + 1] || sort[index - 2]);
        // }
        // if (sort[index + 2]) {
        //     r = sort[index] + sort[index + 1] + sort[index + 2];
        // }
        // !l&&(l=m);
        // !r&&(r=m);
        // // console.log(Math.min(l, m, r))
        // return Math.min(l, m, r);
    }
};
// threeSumClosest([-1, 2, 1, -4])
// @lc code=end

