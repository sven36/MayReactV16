/*
 * @lc app=leetcode.cn id=85 lang=javascript
 *
 * [85] 最大矩形
 *
 * https://leetcode-cn.com/problems/maximal-rectangle/description/
 *
 * algorithms
 * Hard (42.72%)
 * Likes:    243
 * Dislikes: 0
 * Total Accepted:    12.3K
 * Total Submissions: 28.9K
 * Testcase Example:  '[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]'
 *
 * 给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 * 
 * 示例:
 * 
 * 输入:
 * [
 * ⁠ ["1","0","1","0","0"],
 * ⁠ ["1","0","1","1","1"],
 * ⁠ ["1","1","1","1","1"],
 * ⁠ ["1","0","0","1","0"]
 * ]
 * 输出: 6
 * 
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
    let r = matrix[0].length;
    let c = matrix.length;
    let res = 0;
    let obj = {};
    for (let i = 0; i < c; i++) {
        for (let j = 0; j < r; j++) {
            let char = matrix[i][j];
            if (obj[`${i}${j}`]) {
                continue;
            }
            if (char === '1') {
                let s = t = 1;
                while (matrix[i][j + t] === '1') {
                    obj[`${i}${j + t}`] = 1;
                    t++;
                }
                while (matrix[i + s] && matrix[i + s][j] === '1') {
                    for (let y = 1; y < t; y++) {
                        const element = array[index];
                        
                    }
                    s++;
                }
      
                res = Math.max(res, s * t);
            }
        }
    }
    return res;
};
maximalRectangle([["0", "0", "0", "0", "0"],
["0", "0", "1", "1", "1"],
["0", "1", "1", "1", "1"],
["0", "0", "0", "1", "0"]])
// @lc code=end

