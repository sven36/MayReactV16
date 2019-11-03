/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 *
 * https://leetcode-cn.com/problems/zigzag-conversion/description/
 *
 * algorithms
 * Medium (45.37%)
 * Likes:    432
 * Dislikes: 0
 * Total Accepted:    69.2K
 * Total Submissions: 152.2K
 * Testcase Example:  '"PAYPALISHIRING"\n3'
 *
 * 将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。
 * 
 * 比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：
 * 
 * L   C   I   R
 * E T O E S I I G
 * E   D   H   N
 * 
 * 
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。
 * 
 * 请你实现这个将字符串进行指定行数变换的函数：
 * 
 * string convert(string s, int numRows);
 * 
 * 示例 1:
 * 
 * 输入: s = "LEETCODEISHIRING", numRows = 3
 * 输出: "LCIRETOESIIGEDHN"
 * 
 * 
 * 示例 2:
 * 
 * 输入: s = "LEETCODEISHIRING", numRows = 4
 * 输出: "LDREOEIIECIHNTSG"
 * 解释:
 * 
 * L     D     R
 * E   O E   I I
 * E C   I H   N
 * T     S     G
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    // s = 'PAYPALISHIRING';
    // numRows = 3;
    if (numRows === 1) {
        return s;
    }
    let res = [];
    let columns = Math.ceil(s.length / numRows);
    for (let i = 0; i < numRows; i++) {
        let str = s[i];
        for (let j = 1; j < columns; j++) {
            let n = 2 * (numRows - 1) * j + i;
            if (i != 0 && i != (numRows - 1)) {
                let t = n - 2 * i;
                s[t] && (str += s[t]);
                s[n] && (str += s[n]);
            } else {
                s[n] && (str += s[n]);
            }
        }
        res.push(str);
    }
    return res.join('');
};
// convert();
// @lc code=end

