/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (62.52%)
 * Likes:    287
 * Dislikes: 0
 * Total Accepted:    33.9K
 * Total Submissions: 53.8K
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 根据一棵树的前序遍历与中序遍历构造二叉树。
 * 
 * 注意:
 * 你可以假设树中没有重复的元素。
 * 
 * 例如，给出
 * 
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 * 
 * 返回如下的二叉树：
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    function buildHelper(pl, pr, il, ir) {
        if (pl === pr) {
            return null;
        }
        let val = preorder[pl];
        let root = new TreeNode(val);
        let index = inorder.slice(il, ir).indexOf(val);
        let lNum = index - il;
        root.left = buildHelper(pl + 1, pl + lNum + 1, il, index);
        root.right = buildHelper(pl + lNum + 1, pr, index + 1, ir);
    }
    return buildHelper(0, preorder.length, 0, inorder.length);
};
// @lc code=end

