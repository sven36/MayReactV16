/*
 * @lc app=leetcode.cn id=99 lang=javascript
 *
 * [99] 恢复二叉搜索树
 *
 * https://leetcode-cn.com/problems/recover-binary-search-tree/description/
 *
 * algorithms
 * Hard (53.92%)
 * Likes:    101
 * Dislikes: 0
 * Total Accepted:    7.2K
 * Total Submissions: 13.3K
 * Testcase Example:  '[1,3,null,null,2]'
 *
 * 二叉搜索树中的两个节点被错误地交换。
 * 
 * 请在不改变其结构的情况下，恢复这棵树。
 * 
 * 示例 1:
 * 
 * 输入: [1,3,null,null,2]
 * 
 * 1
 * /
 * 3
 * \
 * 2
 * 
 * 输出: [3,1,null,null,2]
 * 
 * 3
 * /
 * 1
 * \
 * 2
 * 
 * 
 * 示例 2:
 * 
 * 输入: [3,1,4,null,null,2]
 * 
 * ⁠ 3
 * ⁠/ \
 * 1   4
 * /
 * 2
 * 
 * 输出: [2,1,4,null,null,3]
 * 
 * ⁠ 2
 * ⁠/ \
 * 1   4
 * /
 * ⁠ 3
 * 
 * 进阶:
 * 
 * 
 * 使用 O(n) 空间复杂度的解法很容易实现。
 * 你能想出一个只使用常数空间的解决方案吗？
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
    let preVal = preNode = null;
    let l = r = null;
    let i = 0;
    function walk(node) {
        if (node) {
            walk(node.left);
            //中序遍历
            let val = node.val;
            if (preVal !== null && preVal >= val) {
                if (i === 0) {
                    //相邻
                    !l && (l = preNode);
                    !r && (r = node);
                    i++;
                } else {
                    //离得远
                    let m = l.val;
                    l.val = node.val;
                    node.val = m;
                    i++;
                }
            }
            preVal = val;
            preNode = node;
            walk(node.right);
        }
    }
    walk(root);
    if (i === 1) {
        i = r.val;
        r.val = l.val;
        l.val = i;
    }
    return root;
};
// let t = {
//     val: 1,
//     left: { val: 3, left: null, right: { val: 2, left: null, right: null } },
//     right: null
// }
// recoverTree(t);
// @lc code=end

