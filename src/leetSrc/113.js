/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
 *
 * https://leetcode-cn.com/problems/path-sum-ii/description/
 *
 * algorithms
 * Medium (57.41%)
 * Likes:    138
 * Dislikes: 0
 * Total Accepted:    19.9K
 * Total Submissions: 34.6K
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,5,1]\n22'
 *
 * 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
 * 
 * 说明: 叶子节点是指没有子节点的节点。
 * 
 * 示例:
 * 给定如下二叉树，以及目标和 sum = 22，
 * 
 * ⁠             5
 * ⁠            / \
 * ⁠           4   8
 * ⁠          /   / \
 * ⁠         11  13  4
 * ⁠        /  \    / \
 * ⁠       7    2  5   1
 * 
 * 
 * 返回:
 * 
 * [
 * ⁠  [5,4,11,2],
 * ⁠  [5,8,4,5]
 * ]
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
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function (root, sum) {
    if (!root) {
        return [];
    }
    let nodeArr = [];
    let res = [];
    let s = 0;
    let i = 0;
    function walk(node) {
        if (node) {
            if (nodeArr.indexOf(node) === -1) {
                nodeArr.push(node.val);
            }
            s += node.val;
            walk(node.left);
            walk(node.right);
            if (node.left === null && node.right === null) {
                if (s === sum) {
                    let nw = JSON.parse(JSON.stringify(nodeArr));
                    res.push(nw);
                }
            }
            s -= node.val;
            nodeArr.pop();
        }
    }
    walk(root);
    return res;
};
// var l2 = {
//     val: 11,
//     left: { val: 7, left: null, right: null },
//     right: { val: 2, left: null, right: null },
// }
// var r2 = {
//     val: 4,
//     left: { val: 5, left: null, right: null },
//     right: { val: 1, left: null, right: null },
// }
// let r = {
//     val: 5,
//     left: { val: 4, left: l2, right: null },
//     right: { val: 8, left: { val: 13, left: null, right: null }, right: r2 }
// }
// pathSum(r, 22);
// @lc code=end

