/*
 * @lc app=leetcode.cn id=222 lang=javascript
 *
 * [222] 完全二叉树的节点个数
 *
 * https://leetcode-cn.com/problems/count-complete-tree-nodes/description/
 *
 * algorithms
 * Medium (62.20%)
 * Likes:    91
 * Dislikes: 0
 * Total Accepted:    9.7K
 * Total Submissions: 15.5K
 * Testcase Example:  '[1,2,3,4,5,6]'
 *
 * 给出一个完全二叉树，求出该树的节点个数。
 * 
 * 说明：
 * 
 * 
 * 完全二叉树的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第
 * h 层，则该层包含 1~ 2^h 个节点。
 * 
 * 示例:
 * 
 * 输入: 
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   3
 * ⁠/ \  /
 * 4  5 6
 * 
 * 输出: 6
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
var countNodes = function (root) {

    let sum = 0;
    function walk(node) {
        if (node) {
            let l1 = count(node.left);
            let r1 = count(node.right);
            if (l1 === r1) {
                return walk(node.right) + (1 << l1)
            } else {
                return walk(node.left) + (1 << r1)
            }
        } else {
            return 0;
        }
    }
    function count(node) {
        let l = 0;
        while (node) {
            l++;
            node = node.left;
        }
        return l;
    }
    sum = walk(root);
    return sum;

    // if (!root) {
    //     return 0;
    // }
    // let num = n = i = 0;
    // i = -1;
    // let res = [];
    // function walk(node) {
    //     i++;
    //     if (node) {
    //         if (!res[i]) {
    //             res[i] = [1];
    //         } else {
    //             res[i].push(1);
    //         }
    //         walk(node.left);
    //         walk(node.right);
    //         if (!node.left && !node.right) {
    //             n++;
    //         }
    //     }
    //     i--;
    // }
    // walk(root);
    // let l = res.length;
    // num = Math.pow(2, l - 1) + res[l - 1].length - 1;
    // return num;
};
// @lc code=end

