/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    // s = 'babad'
    // s = 'abbd';
    // s = 'abcdcbaf';
    if (s.length < 2) {
        return s;
    }
    let arr = [];
    for (let i = 0; i < s.length; i++) {
        arr.push(s[i]);
        arr.push("#");
    }
    s = arr;
    s.unshift("#");

    let max = '';
    let res = '';
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        res = check(s, i - 1, i + 1);
        if (res.length > max.length) {
            max = res;
        }
    }
    function check(s, l, r) {
        while (s[l] && s[r] && s[l] === s[r]) {
            l = l - 1;
            r = r + 1;
        }
        return s.slice(l + 1, r);
    }
    return max.join("#").replace(/#/g, "");

};
// @lc code=end

