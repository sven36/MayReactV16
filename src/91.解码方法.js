/*
 * @lc app=leetcode.cn id=91 lang=javascript
 *
 * [91] 解码方法
 *
 * https://leetcode-cn.com/problems/decode-ways/description/
 *
 * algorithms
 * Medium (22.02%)
 * Likes:    223
 * Dislikes: 0
 * Total Accepted:    22.2K
 * Total Submissions: 100.6K
 * Testcase Example:  '"12"'
 *
 * 一条包含字母 A-Z 的消息通过以下方式进行了编码：
 * 
 * 'A' -> 1
 * 'B' -> 2
 * ...
 * 'Z' -> 26
 * 
 * 
 * 给定一个只包含数字的非空字符串，请计算解码方法的总数。
 * 
 * 示例 1:
 * 
 * 输入: "12"
 * 输出: 2
 * 解释: 它可以解码为 "AB"（1 2）或者 "L"（12）。
 * 
 * 
 * 示例 2:
 * 
 * 输入: "226"
 * 输出: 3
 * 解释: 它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    function helper(str, i) {
        let len = str.length;
        if (len === i) {
            return 1;
        }
        if (s[i] === '0') {
            return 0;
        }

        let l = helper(str, i + 1);
        let r = 0;
        if (i < len - 1) {
            let ten = parseInt(str[i], 10) * 10;
            let one = parseInt(str[i + 1], 10);
            if (ten + one <= 26) {
                r = helper(str, i + 2);
            }
        }
        return l + r;
    }
    return helper(s, 0);
};
// numDecodings('27');
// @lc code=end

