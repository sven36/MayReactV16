/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (72.41%)
 * Likes:    632
 * Dislikes: 0
 * Total Accepted:    56.7K
 * Total Submissions: 78.2K
 * Testcase Example:  '3'
 *
 * 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
 * 
 * 例如，给出 n = 3，生成结果为：
 * 
 * [
 * ⁠ "((()))",
 * ⁠ "(()())",
 * ⁠ "(())()",
 * ⁠ "()(())",
 * ⁠ "()()()"
 * ]
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    let dp = [];
    dp[0] = [''];
    dp[1] = ['()'];
    for (let i = 2; i <= n; i++) {
        dp[i] = [];
        for (let j = 0; j < i; j++) {
            dp[j].map(a => {
                dp[i - 1 - j].map(b => {
                    dp[i].push('(' + a + ')' + b);
                });
            })
        }
    }

    return dp[n];
};
// generateParenthesis(4);
// @lc code=end

