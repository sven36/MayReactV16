/*
 * @lc app=leetcode.cn id=95 lang=javascript
 *
 * [95] 不同的二叉搜索树 II
 *
 * https://leetcode-cn.com/problems/unique-binary-search-trees-ii/description/
 *
 * algorithms
 * Medium (59.99%)
 * Likes:    214
 * Dislikes: 0
 * Total Accepted:    13.4K
 * Total Submissions: 22.4K
 * Testcase Example:  '3'
 *
 * 给定一个整数 n，生成所有由 1 ... n 为节点所组成的二叉搜索树。
 * 
 * 示例:
 * 
 * 输入: 3
 * 输出:
 * [
 * [1,null,3,2],
 * [3,2,null,1],
 * [3,1,null,null,2],
 * [2,1,3],
 * [1,null,2,null,3]
 * ]
 * 解释:
 * 以上的输出对应以下 5 种不同结构的二叉搜索树：
 * 
 * ⁠  1         3     3      2      1
 * ⁠   \       /     /      / \      \
 * ⁠    3     2     1      1   3      2
 * ⁠   /     /       \                 \
 * ⁠  2     1         2                 3
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
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    let res = [];
    if (n === 0) {
        return res;
    }
    res[0] = [null];
    function clone(node, offset) {
        if (node === null) {
            return null;
        }
        let r = new TreeNode(node.val + offset);
        r.left = clone(node.left, offset);
        r.right = clone(node.right, offset);
        return r;
    }

    //求1...n的所有排列组合即可
    for (let len = 1; len <= n; len++) {
        res[len] = [];
        for (let root = 1; root <= len; root++) {
            let left = root - 1;
            let right = len - root;
            res[left].forEach(l => {
                res[right].forEach(r => {
                    let rootNode = new TreeNode(root);
                    rootNode.left = l;
                    rootNode.right = clone(r, root);
                    res[len].push(rootNode);
                });
            });
        }
    }
    return res[n];
};
// generateTrees(3);
// @lc code=end

