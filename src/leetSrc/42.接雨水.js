/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 *
 * https://leetcode-cn.com/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (47.00%)
 * Likes:    669
 * Dislikes: 0
 * Total Accepted:    37.4K
 * Total Submissions: 79.6K
 * Testcase Example:  '[0,1,0,2,1,0,1,3,2,1,2,1]'
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * 
 * 
 * 
 * 上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 感谢
 * Marcos 贡献此图。
 * 
 * 示例:
 * 
 * 输入: [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出: 6
 * 
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (heights) {
    // let l = 0;
    // let r = heights.length - 1;
    // let lMax = 0;
    // let rMax = 0;
    // let res = 0;
    // while (l < r) {
    //     if (heights[l] > heights[r]) {
    //         if (heights[r] > rMax) {
    //             rMax = heights[r];
    //         } else {
    //             res += rMax - heights[r];
    //         }
    //         r--;
    //     } else {
    //         if (heights[l] > lMax) {
    //             lMax = heights[l];
    //         } else {
    //             res += lMax - heights[l];
    //         }
    //         l++;
    //     }
    // }
    // return res;

    let stack = [];
    let res = 0;
    let cur = 0;
    while (cur < heights.length) {
        while (stack.length !== 0 && heights[cur] > heights[stack[stack.length - 1]]) {
            let p = stack.pop();
            let l = stack.length;
            if (l === 0) {
                break;
            }
            let distance = cur - stack[l - 1] - 1;
            let h = Math.min(heights[cur], heights[stack[l - 1]] - heights[p]);
            res += distance * h;
        }
        stack.push(cur++);
    }
    return res;


};
// trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
// @lc code=end

