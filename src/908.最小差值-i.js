/*
 * @lc app=leetcode.cn id=908 lang=javascript
 *
 * [908] 最小差值 I
 *
 * https://leetcode-cn.com/problems/smallest-range-i/description/
 *
 * algorithms
 * Easy (66.88%)
 * Likes:    35
 * Dislikes: 0
 * Total Accepted:    7.3K
 * Total Submissions: 10.9K
 * Testcase Example:  '[1]\n0'
 *
 * 给定一个整数数组 A，对于每个整数 A[i]，我们可以选择任意 x 满足 -K <= x <= K，并将 x 加到 A[i] 中。
 * 
 * 在此过程之后，我们得到一些数组 B。
 * 
 * 返回 B 的最大值和 B 的最小值之间可能存在的最小差值。
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：A = [1], K = 0
 * 输出：0
 * 解释：B = [1]
 * 
 * 
 * 示例 2：
 * 
 * 输入：A = [0,10], K = 2
 * 输出：6
 * 解释：B = [2,8]
 * 
 * 
 * 示例 3：
 * 
 * 输入：A = [1,3,6], K = 3
 * 输出：0
 * 解释：B = [3,3,3] 或 B = [4,4,4]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= A.length <= 10000
 * 0 <= A[i] <= 10000
 * 0 <= K <= 10000
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var smallestRangeI = function (A, K) {
    let max = Math.max.apply(null, A)
    let min = Math.min.apply(null, A)
    if ((max - K) < (min + K)) {
        return 0
    } else {
        return max - min - 2 * K
    }
};
// @lc code=end

