/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
 *
 * https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 *
 * algorithms
 * Medium (64.93%)
 * Likes:    125
 * Dislikes: 0
 * Total Accepted:    16.8K
 * Total Submissions: 25.8K
 * Testcase Example:  '[9,3,15,20,7]\n[9,15,7,20,3]'
 *
 * 根据一棵树的中序遍历与后序遍历构造二叉树。
 * 
 * 注意:
 * 你可以假设树中没有重复的元素。
 * 
 * 例如，给出
 * 
 * 中序遍历 inorder = [9,3,15,20,7]
 * 后序遍历 postorder = [9,15,7,20,3]
 * 
 * 返回如下的二叉树：
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
    if (inorder.length === 0) {
        return null;
    }
    let pre = start = postorder.length - 1;
    function walk(stop) {
        if (pre === -1) {
            return null;
        }
        if (inorder[start] === stop) {
            start--;
            return null;
        }
        let val = postorder[pre--];
        let node = new TreeNode(val);
        node.right = walk(val);
        node.left = walk(stop);
        return node;
    }
    return walk(null);
};
// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }
// var inorder = [9, 3, 15, 20, 7];
// var postorder = [9, 15, 7, 20, 3];
// buildTree(inorder, postorder);
// @lc code=end

