/*
 * @lc app=leetcode.cn id=108 lang=javascript
 *
 * [108] 将有序数组转换为二叉搜索树
 *
 * https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/description/
 *
 * algorithms
 * Easy (67.50%)
 * Likes:    265
 * Dislikes: 0
 * Total Accepted:    36.3K
 * Total Submissions: 53.7K
 * Testcase Example:  '[-10,-3,0,5,9]'
 *
 * 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
 * 
 * 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
 * 
 * 示例:
 * 
 * 给定有序数组: [-10,-3,0,5,9],
 * 
 * 一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：
 * 
 * ⁠     0
 * ⁠    / \
 * ⁠  -3   9
 * ⁠  /   /
 * ⁠-10  5
 * 
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    function build(start, end) {
        if (start === end) {
            return null;
        }
        let mid = (start + end) >>> 1;
        let val = nums[mid];
        let node = new TreeNode(val);
        node.left = build(start, mid);
        node.right = build(mid + 1, end);
        return node;
    }
    return build(0, nums.length)
};

// sortedArrayToBST([-10, -3, 0, 5, 9])

function unique(array) {
    return [...new Set(array)]
}
unique([1, 1, 2, 3, '1'])

function flatten(arr) {
    return arr.reduce(function (prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(next) : next);
    }, [])
}
var arr = [1, [2, [3, 4]]];
// flatten(arr);
let curry = function (fn, args) {
    let length = fn.length;
    args = args || [];
    return function () {
        let params = [].slice.call(arguments);
        args = args.concat(params);
        if (args.length <= length) {
            return curry(fn, args);
        } else {
            return fn(args);
        }
    }
}
let ccc = curry((a, b) => a + b);
// ccc(1)(2)(3)

function throttle(func, wait) {
    let prev = 0;
    return () => {
        let now = Date.now();
        if (now - prev > wait) {
            func.apply(this, arguments);
            prev = Date.now();
        }
    }
}
function debounce(func, wait) {
    let timeId;
    return function () {
        timeId && clearTimeout(timeId);
        timeId = setTimeout(func, wait);
    }
}
var bind = function (context) {
    let func = this;
    return function () {
        func.apply(context, [].slice.call(arguments));
    }
}
// @lc code=end

