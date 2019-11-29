/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个有序数组的中位数
 *
 * https://leetcode-cn.com/problems/median-of-two-sorted-arrays/description/
 *
 * algorithms
 * Hard (36.31%)
 * Likes:    1796
 * Dislikes: 0
 * Total Accepted:    115.4K
 * Total Submissions: 318.1K
 * Testcase Example:  '[1,3]\n[2]'
 *
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
 * 
 * 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 * 
 * 你可以假设 nums1 和 nums2 不会同时为空。
 * 
 * 示例 1:
 * 
 * nums1 = [1, 3]
 * nums2 = [2]
 * 
 * 则中位数是 2.0
 * 
 * 
 * 示例 2:
 * 
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 * 
 * 则中位数是 (2 + 3)/2 = 2.5
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    // 为了让搜索范围更小，我们始终让 num1 是那个更短的数组，PPT 第 9 张
    if (nums1.length > nums2.length) {
        let temp = nums1;
        nums1 = nums2;
        nums2 = temp;
    }

    // 上述交换保证了 m <= n，在更短的区间 [0, m] 中搜索，会更快一些
    let m = nums1.length;
    let n = nums2.length;

    // 使用二分查找算法在数组 nums1 中搜索一个索引 i，PPT 第 9 张
    let left = 0;
    let right = m;
    // 这里使用的是最简单的、"传统"的二分查找法模板，使用"高级的"二分查找法模板在退出循环时候处理不方便
    while (left <= right) {
        // 尝试要找的索引，在区间里完成二分，为了保证语义，这里就不定义成 mid 了
        // 用加号和右移是安全的做法，即使在溢出的时候都能保证结果正确，但是 Python 中不存在溢出
        // 参考：https://leetcode-cn.com/problems/guess-number-higher-or-lower/solution/shi-fen-hao-yong-de-er-fen-cha-zhao-fa-mo-ban-pyth/
        let i = (left + right) >>> 1;
        // j 的取值在 PPT 第 7 张
        let j = ((m + n + 1) >>> 1) - i;

        // 边界值的特殊取法的原因在 PPT 第 10 张
        let nums1LeftMax = i == 0 ? -Infinity : nums1[i - 1];
        let nums1RightMin = i == m ? Infinity : nums1[i];

        let nums2LeftMax = j == 0 ? -Infinity : nums2[j - 1];
        let nums2RightMin = j == n ? Infinity : nums2[j];

        // 交叉小于等于关系成立，那么中位数就可以从"边界线"两边的数得到，原因在 PPT 第 2 张、第 3 张
        if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
            // 已经找到解了，分数组之和是奇数还是偶数得到不同的结果，原因在 PPT 第 2 张
            if (((m + n) & 1) == 1) {
                return Math.max(nums1LeftMax, nums2LeftMax);
            } else {
                return (Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin)) / 2;
            }
        } else if (nums2LeftMax > nums1RightMin) {
            // 这个分支缩短边界的原因在 PPT 第 8 张
            left = i + 1;
        } else {
            // 这个分支缩短边界的原因在 PPT 第 8 张
            right = i - 1;
        }
    }
};
// @lc code=end

