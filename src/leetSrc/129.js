/*
 * @lc app=leetcode.cn id=129 lang=javascript
 *
 * [129] 求根到叶子节点数字之和
 *
 * https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/description/
 *
 * algorithms
 * Medium (59.88%)
 * Likes:    91
 * Dislikes: 0
 * Total Accepted:    12.5K
 * Total Submissions: 20.8K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。
 * 
 * 例如，从根到叶子节点路径 1->2->3 代表数字 123。
 * 
 * 计算从根到叶子节点生成的所有数字之和。
 * 
 * 说明: 叶子节点是指没有子节点的节点。
 * 
 * 示例 1:
 * 
 * 输入: [1,2,3]
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   3
 * 输出: 25
 * 解释:
 * 从根到叶子节点路径 1->2 代表数字 12.
 * 从根到叶子节点路径 1->3 代表数字 13.
 * 因此，数字总和 = 12 + 13 = 25.
 * 
 * 示例 2:
 * 
 * 输入: [4,9,0,5,1]
 * ⁠   4
 * ⁠  / \
 * ⁠ 9   0
 * / \
 * 5   1
 * 输出: 1026
 * 解释:
 * 从根到叶子节点路径 4->9->5 代表数字 495.
 * 从根到叶子节点路径 4->9->1 代表数字 491.
 * 从根到叶子节点路径 4->0 代表数字 40.
 * 因此，数字总和 = 495 + 491 + 40 = 1026.
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
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
    let sum = 0;
    function walk(node, str) {
        if (node) {
            str += node.val;
            if (node.left === null && node.right === null) {
                sum += parseInt(str, 10);
            }
            walk(node.left, str);
            walk(node.right, str);
        }
    }
    walk(root, '')
    return sum;
    // let res = [];
    // let sum = 0;
    // function walk(node) {
    //     if (node) {
    //         let l = walk(node.left);
    //         let r = walk(node.right);
    //         let val = node.val;
    //         let arr = [];
    //         if (node.left === null && node.right === null) {
    //             return val;
    //         }
    //         if (typeof l === 'number') {
    //             arr.push(val + `${l}`);
    //         } else {
    //             l && l.forEach(item => {
    //                 arr.push(val + item);
    //             });
    //         }
    //         if (typeof r === 'number') {
    //             arr.push(val + `${r}`);
    //         } else {
    //             r && r.forEach(item => {
    //                 arr.push(val + item);
    //             });
    //         }
    //         return arr;
    //     } else {
    //         return '';
    //     }
    // }
    // res = walk(root);
    // if (Array.isArray(res)) {
    //     res.forEach(e => {
    //         sum += parseInt(e, 10);
    //     });
    // } else if (res) {
    //     sum += parseInt(res, 10);
    // }
    // return sum;
};
// let r = {
//     val: 1,
//     left: { val: 2, left: null, right: null },
//     right: { val: 3, left: null, right: null },
// }
// sumNumbers(r);
// @lc code=end

