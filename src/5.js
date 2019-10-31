/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (27.49%)
 * Likes:    1401
 * Dislikes: 0
 * Total Accepted:    130.7K
 * Total Submissions: 475.4K
 * Testcase Example:  '"babad"'
 *
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * 
 * 示例 1：
 * 
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * 
 * 
 * 示例 2：
 * 
 * 输入: "cbbd"
 * 输出: "bb"
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    s = 'babad'
    let resObj = {};
    let resArr = [];
    let length = 0;
    let res = '';
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        let key = char + i;
        if (!resObj[key]) {
            resObj[key] = char;
        }
        let j = i + 1;
        while (s[j]) {
            let index = resObj[key].indexOf(s[j]);
            if (index === -1) {
                resObj[key] += s[j];
            } else {
                break;
            }
            j++;
        }
        resArr.push(resObj[key]);
    }
    for (let i = 0; i < resArr.length; i++) {
        const item = resArr[i];
        let l1 = item.length - 1;
        let item2 = resArr[i + l1] || '';
        if (item2.length - 1 === l1) {
            let isResStr = true;
            for (let i = 0; i < item.length; i++) {
                const char = item[i];
                if (char !== item2[l1 - i]) {
                    isResStr = false;
                    break;
                }
            }
            if (!isResStr) {
                break;
            } else {
                if (l1 > length) {
                    length = l1;
                    res = item+item2;
                }
            }
        }
    }
    console.log(res);
    return res;

};
longestPalindrome();
// @lc code=end

