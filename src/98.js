/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
 *
 * https://leetcode-cn.com/problems/validate-binary-search-tree/description/
 *
 * algorithms
 * Medium (27.74%)
 * Likes:    316
 * Dislikes: 0
 * Total Accepted:    48.2K
 * Total Submissions: 173.4K
 * Testcase Example:  '[2,1,3]'
 *
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 * 
 * 假设一个二叉搜索树具有如下特征：
 * 
 * 
 * 节点的左子树只包含小于当前节点的数。
 * 节点的右子树只包含大于当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。
 * 
 * 
 * 示例 1:
 * 
 * 输入:
 * ⁠   2
 * ⁠  / \
 * ⁠ 1   3
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入:
 * ⁠   5
 * ⁠  / \
 * ⁠ 1   4
 * / \
 * 3   6
 * 输出: false
 * 解释: 输入为: [5,1,4,null,null,3,6]。
 * 根节点的值为 5 ，但是其右子节点值为 4 。
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
 * @return {boolean}
 */
var isValidBST = function (root) {
    let res = true;
    let preVal = null;
    function walk(node) {
        if (node) {
            if (walk(node.left) === false) {
                return false;
            }
            let val = node.val;
            if (preVal !== null && preVal >= val) {
                return false;
            }
            preVal = val;
            if (walk(node.right) === false) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }
    res = walk(root);
    return res;

};
// let r = {
//     val: 10,
//     left: { val: 10, left: null, right: null },
//     // right: {
//     //     val: 15,
//     //     left: { val: 6, left: null, right: null },
//     //     right: { val: 20, left: null, right: null }
//     // }
// }
// isValidBST(r);
// @lc code=end

