/*
 * @lc app=leetcode.cn id=96 lang=javascript
 *
 * [96] 不同的二叉搜索树
 *
 * https://leetcode-cn.com/problems/unique-binary-search-trees/description/
 *
 * algorithms
 * Medium (63.00%)
 * Likes:    301
 * Dislikes: 0
 * Total Accepted:    20.3K
 * Total Submissions: 32.2K
 * Testcase Example:  '3'
 *
 * 给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？
 * 
 * 示例:
 * 
 * 输入: 3
 * 输出: 5
 * 解释:
 * 给定 n = 3, 一共有 5 种不同结构的二叉搜索树:
 * 
 * ⁠  1         3     3      2      1
 * ⁠   \       /     /      / \      \
 * ⁠    3     2     1      1   3      2
 * ⁠   /     /       \                 \
 * ⁠  2     1         2                 3
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    let res = [];
    if (n === 0) {
        return 0;
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
    return res[n].length;
};
// @lc code=end

