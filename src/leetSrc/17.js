/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 *
 * https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/description/
 *
 * algorithms
 * Medium (51.28%)
 * Likes:    484
 * Dislikes: 0
 * Total Accepted:    54.4K
 * Total Submissions: 106.1K
 * Testcase Example:  '"23"'
 *
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * 
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 
 * 
 * 
 * 示例:
 * 
 * 输入："23"
 * 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 * 
 * 
 * 说明:
 * 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
 * 
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    // let obj = {
    //     '2': ['a', 'b', 'c'],
    //     '3': ['d', 'e', 'f'],
    //     '4': ['g', 'h', 'i'],
    //     '5': ['j', 'k', 'l'],
    //     '6': ['m', 'n', 'o'],
    //     '7': ['p', 'q', 'r', 's'],
    //     '8': ['t', 'u', 'v'],
    //     '9': ['w', 'x', 'y', 'z']
    // }
    // let res = [];
    // let arr = [];
    // for (let i = 0; i < digits.length; i++) {
    //     const char = digits[i];
    //     arr.push(obj[char]);
    // }

    // for (let m = 0; m < 4; m++) {
    //     for (let n = 0; n < arr.length; n++) {
    //         arr[n][m];

    //     }

    // }
    if (!digits) return [];
    const arr = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k', 'l'], ['m', 'n', 'o'], ['p', 'q', 'r', 's'], ['t', 'u', 'v'], ['w', 'x', 'y', 'z']];
    let res = [];
    for (let i = 0; i < digits.length; i++) {
        const char = digits[i];
        res.push(arr[char - 2]);
    }
    let t = res.reduce((a, b) => {
        let m = [];
        a.map((ar) => {
            b.map((ar2) => {
                m.push(ar + ar2);
            });
        });
        return m;
    });
    return t;
};
letterCombinations('23');
// @lc code=end

