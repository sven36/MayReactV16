/*
 * @lc app=leetcode.cn id=658 lang=javascript
 *
 * [658] 找到 K 个最接近的元素
 *
 * https://leetcode-cn.com/problems/find-k-closest-elements/description/
 *
 * algorithms
 * Medium (41.57%)
 * Likes:    44
 * Dislikes: 0
 * Total Accepted:    4.6K
 * Total Submissions: 10.9K
 * Testcase Example:  '[1,2,3,4,5]\n4\n3'
 *
 * 给定一个排序好的数组，两个整数 k 和 x，从数组中找到最靠近 x（两数之差最小）的 k 个数。返回的结果必须要是按升序排好的。如果有两个数与 x
 * 的差值一样，优先选择数值较小的那个数。
 * 
 * 示例 1:
 * 
 * 
 * 输入: [1,2,3,4,5], k=4, x=3
 * 输出: [1,2,3,4]
 * 
 * 
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: [1,2,3,4,5], k=4, x=-1
 * 输出: [1,2,3,4]
 * 
 * 
 * 
 * 
 * 说明:
 * 
 * 
 * k 的值为正数，且总是小于给定排序数组的长度。
 * 数组不为空，且长度不超过 10^4
 * 数组里的每个元素与 x 的绝对值不超过 10^4
 * 
 * 
 * 
 * 
 * 更新(2017/9/19):
 * 这个参数 arr 已经被改变为一个整数数组（而不是整数列表）。 请重新加载代码定义以获取最新更改。
 * 
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
    let res = [];
    let res2 = [];
    let l = 0;
    let r = arr.length - 1;
    while (l < r) {
        let m = (l + r) >>> 1;
        if (arr[m] >= x) {
            r = m;
        } else {
            l = m + 1;
        }
    }
    let end = Math.ceil((k - 1) / 2);

    for (let i = end; i >= 0; i--) {
        let ll = arr[l - i];
        let rr = arr[l + i];
        if (i !== 0) {
            ll && res.push(ll);
            rr && res2.unshift(rr);
        } else {
            res.push(ll);
        }
    }
    return res.concat(res2);
};
findClosestElements([1, 2, 3, 4, 5], 4, 3)
// @lc code=end

