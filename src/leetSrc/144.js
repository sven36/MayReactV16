/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/
 *
 * algorithms
 * Medium (62.43%)
 * Likes:    166
 * Dislikes: 0
 * Total Accepted:    49.4K
 * Total Submissions: 79.1K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的 前序 遍历。
 * 
 * 示例:
 * 
 * 输入: [1,null,2,3]  
 * ⁠  1
 * ⁠   \
 * ⁠    2
 * ⁠   /
 * ⁠  3 
 * 
 * 输出: [1,2,3]
 * 
 * 
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    let res = [];
    let temp = [];
    let node = root;
    while (node !== null || temp.length !== 0) {
        while (node !== null) {
            res.push(node.val);
            temp.push(node);
            node = node.left;
        }
        node = temp.pop();
        node = node.right;
    }
    return res;
};
// let r = {
//     val: 1,
//     left: null,
//     right: { val: 2, left: null, right: null }
// }
// preorderTraversal(r);
// @lc code=end

