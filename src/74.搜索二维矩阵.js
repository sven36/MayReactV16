/*
 * @lc app=leetcode.cn id=74 lang=javascript
 *
 * [74] 搜索二维矩阵
 *
 * https://leetcode-cn.com/problems/search-a-2d-matrix/description/
 *
 * algorithms
 * Medium (36.35%)
 * Likes:    102
 * Dislikes: 0
 * Total Accepted:    22.6K
 * Total Submissions: 62.2K
 * Testcase Example:  '[[1,3,5,7],[10,11,16,20],[23,30,34,50]]\n3'
 *
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 * 
 * 
 * 每行中的整数从左到右按升序排列。
 * 每行的第一个整数大于前一行的最后一个整数。
 * 
 * 
 * 示例 1:
 * 
 * 输入:
 * matrix = [
 * ⁠ [1,   3,  5,  7],
 * ⁠ [10, 11, 16, 20],
 * ⁠ [23, 30, 34, 50]
 * ]
 * target = 3
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入:
 * matrix = [
 * ⁠ [1,   3,  5,  7],
 * ⁠ [10, 11, 16, 20],
 * ⁠ [23, 30, 34, 50]
 * ]
 * target = 13
 * 输出: false
 * 
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    if (!matrix || !matrix[0]) {
        return false;
    }
    let column = matrix[0].length;
    let row = matrix.length;
    let r = row * column - 1;
    let l = 0;
    while (l < r) {
        let m = (l + r) >>> 1;
        let q = Math.floor(m / column);
        let re = m % column;
        if (matrix[q][re] > target) {
            r = m;
        } else if (matrix[q][re] < target) {
            l = m + 1;
        } else {
            return true;
        }
    }
    let q1 = Math.floor(l / column);
    let r1 = l % column;
    if (!matrix[q1]) {
        return false;
    }
    return matrix[q1][r1] === target;
};
// searchMatrix([[1, 3, 5]], 2);
// @lc code=end

