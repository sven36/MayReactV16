/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 *
 * https://leetcode-cn.com/problems/palindromic-substrings/description/
 *
 * algorithms
 * Medium (65.06%)
 * Likes:    506
 * Dislikes: 0
 * Total Accepted:    83.4K
 * Total Submissions: 128.2K
 * Testcase Example:  '"abc"'
 *
 * 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
 * 
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入："abc"
 * 输出：3
 * 解释：三个回文子串: "a", "b", "c"
 * 
 * 
 * 示例 2：
 * 
 * 输入："aaa"
 * 输出：6
 * 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 输入的字符串长度不会超过 1000 。
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    // let res = 0;
    // if (!s) {
    //     return 0;
    // }
    // let len = 2 * s.length - 1;
    // let l = 0;
    // let r = l + len % 2;
    // while (l >= 0 && r < s.length && s[l] === s[r]) {
    //     l++;
    //     r--;
    //     res++
    // }

    // return res;
    let len = s.length,
        _result = 0
    for (let i = 0; i < 2 * len - 1; ++i) {
        let left = parseInt(i / 2, 10),
            right = Math.ceil(i / 2)
        while (left >= 0 && right < len && s.charAt(left) === s.charAt(right)) {
            --left
            ++right
            ++_result
        }
    }
    return _result
};
// countSubstrings('aaa')
// @lc code=end

const arr = [30, 32, 6, 24];

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let start = arr[0];
    let left = arr[0];
    let right = arr[0];
    arr.forEach((item) => {
        if (item > start) {
            right.push(start);
        } else {
            left.push(start);
        }
    });
    return quickSort(left).concat([start], quickSort(right));
}

console.log(quickSort(arr));