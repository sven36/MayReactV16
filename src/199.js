/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
 *
 * https://leetcode-cn.com/problems/binary-tree-right-side-view/description/
 *
 * algorithms
 * Medium (61.78%)
 * Likes:    110
 * Dislikes: 0
 * Total Accepted:    11.9K
 * Total Submissions: 19.3K
 * Testcase Example:  '[1,2,3,null,5,null,4]'
 *
 * 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 * 
 * 示例:
 * 
 * 输入: [1,2,3,null,5,null,4]
 * 输出: [1, 3, 4]
 * 解释:
 * 
 * ⁠  1            <---
 * ⁠/   \
 * 2     3         <---
 * ⁠\     \
 * ⁠ 5     4       <---
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
 * @return {number[]}
 */
var rightSideView = function (root) {
    let res = [];
    let arr = [];
    if (!root) {
        return res;
    }
    let i = 0;
    function walk(node) {
        i++;
        if (node) {
            if (!res[i]) {
                res[i] = [node.val];
            } else {
                res[i].push(node.val);
            }
            walk(node.left);
            walk(node.right);
        }
        i--;
    }
    walk(root);
    res.forEach(item => {
        if (item) {
            arr.push(item[item.length - 1]);
        }
    });
    return arr;
};
// @lc code=end

