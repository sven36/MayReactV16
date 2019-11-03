/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (72.19%)
 * Likes:    592
 * Dislikes: 0
 * Total Accepted:    50.7K
 * Total Submissions: 70.2K
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
    if (n === 0) {
        return [];
    }
    if (n === 1) {
        return ['()'];
    }
    let p = 0;
    let res = [[''], ['()']];
    for (let i = 2; i <= n; i++) {
        let temp = [];
        for (let j = 0; j < i; j++) {
            let l1 = res[j];
            let l2 = res[i - 1 - j];
            for (let m = 0; m < l1.length; m++) {
                const mm = l1[m];
                for (let n = 0; n < l2.length; n++) {
                    const nn = l2[n];
                    let el = `(${mm || ''})${nn || ''}`;
                    temp.push(el);
                }
            }
        }
        res.push(temp);
    }
    return res[n];
};
// generateParenthesis(3);
// @lc code=end

