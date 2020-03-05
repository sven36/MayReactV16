/*
 * @lc app=leetcode.cn id=310 lang=javascript
 *
 * [310] 最小高度树
 *
 * https://leetcode-cn.com/problems/minimum-height-trees/description/
 *
 * algorithms
 * Medium (33.44%)
 * Likes:    102
 * Dislikes: 0
 * Total Accepted:    5K
 * Total Submissions: 15K
 * Testcase Example:  '4\n[[1,0],[1,2],[1,3]]'
 *
 * 
 * 对于一个具有树特征的无向图，我们可选择任何一个节点作为根。图因此可以成为树，在所有可能的树中，具有最小高度的树被称为最小高度树。给出这样的一个图，写出一个函数找到所有的最小高度树并返回他们的根节点。
 * 
 * 格式
 * 
 * 该图包含 n 个节点，标记为 0 到 n - 1。给定数字 n 和一个无向边 edges 列表（每一个边都是一对标签）。
 * 
 * 你可以假设没有重复的边会出现在 edges 中。由于所有的边都是无向边， [0, 1]和 [1, 0] 是相同的，因此不会同时出现在 edges 里。
 * 
 * 示例 1:
 * 
 * 输入: n = 4, edges = [[1, 0], [1, 2], [1, 3]]
 * 
 * ⁠       0
 * ⁠       |
 * ⁠       1
 * ⁠      / \
 * ⁠     2   3 
 * 
 * 输出: [1]
 * 
 * 
 * 示例 2:
 * 
 * 输入: n = 6, edges = [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]
 * 
 * ⁠    0  1  2
 * ⁠     \ | /
 * ⁠       3
 * ⁠       |
 * ⁠       4
 * ⁠       |
 * ⁠       5 
 * 
 * 输出: [3, 4]
 * 
 * 说明:
 * 
 * 
 * 根据树的定义，树是一个无向图，其中任何两个顶点只通过一条路径连接。 换句话说，一个任何没有简单环路的连通图都是一棵树。
 * 树的高度是指根节点和叶子节点之间最长向下路径上边的数量。
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (numCourses, prerequisites) {
    if (prerequisites.length <= 0) return [0];
    let adj = new Array(numCourses),
        temp = [];
    // initialize adj
    for (let i = 0; i < numCourses; i++) {
        adj[i] = [];
    }
    for (let i = 0; i < prerequisites.length; i++) {
        adj[prerequisites[i][0]].push(prerequisites[i][1]);
        adj[prerequisites[i][1]].push(prerequisites[i][0]);
    }
    for (let i = 0; i < numCourses; i++) {
        if (adj[i].length === 1) {
            temp.push(i);
        }
    }
    while (numCourses > 2) {
        numCourses -= temp.length;
        let next = [];
        for (let i = 0; i < temp.length; i++) {
            // 叶子节点的相邻节点
            let k = adj[temp[i]].pop();
            // 在temp的邻接表中删除这个叶子节点
            for (let j = 0; j < adj[k].length; j++) {
                if (adj[k][j] === temp[i]) {
                    adj[k].splice(j, 1);
                    break;
                }
            }
            if (adj[k].length === 1) {
                next.push(k);
            }
        }
        temp = next;
    }
    return temp;
};
// findMinHeightTrees(6, [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]);
// @lc code=end

