/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 *
 * https://leetcode-cn.com/problems/sort-colors/description/
 *
 * algorithms
 * Medium (53.70%)
 * Likes:    274
 * Dislikes: 0
 * Total Accepted:    46.6K
 * Total Submissions: 86.2K
 * Testcase Example:  '[2,0,2,1,1,0]'
 *
 * 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 
 * 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 * 
 * 注意:
 * 不能使用代码库中的排序函数来解决这道题。
 * 
 * 示例:
 * 
 * 输入: [2,0,2,1,1,0]
 * 输出: [0,0,1,1,2,2]
 * 
 * 进阶：
 * 
 * 
 * 一个直观的解决方案是使用计数排序的两趟扫描算法。
 * 首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
 * 你能想出一个仅使用常数空间的一趟扫描算法吗？
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    let k0 = cur = k2 = 0;
    k2 = nums.length - 1;
    while (cur <= k2) {
        switch (nums[cur]) {
            case 0:
                let temp = nums[k0];
                nums[k0++] = 0;
                nums[cur++] = temp;
                break;
            case 1:
                cur++;
                break;
            case 2:
                let temp2 = nums[k2];
                nums[k2--] = 2;
                nums[cur] = temp2;
                break;
        }
    }
};
// sortColors([2, 0, 2, 1, 1, 0]);
// @lc code=end

