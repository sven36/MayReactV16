/*
 * @lc app=leetcode.cn id=60 lang=javascript
 *
 * [60] 第k个排列
 *
 * https://leetcode-cn.com/problems/permutation-sequence/description/
 *
 * algorithms
 * Medium (47.32%)
 * Likes:    144
 * Dislikes: 0
 * Total Accepted:    18.3K
 * Total Submissions: 38.6K
 * Testcase Example:  '3\n3'
 *
 * 给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。
 * 
 * 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
 * 
 * 
 * "123"
 * "132"
 * "213"
 * "231"
 * "312"
 * "321"
 * 
 * 
 * 给定 n 和 k，返回第 k 个排列。
 * 
 * 说明：
 * 
 * 
 * 给定 n 的范围是 [1, 9]。
 * 给定 k 的范围是[1,  n!]。
 * 
 * 
 * 示例 1:
 * 
 * 输入: n = 3, k = 3
 * 输出: "213"
 * 
 * 
 * 示例 2:
 * 
 * 输入: n = 4, k = 9
 * 输出: "2314"
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
    var text = '', list = [];
    for (var i = 1; i <= n; i++) list.push(i);
    var length = n, ni = 1, t;
    while (text.length < length) {
        ni = 1;
        t = n;
        while (t > 1) { t--; ni *= t; }
        var num = (k - 1 - (k - 1) % ni) / ni + 1;
        k -= (num - 1) * ni;
        text += list[num - 1];
        list.splice(num - 1, 1);
        n--;
    }
    return text;
};
// @lc code=end

