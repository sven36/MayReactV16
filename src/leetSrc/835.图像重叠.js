/*
 * @lc app=leetcode.cn id=835 lang=javascript
 *
 * [835] 图像重叠
 *
 * https://leetcode-cn.com/problems/image-overlap/description/
 *
 * algorithms
 * Medium (56.65%)
 * Likes:    17
 * Dislikes: 0
 * Total Accepted:    1.2K
 * Total Submissions: 2.1K
 * Testcase Example:  '[[1,1,0],[0,1,0],[0,1,0]]\n[[0,0,0],[0,1,1],[0,0,1]]'
 *
 * 给出两个图像 A 和 B ，A 和 B 为大小相同的二维正方形矩阵。（并且为二进制矩阵，只包含0和1）。
 * 
 * 我们转换其中一个图像，向左，右，上，或下滑动任何数量的单位，并把它放在另一个图像的上面。之后，该转换的重叠是指两个图像都具有 1 的位置的数目。
 * 
 * （请注意，转换不包括向任何方向旋转。）
 * 
 * 最大可能的重叠是什么？
 * 
 * 示例 1:
 * 
 * 输入：A = [[1,1,0],
 * ⁠         [0,1,0],
 * [0,1,0]]
 * B = [[0,0,0],
 * [0,1,1],
 * [0,0,1]]
 * 输出：3
 * 解释: 将 A 向右移动一个单位，然后向下移动一个单位。
 * 
 * 注意: 
 * 
 * 
 * 1 <= A.length = A[0].length = B.length = B[0].length <= 30
 * 0 <= A[i][j], B[i][j] <= 1
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number}
 */
var largestOverlap = function (A, B) {
    let max = -Infinity
    let maxY = A.length
    let maxX = A[0].length
    let comparison = (activeArr, activeY, activeX, passiveArr, passiveY, passiveX) => {
        let sums = 0

        for (let aY = 0, pY = passiveY; aY < activeY; aY++ , pY++) {
            for (let aX = 0, pX = passiveX; aX < activeX; aX++ , pX++) {
                sums += activeArr[aY][aX] * passiveArr[pY][pX]
            }
        }

        if (sums > max) {
            max = sums
        }
    }

    A.forEach((row, y) => {
        row.forEach((item, x) => {
            comparison(A, maxY - y, maxX - x, B, y, x)
            comparison(B, maxY - y, maxX - x, A, y, x)
        })
    })

    return max
};
// @lc code=end

