/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 *
 * https://leetcode-cn.com/problems/is-subsequence/description/
 *
 * algorithms
 * Easy (47.63%)
 * Likes:    84
 * Dislikes: 0
 * Total Accepted:    16.6K
 * Total Submissions: 35K
 * Testcase Example:  '"abc"\n"ahbgdc"'
 *
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 * 
 * 你可以认为 s 和 t 中仅包含英文小写字母。字符串 t 可能会很长（长度 ~= 500,000），而 s 是个短字符串（长度 <=100）。
 * 
 * 
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
 * 
 * 示例 1:
 * s = "abc", t = "ahbgdc"
 * 
 * 返回 true.
 * 
 * 示例 2:
 * s = "axc", t = "ahbgdc"
 * 
 * 返回 false.
 * 
 * 后续挑战 :
 * 
 * 如果有大量输入的 S，称作S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T
 * 的子序列。在这种情况下，你会怎样改变代码？
 * 
 * 致谢:
 * 
 * 特别感谢 @pbrother 添加此问题并且创建所有测试用例。
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
let dp = null;
var isSubsequence = function (s, t) {
    if (s.length == 0) return true;
    let sPos = 0;
    let tPos = 0;
    let tLen = t.length;
    let sLen = s.length;
    while (tPos < tLen) {
        if (t[tPos] == s[sPos]) sPos++;
        if (sPos == sLen) return true;
        tPos++;
    }
    return false;

    let getDp = function (t) {
        let dp = new Map();
        for (let i = 0; i < 26; i++) dp.set(String.fromCharCode((97 + i)), []);
        for (let i = 0; i < t.length; i++) {
            dp.get(t[i]).push(i);
        }
        return dp;
    }
    if (dp == null) dp = getDp(t);
    let tag = -1;
    for (let i = 0, len = s.length; i < len; i++) {
        let now = s[i];
        let left = 0, right = dp.get(now).length - 1;
        while (left < right) {
            let mid = parseInt((left + right) / 2);
            if (dp.get(now)[mid] > tag)
                right = mid;
            else
                left = mid + 1;
        }
        if (right < left || dp.get(now)[left] < tag) return false;
        tag = dp.get(now)[left];
    }
    return true;
}
// isSubsequence('abc', 'ahbgdc')
// @lc code=end

