/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/description/
 *
 * algorithms
 * Easy (51.36%)
 * Likes:    621
 * Dislikes: 0
 * Total Accepted:    97.2K
 * Total Submissions: 188.9K
 * Testcase Example:  '[7,1,5,3,6,4]'
 *
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
 * 
 * 注意你不能在买入股票前卖出股票。
 * 
 * 示例 1:
 * 
 * 输入: [7,1,5,3,6,4]
 * 输出: 5
 * 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 * ⁠    注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
 * 
 * 
 * 示例 2:
 * 
 * 输入: [7,6,4,3,1]
 * 输出: 0
 * 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let len = prices.length;
    let min = max = 0;

    for (let i = 0; i < len; i++) {
        let l = prices[i];
        // for (let j = len - 1; j > 0; j--) {
        //     const r = prices[j];
        //     if (i < j) {
        //         res = Math.max(res, r - l);
        //     }
        // }
        if (i === 0) {
            min = l;
        }
        if (l < min) {
            min = l;
        } else if (l - min > max) {
            max = l - min;
        }
    }
    return max;
};
// maxProfit([7, 1, 5, 3, 6, 4]);
// @lc code=end

