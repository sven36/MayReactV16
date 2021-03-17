/*
 * @lc app=leetcode.cn id=962 lang=javascript
 *
 * [962] 最大宽度坡
 *
 * https://leetcode-cn.com/problems/maximum-width-ramp/description/
 *
 * algorithms
 * Medium (42.55%)
 * Likes:    105
 * Dislikes: 0
 * Total Accepted:    9.3K
 * Total Submissions: 21.7K
 * Testcase Example:  '[6,0,8,2,1,5]'
 *
 * 给定一个整数数组 A，坡是元组 (i, j)，其中  i < j 且 A[i] <= A[j]。这样的坡的宽度为 j - i。
 * 
 * 找出 A 中的坡的最大宽度，如果不存在，返回 0 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：[6,0,8,2,1,5]
 * 输出：4
 * 解释：
 * 最大宽度的坡为 (i, j) = (1, 5): A[1] = 0 且 A[5] = 5.
 * 
 * 
 * 示例 2：
 * 
 * 输入：[9,8,1,0,1,9,4,0,4,1]
 * 输出：7
 * 解释：
 * 最大宽度的坡为 (i, j) = (2, 9): A[2] = 1 且 A[9] = 1.
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 2 <= A.length <= 50000
 * 0 <= A[i] <= 50000
 * 
 * 
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number}
 */
var maxWidthRamp = function (A) {
    let res = 0;
    let len = A.length - 1;
    let i = 0;
    while (i < len) {
        let f1 = len - i;
        let f2 = len - 1 - i;
        if (A[i] <= A[f1] && i !== f1) {
            res = Math.max(res, f1 - i);
        }
        if (A[i] <= A[f2] && i !== f2) {
            res = Math.max(res, f2 - i);
        }
        if (A[i + 1] <= A[f1] && i !== f1) {
            res = Math.max(res, f1 - i - 1);
        }

        if (A[i + 1] <= A[f2] && i !== f2) {
            res = Math.max(res, f2 - i - 1);
        }
        i++;
    }
    return res;
};
// maxWidthRamp([4, 2, 3, 1])
// @lc code=end